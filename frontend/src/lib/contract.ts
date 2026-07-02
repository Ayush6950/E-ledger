// src/lib/contract.ts
import EstateLedgerABI from "../../../contract/artifacts/contracts/EstateLedger.sol/EstateLedger.json";

export const ESTATE_LEDGER_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Correctly assign the ABI from the imported artifact
export const ESTATE_LEDGER_ABI = EstateLedgerABI.abi;

// OR, if you want to manually declare it (without importing JSON):
/*
export const ESTATE_LEDGER_ABI = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "location", "type": "string" }
    ],
    "name": "PropertyRegistered",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_location", "type": "string" },
      { "internalType": "uint256", "name": "_area", "type": "uint256" },
      { "internalType": "string", "name": "_documentHash", "type": "string" }
    ],
    "name": "registerProperty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
*/
