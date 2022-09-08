//Usage:  node createJob.js hardhatuser@protofire.io password123456789
async function run() {

  const [email, password] = process.argv.slice(2);
  let authenticationToken;

  console.info(`\nAuthenticating User ${email} using password ${password}\n`);

  try{
  const authResponse = await fetch("http://127.0.0.1:6688/sessions", {
  "headers": {
    "accept": "application/json",
    "content-type": "application/json",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
  },
  "referrer": "http://127.0.0.1:6688/signin",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": JSON.stringify({email: email, password: password}),
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});

  const regex = /clsession=[a-zA-Z0-9=-]+/g; //Grab the session token
  const cookie = authResponse.headers.get('set-cookie')

   authenticationToken = cookie.match(regex)[0];
  }catch(err){
    console.error("Failed to authenticate user with error: ", err)
  }

  try {

  console.info("\nCreating Job...\n")

  const jobName = "Get > Uint256:" + (new Date).getMilliseconds()

    // Create Job to perform ETH/USD
    // @Todo Replace Oracle Address
    // Generate Random Job Name
    // Get ID of Job
    const response = await fetch("http://127.0.0.1:6688/query", {
      headers: {
        accept: "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        cookie: `blocalauth=localapibe315fd0c14b5e47:; isNotIncognito=true; _ga=GA1.1.2055974768.1644792885; ${authenticationToken}`,
        Referer: "http://127.0.0.1:6688/jobs/new",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      body: `{"operationName":"CreateJob","variables":{"input":{"TOML":"type = \\"directrequest\\"\\nschemaVersion = 1\\nname = \\"${jobName}\\"\\n# Optional External Job ID: Automatically generated if unspecified\\n# externalJobID = \\"b1d42cd5-4a3a-4200-b1f7-25a68e48aad8\\"\\ncontractAddress = \\"0x01BE23585060835E02B77ef475b0Cc51aA1e0709\\"\\nmaxTaskDuration = \\"0s\\"\\nobservationSource = \\"\\"\\"\\n    decode_log   [type=\\"ethabidecodelog\\"\\n                  abi=\\"OracleRequest(bytes32 indexed specId, address requester, bytes32 requestId, uint256 payment, address callbackAddr, bytes4 callbackFunctionId, uint256 cancelExpiration, uint256 dataVersion, bytes data)\\"\\n                  data=\\"$(jobRun.logData)\\"\\n                  topics=\\"$(jobRun.logTopics)\\"]\\n\\n    decode_cbor  [type=\\"cborparse\\" data=\\"$(decode_log.data)\\"]\\n    fetch        [type=\\"http\\" method=GET url=\\"$(decode_cbor.get)\\"]\\n    parse        [type=\\"jsonparse\\" path=\\"$(decode_cbor.path)\\" data=\\"$(fetch)\\"]\\n    multiply     [type=\\"multiply\\" input=\\"$(parse)\\" times=100]\\n    encode_data  [type=\\"ethabiencode\\" abi=\\"(uint256 value)\\" data=\\"{ \\\\\\\\\\"value\\\\\\\\\\": $(multiply) }\\"]\\n    encode_tx    [type=\\"ethabiencode\\"\\n                  abi=\\"fulfillOracleRequest(bytes32 requestId, uint256 payment, address callbackAddress, bytes4 callbackFunctionId, uint256 expiration, bytes32 data)\\"\\n                  data=\\"{\\\\\\\\\\"requestId\\\\\\\\\\": $(decode_log.requestId), \\\\\\\\\\"payment\\\\\\\\\\": $(decode_log.payment), \\\\\\\\\\"callbackAddress\\\\\\\\\\": $(decode_log.callbackAddr), \\\\\\\\\\"callbackFunctionId\\\\\\\\\\": $(decode_log.callbackFunctionId), \\\\\\\\\\"expiration\\\\\\\\\\": $(decode_log.cancelExpiration), \\\\\\\\\\"data\\\\\\\\\\": $(encode_data)}\\"\\n                 ]\\n    submit_tx    [type=\\"ethtx\\" to=\\"0x01BE23585060835E02B77ef475b0Cc51aA1e0709\\" data=\\"$(encode_tx)\\"]\\n\\n    decode_log -> decode_cbor -> fetch -> parse -> multiply -> encode_data -> encode_tx -> submit_tx\\n\\"\\"\\"\\n"}},"query":"mutation CreateJob($input: CreateJobInput!) {\\n  createJob(input: $input) {\\n    ... on CreateJobSuccess {\\n      job {\\n        id\\n        __typename\\n      }\\n      __typename\\n    }\\n    ... on InputErrors {\\n      errors {\\n        path\\n        message\\n        code\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}`,
      method: "POST"
    });
    
    const data = await response.json()
    console.log(JSON.stringify(data));
  } catch (e) {
    console.log('Could not create job')
    console.error(e)
  }
}

run();
