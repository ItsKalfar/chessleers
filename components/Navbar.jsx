import React from "react";
import Link from "next/link";
import { SiLichess } from "react-icons/si";
import {
  AccessContext,
  HttpClient,
  OAuth2AuthCodePKCE,
} from "@bity/oauth2-auth-code-pkce";

export default function Navbar() {
  const lichessHost = "https://lichess.org";
  const clientId = "http://localhost:3000/";
  const redirectUrl = `http://localhost:3000/${res}`;
  const code_challenge_method = "";
  const code_challenge = "";
  const scopes = ["email:read"];
  const username = "";
  const state = "";

  const oauth = new OAuth2AuthCodePKCE({
    authorizationUrl: lichessHost,
    clientId,
    redirectUrl,
    scopes,
    onInvalidGrant: toast.error("Something went wrong!"),
  });

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
        <Link href="https://lichess.org/login" className="btn btn-yellow">
          <p>Login with</p>
          <SiLichess className="Silichess" />
        </Link>
      </div>
    </nav>
  );
}
