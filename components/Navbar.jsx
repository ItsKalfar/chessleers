import React from "react";
import Link from "next/link";
import { SiLichess } from "react-icons/si";

export default function Navbar() {
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
        <button className="btn-yellow">
          <p>Login with</p>
          <SiLichess className="Silichess" />
        </button>
      </div>
    </nav>
  );
}
