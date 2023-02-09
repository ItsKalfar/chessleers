import { HttpClient, OAuth2AuthCodePKCE } from "@bity/oauth2-auth-code-pkce";
import { toast } from "react-hot-toast";
import { readStream } from "./ndJsonsStream";
export const lichessHost = "https://lichess.org";
export const clientId = "lichess-api-demo";
export const clientUrl = `${location.protocol}//${location.host}${"/"}`;

export class Auth {
  oauth = new OAuth2AuthCodePKCE({
    authorizationUrl: `${lichessHost}/oauth`,
    tokenUrl: `${lichessHost}/api/token`,
    clientId,
    scopes,
    redirectUrl: clientUrl,
    onAccessTokenExpiry: (refreshAccessToken) => refreshAccessToken(),
    onInvalidGrant: toast.error("Something went wrong!"),
  });

  async init() {
    try {
      const accessContext = await this.oauth.getAccessToken();
      if (accessContext) await this.authentication();
    } catch (error) {
      toast.error(error);
    }
    if (!this.me) {
      try {
        const hasAuthCode = await this.oauth.isReturningFromAuthServer();
        if (hasAuthCode) await this.authenticate();
      } catch (error) {
        toast.error(error);
      }
    }
  }

  async login() {
    await this.oauth.fetchAuthorizationCode();
  }

  async logout() {
    if (this.me)
      await this.me.httpClient(`${lichessHost}/api/token`, {
        method: "DELETE",
      });
    localStorage.clear();
    this.me = undefined;
  }

  authenticate = async () => {
    const httpClient = this.oauth.decorateFetchHTTPClient(window.fetch);
    const res = await httpClient(`${lichessHost}/api/account`);
    const me = {
      ...(await res.json()),
      httpClient,
    };
    if (me.error) toast.error(me.error);
    this.me = me;
  };

  openStream = async (path, config, handler) => {
    const stream = await this.fetchResponse(path, config);
    return readStream(`STREAM ${path}`, stream, handler);
  };

  fetchBody = async (path, config) => {
    const res = await this.fetchResponse(path, config);
    const body = await res.json();
    return body;
  };

  fetchResponse = async (path, config) => {
    const res = await (this.me?.httpClient || window.fetch)(
      `${lichessHost}${path}`,
      config
    );
    if (res.error || !res.ok) {
      const err = `${res.err}${res.status}${res.statusText}`;
      alert(err);
      throw err;
    }
    return res;
  };
}
