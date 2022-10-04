//Usage:  node fundLink.js 0x5FbDB2315678afecb367f032d93F642f64180aa3 0x5FbDB2315678afecb367f032d93F642f64180aa3
//LinkToken Address , Consumer Address to fund
const hre = require("hardhat");

async function main() {
  const [oracleAddress, nodeAddress] = [
    "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    "0xfFb981a22Abb764219daB52f6DF615Fd6f4D3aE0",
  ];

  const { ethers } = hre;
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const wallet = new ethers.Wallet(
    "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", //Hardhat wallet are deterministic and the same across al hardhat users
    provider
  );

  const Oracle = await hre.ethers.getContractFactory("Oracle", wallet);
  const oracle = Oracle.attach(oracleAddress);

  const allowed = await oracle.setFulfillmentPermission(nodeAddress, true, {
    from: wallet.address,
  });

  console.table({ Allowed: allowed });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
