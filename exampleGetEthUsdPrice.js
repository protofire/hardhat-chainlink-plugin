//Usage:  node exampleGetEthUsdPrice.js 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 98df25f2d7404948a446da06f89a97a3
//LinkToken Address, Consumer Address, Oracle Address and Job external ID without the dashes
const hre = require("hardhat");
const { join } = require("path");

async function main() {
  const [linkAddress, consumerAddress, oracleAddress, jobId] =
    process.argv.slice(2);
  const { ethers } = hre;
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const wallet = new ethers.Wallet(
    "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", //Hardhat wallet are deterministic and the same across al hardhat users
    provider
  );

  const LinkToken = await ethers.getContractFactory("LinkToken", wallet);
  const linkToken = LinkToken.attach(linkAddress);

  const Consumer = await ethers.getContractFactory("HarhatConsumer", wallet);
  const consumer = Consumer.attach(consumerAddress);

  const res = await consumer.requestEthereumPrice(oracleAddress, jobId);

  const waited = await res.wait();

  // console.log(res);
  // console.log("Waited", waited);

  const currentPrice = await consumer.currentPrice();

  console.log({ currentPrice });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
