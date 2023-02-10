import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SiLichess } from "react-icons/si";
import { OAuth2AuthCodePKCE } from "@bity/oauth2-auth-code-pkce";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);

  if (typeof window !== "undefined") {
    const lichessHost = `https://lichess.org`;
    const clientId = "http://localhost:3000/";
    const scopes = ["email:read"];
    const clientUrl = "http://localhost:3000/logged";
    const oauth = new OAuth2AuthCodePKCE({
      authorizationUrl: `${lichessHost}/oauth`,
      tokenUrl: `${lichessHost}/api/token`,
      clientId,
      scopes,
      redirectUrl: clientUrl,
      onAccessTokenExpiry: (refreshAccessToken) => refreshAccessToken(),
      onInvalidGrant: (error) => toast.error(error),
    });

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
    };

    const authenticate = async () => {
      const httpClient = oauth.decorateFetchHTTPClient(window.fetch);
      const res = await httpClient(`${lichessHost}/api/account`);
      const userEmail = { ...(await res.json()), httpClient };
      if (userEmail.error) throw email.error;
      setEmail(userEmail);
    };
  }

  const handleLogIn = async () => {};
  const handleLogOut = async () => {};

  return (
    <nav className="container navbar">
      <div>
        <Link href="/" id="logo">
          Chesslers
        </Link>
      </div>
      <div className="nav-links">
        <input placeholder={"Search"} className="search-input" />
        <Link href="/leaderboard" className="nav-link">
          Leaderboard
        </Link>
        {email ? (
          <button className="btn btn-yellow" onClick={handleLogOut}>
            <span>Log out</span>
            <SiLichess className="Silichess" />
          </button>
        ) : (
          <button className="btn btn-yellow" onClick={handleLogIn}>
            <span>Login with</span>
            <SiLichess className="Silichess" />
          </button>
        )}
        <div className="user-profile">{email}</div>
      </div>
    </nav>
  );
}
