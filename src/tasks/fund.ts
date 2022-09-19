import { ActionType } from "hardhat/types";

export const fundEth: ActionType<[string, string]> = async (taskArgs, hre, runSuper) => {
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

export const fundLink: ActionType<[string, string]> = async (taskArgs, hre) => {
  const [linkAddress, fundAddress] = taskArgs;
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
