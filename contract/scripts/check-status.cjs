const hre = require("hardhat");

async function main() {
  const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  console.log("Checking deployment status of EstateLedger at:", address);
  console.log("Network:", hre.network.name);

  try {
    const code = await hre.ethers.provider.getCode(address);
    if (code === "0x") {
      console.log("❌ No contract code found at this address. The contract is NOT deployed on this network.");
    } else {
      console.log("✅ Success! Contract code is active and deployed at:", address);
      console.log(`Code length: ${code.length} bytes`);
    }
  } catch (error) {
    console.log("❌ Error connecting to network:", error.message);
    console.log("\nIf you are using a local node, make sure it is running with 'npx hardhat node' and you deployed the contract using 'npx hardhat run scripts/deploy.cjs --network localhost'");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
