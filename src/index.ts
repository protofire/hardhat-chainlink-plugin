import '@nomiclabs/hardhat-ethers'
import { task } from 'hardhat/config'
// This import is needed to let the TypeScript compiler know that it should include your type
// extensions in your npm package's types file.
import './type-extensions'
import { runNode } from './tasks/run-node'
import { createJob } from './tasks/create-job'
import { deployLinkToken } from './tasks/deploy-link-token'
import { deployOracle } from './tasks/deploy-oracle'
import { fundEth, fundLink } from './tasks/fund'
import { nodeInfo } from './tasks/node-info'

task('chainlink:run-node', 'Runs the chainlink node').setAction(runNode)

task('chainlink:create-job', 'Creates the job')
  .addPositionalParam('email', 'User email needed for login')
  .addPositionalParam('pass', 'Password for user needed for login')
  .addPositionalParam('oracleAddress', 'Address of Oracle')
  .addOptionalPositionalParam('jobType', 'direct or cron')
  .setAction(createJob)

task(
  'chainlink:deploy-link',
  'Deploys the Link token into a running node'
).setAction(deployLinkToken)

task('chainlink:deploy-oracle', 'Deploys the oracle')
  .addPositionalParam('nodeAddress', 'The node address')
  .addPositionalParam('linkAddress', 'The Link token address')
  .setAction(deployOracle)

task('chainlink:fund-eth', 'Funds the node with ETH')
  .addPositionalParam('nodeAddress', 'The node address')
  .addPositionalParam('amount', 'Amount to fund')
  .setAction(fundEth)

task('chainlink:fund-link', 'Funds the node with LINK')
  .addPositionalParam('nodeAddress', 'The node address')
  .addPositionalParam('linkAddress', 'The link token address')
  .setAction(fundLink)

task('chainlink:node-info', 'Get node info')
  .addPositionalParam('email', 'User email needed for login')
  .addPositionalParam('pass', 'Password for user needed for login')
  .setAction(nodeInfo)
