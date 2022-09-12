//@Todo Figure out how to get the JOb External ID for this scrip usage without having to Login UI
//Usage:  node exampleGetEthUsdPrice.js 0x5FbDB2315678afecb367f032d93F642f64180aa3 0x5FbDB2315678afecb367f032d93F642f64180aa3  54a90651143248f695e64302e638a332  //LinkToken Address , Oracle Address and Job external ID without the dashes
const hre = require("hardhat");
const { join } = require("path");

async function main() {
  const [linkAddress, oracleAddress, jobId] = process.argv.slice(2);

  let consumer;

  const Consumer = await hre.ethers.getContractFactory("HarhatConsumer");
  const LinkToken = await hre.ethers.getContractFactory("LinkToken");

  console.log(linkAddress);
  //   signer = await hre.ethers.getSigner();
  //   const linkTokenArtifact = await hre.artifacts.readArtifact("LinkToken");
  //   const linkToken = new hre.ethers.Contract(
  //     linkAddress,
  //     linkTokenArtifact.abi,
  //     signer
  //   );

  // const linkToken = await hre.ethers.getContractAt(
  //   "LinkToken",
  //   "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  // );

  const linkToken = await LinkToken.deploy();

  await linkToken.deployed();

  consumer = await Consumer.deploy(linkToken.address);

  await consumer.deployed();

  //Give LINK Token to pay oracle for request to chainlink node
  //Enough for 100 requests to Node, settings on Oracle charges 1 LINK for fufilling each request
  await linkToken.transfer(
    consumer.address,
    hre.ethers.utils.parseEther("100")
  );

  const res = await consumer.requestEthereumPrice(oracleAddress, jobId);

  //   const currentPrice = await consumer.currentPrice();

  //   console.log({ currentPrice });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
