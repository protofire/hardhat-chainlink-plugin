// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // hre.ethers.utils.parseEther("1");

  // const ATestnetConsumer = await hre.ethers.getContractFactory(
  //   "ATestnetConsumer"
  // );
  // const testnetConsumer = await ATestnetConsumer.deploy();

  // await testnetConsumer.deployed();

  const { ethers } = hre;

  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const wallet = new ethers.Wallet(
    "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", //Hardhat wallet are deterministic and the same across al hardhat users
    provider
  );

  const ATestnetConsumer = await hre.ethers.getContractFactory(
    "ATestnetConsumer",
    wallet
  );

  const testnetConsumer = await ATestnetConsumer.deploy();

  await testnetConsumer.deployed();

  console.table({ "Testnet Consumer": testnetConsumer.address });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
