//Usage:  node getNodeInfo.js hardhatuser@protofire.io password123456789
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const auth = require("./authNodeUser.js");

async function main() {
  const [email, password] = process.argv.slice(2);

  const authenticationToken = await auth.login(email.trim(), password.trim());

  try {
    const query = await fetch("http://127.0.0.1:6688/query", {
      headers: {
        accept: "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        cookie: `blocalauth=localapibe315fd0c14b5e47:; isNotIncognito=true; _ga=GA1.1.2055974768.1644792885; ${authenticationToken}`,
        Referer: "http://127.0.0.1:6688/jobs/new",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      referrer: "http://127.0.0.1:6688/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: '{"operationName":"FetchAccountBalances","variables":{},"query":"fragment AccountBalancesPayload_ResultsFields on EthKey {\\n  address\\n  chain {\\n    id\\n    __typename\\n  }\\n  ethBalance\\n  isFunding\\n  linkBalance\\n  __typename\\n}\\n\\nquery FetchAccountBalances {\\n  ethKeys {\\n    results {\\n      ...AccountBalancesPayload_ResultsFields\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}',
      method: "POST",
      mode: "cors",
    });

    const response = await query.json();

    console.table({
      Address: response?.data?.ethKeys?.results[0]?.address,
      Balance: response?.data?.ethKeys?.results[0]?.ethBalance,
      ChainID: response?.data?.ethKeys?.results[0]?.chain?.id,
    });
  } catch (error) {
    console.log("Could not get Node address reason: ", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
