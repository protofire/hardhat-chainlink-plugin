## Chainlink hardhat plugin

This plugin makes spinning up a local Chainlink node faster and easier, allowing developers to build smart contracts using the Chainlink services.

## Getting Started

### Prerequisites

- node > 16.X
- npm > 7
- docker

### Installation

Run the following commands to setup a local environment

**Step 1:**

Install `hardhat-chainlink-plugin` hardhat plugin.

Npm users.

```console
npm install @..
```

Yarn users.

```console
yarn add @..
```

**Step 2:**

Open Docker Desktop

**Step 3:**

Always run hardhat node first

```console
npx hardhat node
```

**Step 4:**

Install dependecies and run build. This step is only needed during development phase.

```console
npm install
npm run build
```

**Step 5:**

Spin up a chainlink node using the following command, this will set-up some env variables. Please do not start it from docker desktop. 

```console
npx hardhat chainlink:run-node
```

If you visit http://127.0.0.1:6688 in your browser, you should see the chainlink node login page displayed.

You can use details: username **hardhatuser@protofire.io** and password **password123456789** to login to your local chainlink node.

Run this to see the available tasks

```console
npx hardhat
```

**Step 6:**

Next, for your chainlink node to fufill request it needs to be funded with ETH. To fund your node first you need to get the node info.

Running the command below does just that.

```console
npx hardhat chainlink:node-info hardhatuser@protofire.io password123456789 --network localhost
```

Output will look like this

```console
┌─────────┬──────────────────────────────────────────────┐
│ (index) │                    Values                    │
├─────────┼──────────────────────────────────────────────┤
│ Address │ '0x786729C810294D47E935aE636F66f6cE35E9B99d' │
│ Balance │            '0.000000000000000000'            │
│ ChainID │                   '31337'                    │
└─────────┴──────────────────────────────────────────────┘
```

Copy the node address and replace it in the command below to fund your wallet.

```console
npx hardhat chainlink:fund-eth 0x244f78C560F6cfcB3baBEe375ae064C6e9259989 20 --network localhost
```

Now check the node info again, to see the updated balance.

```console
npx hardhat chainlink:node-info hardhatuser@protofire.io password123456789 --network localhost
```

Output:

```console
┌─────────┬──────────────────────────────────────────────┐
│ (index) │                    Values                    │
├─────────┼──────────────────────────────────────────────┤
│ Address │ '0x786729C810294D47E935aE636F66f6cE35E9B99d' │
│ Balance │            '20.000000000000000000'            │
│ ChainID │                   '31337'                    │
└─────────┴──────────────────────────────────────────────┘
```

If you login again to your Node UI from http://127.0.0.1:6688 or simply refresh the page if you are still login. You will see the node updated password on the dashboard.

**Step 7:**

Deploy Link token on hardhat. Link Token will be used by Consumer contract to pay for Oracle request.

```console
npx hardhat chainlink:deploy-link --network localhost
```

Output

```console
┌────────────────────┬──────────────────────────────────────────────┐
│      (index)       │                    Values                    │
├────────────────────┼──────────────────────────────────────────────┤
│ Link Token Address │ '0x5FbDB2315678afecb367f032d93F642f64180aa3' │
└────────────────────┴──────────────────────────────────────────────┘
```

**Step 8:**

Deploy Oracle contract.

Pass the chainlink node address as the first parameter and Link Token address as the second parameter.

```console
npx hardhat chainlink:deploy-oracle 0xBe576260A47175829f250732421522B7ec204D06 0x5FbDB2315678afecb367f032d93F642f64180aa3 --network localhost
```

Output

```console
┌────────────────┬──────────────────────────────────────────────┐
│    (index)     │                    Values                    │
├────────────────┼──────────────────────────────────────────────┤
│ Oracle Address │ '0x5FbDB2315678afecb367f032d93F642f64180aa3' │
└────────────────┴──────────────────────────────────────────────┘
```

**Step 9:**

Create a chainlink Job.

Pass your node username, password, deployed Oracle address and job type (direct | cron).

```console
npx hardhat chainlink:create-job hardhatuser@protofire.io password123456789 0x5FbDB2315678afecb367f032d93F642f64180aa3 direct
```

Output

```console
┌────────────┬────────────────────────────────────────┐
│  (index)   │                 Values                 │
├────────────┼────────────────────────────────────────┤
│   Status   │               'Success'                │
│   Error    │                  null                  │
│   JobID    │                  '1'                   │
│ ExternalID │ '95cd6192-8dc8-4e1d-903d-3e7b885bc9d5' │
└────────────┴────────────────────────────────────────┘
```

Take note of the ExternalID of the Job.
