import { useContext } from "react";
import Link from "next/link";
import { SiLichess } from "react-icons/si";
import { ChessleersContext } from "../context/ChessleersContext";

export default function Navbar() {
  const { handleLogin, email } = useContext(ChessleersContext);

  const handle = () => {
    handleLogin();
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
        <button className="btn btn-yellow" onClick={handle}>
          <span>Login with</span>
          <SiLichess className="Silichess" />
        </button>
      </div>
    </nav>
  );
}
