import { useState, createContext, useEffect } from "react";
import { OAuth2AuthCodePKCE } from "@bity/oauth2-auth-code-pkce";

// Exporting context
export const ChessleersContext = createContext();

// Context provider

export const ChessleersContextProvider = ({ children }) => {
  // To get the email address of the player after he/she logs in
  const [email, setEmail] = useState(null);

  // Authentication variable
  let oauth;

  //Parameters to pass in function OAuth2AuthCodePKCE while development
  const lichessHost = process.env.NEXT_PUBLIC_LICHESS_HOST;
  const clientId = "";
  const scopes = ["email:read"];
  const clientUrl = "http://localhost:3000/logged";

  if (typeof window !== "undefined") {
    oauth = new OAuth2AuthCodePKCE({
      authorizationUrl: `${lichessHost}/oauth`,
      tokenUrl: `${lichessHost}/api/token`,
      clientId,
      scopes,
      redirectUrl: clientUrl,
      onAccessTokenExpiry: (refreshAccessToken) => refreshAccessToken(),
      onInvalidGrant: (error) => console.log(error),
    });
  }

  const authenticate = async () => {
    const httpClient = oauth.decorateFetchHTTPClient(window.fetch);
    const res = await httpClient(`${lichessHost}/api/account`);
    const userEmail = { ...(await res.json()), httpClient };
    if (userEmail.error) throw email.error;
    setEmail(userEmail);
    console.log(userEmail);
  };

  // Check if user has already logged in
  const checkStatus = async () => {
    if (typeof email !== null || typeof email !== "undefined") {
      try {
        const hasAuthCode = await oauth.isReturningFromAuthServer();
        if (hasAuthCode) await authenticate();
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Get the access to the token stored in localStorage
  const getAccess = async () => {
    try {
      const accessContext = await oauth.getAccessToken();
      if (accessContext) await authenticate();
    } catch (error) {
      console.log(error);
    }
  };

  // Login into the account
  const handleLogin = async () => {
    await oauth.fetchAuthorizationCode();
  };

  // Logout
  const handleLogout = async () => {};

  useEffect(() => {
    getAccess();
  }, []);

  return (
    <ChessleersContext.Provider value={{ email, handleLogin }}>
      {children}
    </ChessleersContext.Provider>
  );
};
