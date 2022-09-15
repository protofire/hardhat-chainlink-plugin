//Usage:  node fundLink.js 0x5FbDB2315678afecb367f032d93F642f64180aa3 0x5FbDB2315678afecb367f032d93F642f64180aa3
//LinkToken Address , Consumer Address to fund
const hre = require("hardhat");
const { join } = require("path");

async function main() {
  const [linkAddress, fundAddress] = process.argv.slice(2);
  const { ethers } = hre;
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const wallet = new ethers.Wallet(
    "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", //Hardhat wallet are deterministic and the same across al hardhat users
    provider
  );

  const LinkToken = await hre.ethers.getContractFactory("LinkToken", wallet);
  const linkToken = LinkToken.attach(linkAddress);

  //Give LINK Token to pay oracle for request to chainlink node
  //Enough for 100 requests to Node, settings on Oracle charges 1 LINK for fufilling each request
  const res = await linkToken.transfer(
    fundAddress,
    hre.ethers.utils.parseEther("100"),
    {
      from: wallet.address,
    }
  );

  console.log(res);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
