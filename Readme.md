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
curl 'http://127.0.0.1:6688/sessions' \
  -H 'Accept: application/json' \
  -H 'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Origin: http://127.0.0.1:6688' \
  -H 'Referer: http://127.0.0.1:6688/signin' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  --data-raw '{"email":"hardhatuser@protofire.io","password":"password123456789"}' \
  --compressed \
  --dump-header auth-credential
```

```
node createJob.js
```

## Step ..

- Print out credentials and node details
- Create sample smart contract to get ETH/USD Price feed
