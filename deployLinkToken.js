//Usage:  node deployLinkToken.js
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const hre = require("hardhat");

async function main() {
  const LinkToken = await hre.ethers.getContractFactory("LinkToken");
  const linkToken = await LinkToken.deploy();

  await linkToken.deployed();

  console.table({ "Link Token Address": linkToken.address });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
