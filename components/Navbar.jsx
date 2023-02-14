import React, { useContext } from "react";
import Link from "next/link";
import { SiLichess } from "react-icons/si";
import { ChessleersContext } from "../context/ChessleersContext";

export default function Navbar() {
  const { handleLogin, email } = useContext(ChessleersContext);
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
          <button className="btn btn-yellow">
            <span>Log out</span>
            <SiLichess className="Silichess" />
          </button>
        ) : (
          <button className="btn btn-yellow" onClick={handleLogin()}>
            <span>Login with</span>
            <SiLichess className="Silichess" />
          </button>
        )}
      </div>
    </nav>
  );
}
