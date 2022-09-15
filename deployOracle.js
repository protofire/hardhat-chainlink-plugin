//Usage:  node deployOracle.js 0x786729C810294D47E935aE636F66f6cE35E9B99d 0x5FbDB2315678afecb367f032d93F642f64180aa3  //Pass Chainlink Node Address & LINK Token Address
const hre = require("hardhat");

async function main() {
  const [nodeAddress, linkAddress] = process.argv.slice(2);
  const { ethers } = hre;
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const wallet = new ethers.Wallet(
    "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", //Hardhat wallet are deterministic and the same across al hardhat users
    provider
  );

  const Oracle = await ethers.getContractFactory("Oracle", wallet);
  const oracle = await Oracle.deploy(linkAddress);

  await oracle.deployed();

  //Set Fulfillment on Oracle
  await oracle.setFulfillmentPermission(nodeAddress, true);

  console.log(
    "All set on this end! If you've setup everything correctly, you can start getting external data from your smart contract"
  );

  console.table({ "Oracle Address": oracle.address });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
