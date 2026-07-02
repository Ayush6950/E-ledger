const hre = require("hardhat");

async function main() {
  const EstateLedger = await hre.ethers.getContractFactory("EstateLedger");
  const estateLedger = await EstateLedger.deploy();

  await estateLedger.waitForDeployment();

  console.log("EstateLedger deployed to:", await estateLedger.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
