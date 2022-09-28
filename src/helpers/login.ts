import { request, RequestOptions} from "node:http";

const getSession = (url: string, options: RequestOptions, credentials: { email: string, password: string }): Promise<string> => {
  const regex = /clsession=[a-zA-Z0-9=\-_]+/g
  return new Promise((resolve, reject) => {
    const r = request(url, options);
    r.write(JSON.stringify({ email: credentials.email, password: credentials.password }));
    r.on("response", (m) => {
      if (m.statusCode == 429) reject("Too Many Requests");
      
      m.headers["set-cookie"]?.some(cookie => {
        let [session] = cookie.match(regex) ?? [];
        if (session) {
          resolve(session);
          return true;
        }
      });
      
      reject("no auth cookie found on auth response");
    });
    r.on('error', err => reject(err));
  });
}

export const login = async (email: string, password: string) => {
  try {
    console.info(`\nAuthenticating User ${email} using password ${password}\n`);

    return await getSession("http://127.0.0.1:6688/sessions", {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        referer: "http://127.0.0.1:6688/signin"
      },
      method: "POST",
    }, { email, password });
    
  } catch (err) {
    console.error("Failed to authenticate user with error: ", err);

    return "";
  }
};
