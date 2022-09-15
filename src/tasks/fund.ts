import { ActionType } from "hardhat/types";

export const fund: ActionType<[string, string]> = async (taskArgs, hre, runSuper) => {
  const [address, amount] = taskArgs;
  const { ethers } = hre;

  const fundAmount = amount.length
    ? hre.ethers.utils.parseEther(amount)
    : hre.ethers.utils.parseEther("10");

  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const wallet = new ethers.Wallet(
    "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", //Hardhat wallet are deterministic and the same across al hardhat users
    provider
  );

  await wallet.sendTransaction({
    to: address,
    value: fundAmount,
  });

  const balance = await provider.getBalance(address);
  const balanceToETH = hre.ethers.utils.formatEther(balance);

  console.log(
    `Success! Funded ${address} with ${amount} ETH. New Node Balance: ${balanceToETH}`
  );
}