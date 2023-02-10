import React, { useState } from "react";
import Link from "next/link";
import { SiLichess } from "react-icons/si";
import { OAuth2AuthCodePKCE } from "@bity/oauth2-auth-code-pkce";
import { toast } from "react-hot-toast";
import axios from "axios";
import queryString from "query-string";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const lichessHost = "https://lichess.org";
  const clientId = "http://localhost:3000/";
  const clientUrl = `http://localhost:3000/logged`;
  const scopes = ["email:read"];

  const handleLogin = async () => {
    const auth = new OAuth2AuthCodePKCE({
      authorizationUrl: `${lichessHost}/oauth`,
      tokenUrl: `${lichessHost}/api/token`,
      clientId,
      scopes,
      redirectUrl: clientUrl,
      onAccessTokenExpiry: (refreshAccessToekn) => refreshAccessToekn(),
      onInvalidGrant: console.warn,
    });

    try {
      await auth.fetchAuthorizationCode();
      setIsLoggedIn(true);
      toast.success("Done");
    } catch (error) {
      toast.error(error);
    }
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
        {isLoggedIn ? (
          <button className="btn btn-yellow" onClick={handleLogin}>
            <p>Log Out</p>
            <SiLichess className="Silichess" />
          </button>
        ) : (
          <button className="btn btn-yellow" onClick={handleLogin}>
            <p>Login with</p>
            <SiLichess className="Silichess" />
          </button>
        )}
      </div>
    </nav>
  );
}
