const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { get } = require("http");

const getAuth = async (email, password) => {
  try {
    console.info(`\nAuthenticating User ${email} using password ${password}\n`);

    const authResponse = await fetch("http://127.0.0.1:6688/sessions", {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      referrer: "http://127.0.0.1:6688/signin",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: JSON.stringify({ email: email, password: password }),
      method: "POST",
      mode: "cors",
      credentials: "include",
    });

    if (authResponse.status == 429) throw "Too Many Request";

    const regex = /clsession=[a-zA-Z0-9=\-_]+/g; //Grab the session token
    const cookie = authResponse.headers.get("set-cookie");

    return cookie.match(regex)[0];
  } catch (err) {
    console.error("Failed to authenticate user with error: ", err);

    return "";
  }
};

exports.login = getAuth;
