import React, { useEffect, useState } from "react";
import Link from "next/link";
import { SiLichess } from "react-icons/si";
import { OAuth2AuthCodePKCE } from "@bity/oauth2-auth-code-pkce";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const checkAuthCode = async () => {
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
      try {
        const hasAuthCode = await oauth.isReturningFromAuthServer();
        if (hasAuthCode) {
          accessContext = await oauth.getAccessToken();
          if (typeof window !== "undefined") {
            const fetch = oauth.decorateFetchHTTPClient(window.fetch);
            const res = await fetch(`${lichessHost}/api/account`);
            const userEmail = { ...(await res.json()), httpClient };
            toast.success(userEmail);
            setEmail(userEmail);
          }
        }
      } catch (error) {
        toast.error(error);
      }
    };
    checkAuthCode();
    toast.success("Run");
  }, [email]);

  const handleLogIn = async () => {
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

    await oauth.fetchAuthorizationCode();
    try {
      const accessContext = await oauth.getAccessToken();
      if (accessContext) {
        if (typeof window !== "undefined") {
          const fetch = oauth.decorateFetchHTTPClient(window.fetch);
          const res = await fetch(`${lichessHost}/api/account`);
          const userEmail = { ...(await res.json()), httpClient };
          toast.success(userEmail);
          setEmail(userEmail);
        }
      }
    } catch (error) {
      toast.error(error);
    }

    if (!email) {
      try {
        const hasAuthCode = await oauth.isReturningFromAuthServer();
        if (hasAuthCode) {
          if (typeof window !== "undefined") {
            const fetch = oauth.decorateFetchHTTPClient(window.fetch);
            const res = await fetch(`${lichessHost}/api/account`);
            const userEmail = { ...(await res.json()), httpClient };
            toast.success(userEmail);
            setEmail(userEmail);
          }
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };
  const handleLogOut = async () => {
    if (email) {
      await email.httpClient(`${lichessHost}/api/token`, { method: "DELETE" });
      localStorage.clear();
      setEmail(null);
    }
    setIsLoggedIn(false);
  };

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
