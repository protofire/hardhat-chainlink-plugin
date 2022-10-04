//Usage:  node fundLink.js 0x5FbDB2315678afecb367f032d93F642f64180aa3 0x5FbDB2315678afecb367f032d93F642f64180aa3
//LinkToken Address , Consumer Address to fund
const hre = require("hardhat");

async function main() {
  const [consumerAddress, oracleAddress, jobId] = [
    "0x0165878A594ca255338adfa4d48449f69242Eb8F",
    "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    "c26d0e4fc5f343499e053c9e3004623a",
  ];

  const { ethers } = hre;
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const wallet = new ethers.Wallet(
    "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", //Hardhat wallet are deterministic and the same across al hardhat users
    provider
  );

  const Consumer = await hre.ethers.getContractFactory(
    "ATestnetConsumer",
    wallet
  );
  const consumer = Consumer.attach(consumerAddress);

  const res1 = await consumer.requestEthereumPrice(oracleAddress, jobId, {
    from: wallet.address,
  });

  const res2 = await consumer.currentPrice({
    from: wallet.address,
  });

  console.log(res1, res2);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
