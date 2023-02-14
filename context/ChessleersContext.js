import React, { useState, createContext, useEffect } from "react";
import { OAuth2AuthCodePKCE } from "@bity/oauth2-auth-code-pkce";
import { toast } from "react-hot-toast";

export const ChessleersContext = createContext();

export const ChessleersContextProvider = ({ children }) => {
  const [email, setEmail] = useState(null);
  let oauth;

  const lichessHost = `https://lichess.org`;
  const clientId = "http://localhost:3000/";
  const scopes = ["email:read"];
  const clientUrl = "http://localhost:3000/logged";

  if (typeof window !== "undefined") {
    oauth = new OAuth2AuthCodePKCE({
      authorizationUrl: `${lichessHost}/oauth`,
      tokenUrl: `${lichessHost}/api/token`,
      clientId,
      scopes,
      redirectUrl: clientUrl,
      onAccessTokenExpiry: console.log("Token expired"),
      onInvalidGrant: (error) => console.log(error),
    });
  }

  async () => {
    try {
      const accessContext = await oauth.getAccessToken();
      if (accessContext) await authenticate();
    } catch (error) {
      toast.error(error);
    }
    if (typeof email !== null || typeof email !== "undefined") {
      try {
        const hasAuthCode = await oauth.isReturningFromAuthServer();
        if (hasAuthCode) await authenticate();
      } catch (err) {
        toast.error(err);
      }
    }
    const authenticate = async () => {
      const httpClient = oauth.decorateFetchHTTPClient(window.fetch);
      const res = await httpClient(`${lichessHost}/api/account`);
      const userEmail = { ...(await res.json()), httpClient };
      if (userEmail.error) throw email.error;
      setEmail(userEmail);
    };
  };

  const handleLogin = async () => {
    try {
      await oauth.fetchAuthorizationCode();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleLogout = async () => {};

  useEffect(() => {}, []);

  return (
    <ChessleersContext.Provider value={{ email, handleLogin }}>
      {children}
    </ChessleersContext.Provider>
  );
};
