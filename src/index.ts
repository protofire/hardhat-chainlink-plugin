import "@nomiclabs/hardhat-ethers";
import { task, types } from "hardhat/config";
// This import is needed to let the TypeScript compiler know that it should include your type
// extensions in your npm package's types file.
import "./type-extensions";
import { runNode } from "./tasks/run-node";
import { createJob } from "./tasks/create-job";
import { deployLinkToken } from "./tasks/deploy-link-token";
import { deployOracle } from "./tasks/deploy-oracle";
import { fund } from "./tasks/fund";
import { nodeInfo } from "./tasks/node-info";

task("chainlink:run-node", "Runs the chainlink node").setAction(runNode)

task("chainlink:create-job", "Creates the job")
  .addPositionalParam("email", "User email needed for login", null, types.string, false)
  .addPositionalParam("pass", "Password for user needed for login", null, types.string, false)
  .setAction(createJob)

task("chainlink:deploy-link", "Deploys the Link token into a running node")
  .setAction(deployLinkToken)

task("chainlink:deploy-oracle", "Deploys the oracle")
  .addPositionalParam("nodeAddress", "The node address", null, types.string, false)
  .addPositionalParam("linkAddress", "The Link token address", null, types.string, false)
  .setAction(deployOracle)

task("chainlink:fund", "Funds the node with ETH")
  .addPositionalParam("nodeAddress", "The node address", null, types.string, false)
  .addPositionalParam("amount", "Amount to fund", null, types.string, false)
  .setAction(fund)

task("chainlink:node-info", "Get node info")
  .addPositionalParam("email", "User email needed for login", null, types.string, false)
  .addPositionalParam("pass", "Password for user needed for login", null, types.string, false)
  .setAction(nodeInfo)
