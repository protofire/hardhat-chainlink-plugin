## Step 1

- In your terminal open the hardhat folder.
- Run `npm install`
- Run `npx hardhat node`

## Step 2


## Step 2

```
docker-compose --env-file .env up -d
```

Visit node in http://127.0.0.1:6688
Username is hardhatuser@protofire.io
Password is password123456789

## Step 3 [Work In Progress]

- In a new terminal while hardhat node is running
- Run command below in your terminal to create a job inside the node. Note to create mutiple jobs make sure to change job name in the `--data-raw` field

```
node createJob.js
```
