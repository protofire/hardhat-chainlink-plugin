## Step 1

- In your terminal open the hardhat folder.
- Run `npm install`
- Run `npx hardhat node`

## Step 2

- Run npm install in the root directory

## Step 3

```
docker-compose --env-file .env up -d
```

Visit node in http://127.0.0.1:6688
Username is hardhatuser@protofire.io
Password is password123456789

## Step ..

- Deploy Oracle
- Deploy Link Token

## Step 4 [Work In Progress]

NB: To create mutiple jobs make sure to change job name and use the right Oracle address

- In a new terminal while hardhat node is running
- Run command below in your terminal to create a job inside the node.

```
node createJob.js
```

## Step ..

- Print out credentials and node details
- Create sample smart contract to get ETH/USD Price feed
