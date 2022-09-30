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

Run hardhat node

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

Spin up a chainlink node using.

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
npx hardhat chainlink:node-info hardhatuser@protofire.io password123456789
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
You can also get the address from the UI.

```console
npx hardhat chainlink:fund-eth 0x786729C810294D47E935aE636F66f6cE35E9B99d 20
```

Now check the node info again, to see the updated balance.

```console
npx hardhat chainlink:node-info hardhatuser@protofire.io password123456789
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

If you login again to your Node UI from http://127.0.0.1:6688 or simply refresh the page if you are still login. You will see the node updated.

**Step 7:**

Deploy Link token on hardhat. Link Token will be used by Consumer contract to pay for Oracle request.

```console
npx hardhat chainlink:deploy-link
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
npx hardhat chainlink:deploy-oracle 0xBe576260A47175829f250732421522B7ec204D06 0x5FbDB2315678afecb367f032d93F642f64180aa3
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

Pass your node username, password and deployed Oracle address.

```console
npx hardhat chainlink:create-job hardhatuser@protofire.io password123456789 0x5FbDB2315678afecb367f032d93F642f64180aa3
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

**Step 10:**

Using this smart contract Consumer sample below, request the price of ETH/USD from the deployed oracle.

Before you proceed with that, there are a few things to note.

1. Change the value of the `setChainlinkToken` in the constructor to your deployed Link token address.
2. Install the `@chainlink/contracts` dependecies.
3. Deploy the contract to hardhat local network where our chainlink node is operating.
4. Call `requestEthereumPrice` method and set the Oracle address to your deployed Oracle address and job Id to the External ID without the `-`. So if your job external id is `95cd6192-8dc8-4e1d-903d-3e7b885bc9d5`, change it to `95cd61928dc84e1d903d3e7b885bc9d5` before passing it.
5. Fund your deployed ATestnetConsumer with some Link token. To do so use the command `npx hardhat chainlink:fund-link 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9 0x5FbDB2315678afecb367f032d93F642f64180aa3`, where the first parameter is your
   ATestnetConsumer contract address and the second parameter is your Link token address.
6. Afterwards call method `currentPrice` on your contract to get the updated price returned by the Oracle.

**NB:** You can change the ATestnetConsumer to get another price pair supported by `https://min-api.cryptocompare.com`.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@chainlink/contracts/src/v0.8/ChainlinkClient.sol';
import '@chainlink/contracts/src/v0.8/ConfirmedOwner.sol';

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

contract ATestnetConsumer is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    uint256 private constant ORACLE_PAYMENT = 1 * LINK_DIVISIBILITY; // 1 * 10**18
    uint256 public currentPrice;
    int256 public changeDay;
    bytes32 public lastMarket;

    event RequestEthereumPriceFulfilled(bytes32 indexed requestId, uint256 indexed price);

    event RequestEthereumChangeFulfilled(bytes32 indexed requestId, int256 indexed change);

    event RequestEthereumLastMarket(bytes32 indexed requestId, bytes32 indexed market);

    /**
     *  Goerli
     *@dev LINK address in Goerli network: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * @dev Check https://docs.chain.link/docs/link-token-contracts/ for LINK address for the right network
     */
    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
    }

    function requestEthereumPrice(address _oracle, string memory _jobId) public onlyOwner {
        Chainlink.Request memory req = buildChainlinkRequest(
            stringToBytes32(_jobId),
            address(this),
            this.fulfillEthereumPrice.selector
        );
        req.add('get', 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD');
        req.add('path', 'USD');
        req.addInt('times', 100);
        sendChainlinkRequestTo(_oracle, req, ORACLE_PAYMENT);
    }

    function requestEthereumChange(address _oracle, string memory _jobId) public onlyOwner {
        Chainlink.Request memory req = buildChainlinkRequest(
            stringToBytes32(_jobId),
            address(this),
            this.fulfillEthereumChange.selector
        );
        req.add('get', 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD');
        // req.add("path", "RAW.ETH.USD.CHANGEPCTDAY"); // Chainlink nodes prior to 1.0.0 support this format
        req.add('path', 'RAW,ETH,USD,CHANGEPCTDAY'); // Chainlink nodes 1.0.0 and later support this format
        req.addInt('times', 1000000000);
        sendChainlinkRequestTo(_oracle, req, ORACLE_PAYMENT);
    }

    function requestEthereumLastMarket(address _oracle, string memory _jobId) public onlyOwner {
        Chainlink.Request memory req = buildChainlinkRequest(
            stringToBytes32(_jobId),
            address(this),
            this.fulfillEthereumLastMarket.selector
        );
        req.add('get', 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD');
        string[] memory path = new string[](4);
        path[0] = 'RAW';
        path[1] = 'ETH';
        path[2] = 'USD';
        path[3] = 'LASTMARKET';
        req.addStringArray('path', path);
        sendChainlinkRequestTo(_oracle, req, ORACLE_PAYMENT);
    }

    function fulfillEthereumPrice(bytes32 _requestId, uint256 _price) public recordChainlinkFulfillment(_requestId) {
        emit RequestEthereumPriceFulfilled(_requestId, _price);
        currentPrice = _price;
    }

    function fulfillEthereumChange(bytes32 _requestId, int256 _change) public recordChainlinkFulfillment(_requestId) {
        emit RequestEthereumChangeFulfilled(_requestId, _change);
        changeDay = _change;
    }

    function fulfillEthereumLastMarket(bytes32 _requestId, bytes32 _market)
        public
        recordChainlinkFulfillment(_requestId)
    {
        emit RequestEthereumLastMarket(_requestId, _market);
        lastMarket = _market;
    }

    function getChainlinkToken() public view returns (address) {
        return chainlinkTokenAddress();
    }

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.transfer(msg.sender, link.balanceOf(address(this))), 'Unable to transfer');
    }

    function cancelRequest(
        bytes32 _requestId,
        uint256 _payment,
        bytes4 _callbackFunctionId,
        uint256 _expiration
    ) public onlyOwner {
        cancelChainlinkRequest(_requestId, _payment, _callbackFunctionId, _expiration);
    }

    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            // solhint-disable-line no-inline-assembly
            result := mload(add(source, 32))
        }
    }
}
```

Before you proceed with that, there are a few things to note.

1. Change the value of the `setChainlinkToken` in the countructor to your deployed Link token address.
2. Install the `@chainlink/contracts` dependecies.
3. Deploy the contract using hardhat to hardhat network.
4. Call `requestEthereumPrice` method from your test or script and pass the the parameters `_oracle` as your deployed Oracle and `_jobId` as your Job External ID without the `-`. So if your Job External ID is `95cd6192-8dc8-4e1d-903d-3e7b885bc9d5`, change it to `95cd61928dc84e1d903d3e7b885bc9d5` without the `-` before passing it.
5. Fund your deployed ATestnetConsumer with some Link token. To do so use the command `npx hardhat chainlink:fund-link 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9 0x5FbDB2315678afecb367f032d93F642f64180aa3`, where the first parameter is your
   ATestnetConsumer contract address and the second parameter is your Link token address.
6. Afterwards call method `currentPrice` on your contract to get the updated price returned by the Oracle.

// Todo: Add further instruction on hardhat.config.js to set localhost network and deploy script instructions in details
**NB:** You can change the ATestnetConsumer to get another price pair supported by `https://min-api.cryptocompare.com`.

## Known Issues

- Starting the chainlink node before the hardhat node will cause irregular behaviour for the chainlink node.
