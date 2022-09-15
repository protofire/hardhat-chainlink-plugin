export const login = async (email: string, password: string) => {
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

    if (authResponse.status == 429) throw "Too Many Requests";

    const regex = /clsession=[a-zA-Z0-9=\-_]+/g; //Grab the session token
    const cookie = authResponse.headers.get("set-cookie")?.match(regex);
    if (!cookie) throw new Error("no auth cookie found in response")

    return cookie[0];
  } catch (err) {
    console.error("Failed to authenticate user with error: ", err);

    return "";
  }
};
