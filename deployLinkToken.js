//Usage:  node deployLinkToken.js
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { link } = require("fs");
const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const wallet = new ethers.Wallet(
    "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", //Hardhat wallet are deterministic and the same across al hardhat users
    provider
  );

  const LinkToken = await hre.ethers.getContractFactory("LinkToken", wallet);
  const linkToken = await LinkToken.deploy();

  await linkToken.deployed();

  console.table({ "Link Token Address": linkToken.address });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
