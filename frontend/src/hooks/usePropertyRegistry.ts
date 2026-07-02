/**
 * usePropertyRegistry.ts
 * Real blockchain + Supabase integration
 */

import { useState, useCallback, useEffect } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/context/WalletContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

import {
  PropertyFormData,
  PropertyDocuments,
  RegisteredProperty,
  TransferFormData,
  TransferRecord,
  ReceiptData,
} from "@/types/property";

import {
  ESTATE_LEDGER_ABI,
  ESTATE_LEDGER_ADDRESS,
} from "@/lib/contract";

/* ------------------ helpers ------------------ */

const generatePropertyId = () => {
  const ts = Date.now().toString(36);
  const rnd = Math.random().toString(36).substring(2, 8);
  return `PROP-${ts}-${rnd}`.toUpperCase();
};

const uploadDocument = async (
  file: File,
  propertyId: string,
  docType: string
): Promise<string | null> => {
  const ext = file.name.split(".").pop();
  const fileName = `${propertyId}/${docType}.${ext}`;

  const { error } = await supabase.storage
    .from("property-documents")
    .upload(fileName, file, { upsert: true });

  if (error) return null;

  const { data } = supabase.storage
    .from("property-documents")
    .getPublicUrl(fileName);

  return data.publicUrl;
};

/* ------------------ hook ------------------ */

export const usePropertyRegistry = () => {
  const { address, isConnected } = useWallet();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState<RegisteredProperty[]>([]);
  const [transfers, setTransfers] = useState<TransferRecord[]>([]);
  const [currentReceipt, setCurrentReceipt] =
    useState<ReceiptData | null>(null);

  /* -------- fetch properties -------- */

  useEffect(() => {
    const fetchProperties = async () => {
      const { data } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (!data) {
        setIsLoading(false);
        return;
      }

      setProperties(
        data.map((p) => ({
          id: p.id,
          propertyId: p.property_id,
          ownerName: p.owner_name,
          ownerAddress: p.owner_wallet,
          landDetails: {
            address: p.land_address,
            area: p.land_area,
            surveyNumber: p.survey_number,
            district: p.district,
            state: p.state,
          },
          registrationDate: new Date(p.created_at),
          transactionHash: p.transaction_hash,
          blockNumber: p.block_number,
        }))
      );

      setIsLoading(false);
    };

    fetchProperties();
  }, []);

  /* -------- REGISTER PROPERTY -------- */

  const registerProperty = useCallback(
    async (
      formData: PropertyFormData,
      documents?: PropertyDocuments
    ): Promise<ReceiptData | null> => {
      if (!isConnected || !address) {
        toast({
          title: "Wallet not connected",
          variant: "destructive",
        });
        return null;
      }

      setIsProcessing(true);

      try {
        if (!window.ethereum) {
          throw new Error("MetaMask not found");
        }

        const propertyId = generatePropertyId();

        /* ---------- BLOCKCHAIN ---------- */

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
          ESTATE_LEDGER_ADDRESS,
          ESTATE_LEDGER_ABI,
          signer
        );

        const tx = await contract.registerProperty(
          formData.landAddress,
          Number(formData.landArea),
          "DOC_HASH"
        );

        const receiptTx = await tx.wait();

        const hash = receiptTx.hash;
        const blockNumber = receiptTx.blockNumber;

        /* ---------- DOCUMENT UPLOAD ---------- */

        const documentUrls: Record<string, string | null> = {};

        if (documents?.aadhaarFront)
          documentUrls.aadhaar_front_url = await uploadDocument(
            documents.aadhaarFront,
            propertyId,
            "aadhaar-front"
          );

        if (documents?.ownershipDocument)
          documentUrls.ownership_document_url = await uploadDocument(
            documents.ownershipDocument,
            propertyId,
            "ownership-document"
          );

        /* ---------- DATABASE ---------- */

        const { data: dbProperty } = await supabase
          .from("properties")
          .insert({
            property_id: propertyId,
            owner_name: formData.ownerName,
            owner_wallet: address,
            land_address: formData.landAddress,
            land_area: formData.landArea,
            survey_number: formData.surveyNumber,
            district: formData.district,
            state: formData.state,
            transaction_hash: hash,
            block_number: blockNumber,
            ...documentUrls,
          })
          .select()
          .single();

        if (!dbProperty) throw new Error("DB insert failed");

        const receipt: ReceiptData = {
          type: "registration",
          propertyId,
          propertyDetails: {
            address: formData.landAddress,
            area: formData.landArea,
            surveyNumber: formData.surveyNumber,
            district: formData.district,
            state: formData.state,
          },
          parties: {
            owner: formData.ownerName,
            ownerWallet: address,
          },
          transaction: {
            hash,
            blockNumber,
            timestamp: new Date(),
          },
        };

        setCurrentReceipt(receipt);
        setProperties((prev) => [receipt as any, ...prev]);

        toast({
          title: "Property registered on blockchain ✅",
        });

        return receipt;
      } catch (err) {
        console.error(err);
        toast({
          title: "Blockchain transaction failed",
          variant: "destructive",
        });
        return null;
      } finally {
        setIsProcessing(false);
      }
    },
    [address, isConnected]
  );

  return {
    isProcessing,
    isLoading,
    properties,
    transfers,
    currentReceipt,
    registerProperty,
    clearReceipt: () => setCurrentReceipt(null),
  };
};

