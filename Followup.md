`node getNodeInfo.js hardhatuser@protofire.io password123456789`

```
┌─────────┬──────────────────────────────────────────────┐
│ (index) │                    Values                    │
├─────────┼──────────────────────────────────────────────┤
│ Address │ '0x45Ce9CBfb8092438B0ceC65296F2dd23277Ef120' │
│ Balance │            '0.000000000000000000'            │
│ ChainID │                   '31337'                    │
└─────────┴──────────────────────────────────────────────┘
```

`node fundNodeETH.js 0x45Ce9CBfb8092438B0ceC65296F2dd23277Ef120 20`

Success! Funded 0x45Ce9CBfb8092438B0ceC65296F2dd23277Ef120 with 20 ETH. New Node Balance: 20.0

```
┌─────────┬──────────────────────────────────────────────┐
│ (index) │                    Values                    │
├─────────┼──────────────────────────────────────────────┤
│ Address │ '0x45Ce9CBfb8092438B0ceC65296F2dd23277Ef120' │
│ Balance │           '20.000000000000000000'            │
│ ChainID │                   '31337'                    │
└─────────┴──────────────────────────────────────────────┘
```

`node deployLinkToken.js`

```
┌────────────────────┬──────────────────────────────────────────────┐
│      (index)       │                    Values                    │
├────────────────────┼──────────────────────────────────────────────┤
│ Link Token Address │ '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512' │
└────────────────────┴──────────────────────────────────────────────┘
```

Pass Chainlink Node Address & LINK Token Address

`node deployOracle.js 0x45Ce9CBfb8092438B0ceC65296F2dd23277Ef120 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`

All set on this end! If you've setup everything correctly, you can start getting external data from your smart contract

```
┌────────────────┬──────────────────────────────────────────────┐
│    (index)     │                    Values                    │
├────────────────┼──────────────────────────────────────────────┤
│ Oracle Address │ '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0' │
└────────────────┴──────────────────────────────────────────────┘
```

Pass Chainlink Node Username, Password & Oracle Address

`node createJob.js hardhatuser@protofire.io password123456789 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0`

Authenticating User hardhatuser@protofire.io using password password123456789

Creating Job...

```
┌────────────┬────────────────────────────────────────┐
│  (index)   │                 Values                 │
├────────────┼────────────────────────────────────────┤
│   Status   │               'Success'                │
│   Error    │                  null                  │
│   JobID    │                  '1'                   │
│ ExternalID │ '98df25f2-d740-4948-a446-da06f89a97a3' │
└────────────┴────────────────────────────────────────┘
```

Deploy Consumer Contract: https://remix.ethereum.org/#url=https://docs.chain.link/samples/APIRequests/ATestnetConsumer.sol&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js (NB: Makes ure to change the LINK Token Address & use Network Hardhat)

Pass LinkToken Address , Oracle Address and Job external ID without the dashes

`node exampleGetEthUsdPrice.js 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 98df25f2d7404948a446da06f89a97a3`

allowUnrestrictedNetworkAccess="true"

fetch [type="http" method=GET url="$(decode_cbor.url)" allowUnrestrictedNetworkAccess="true"]
