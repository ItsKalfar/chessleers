import React from "react";
import Image from "next/image";
import chess from "../assets/chess.jpeg";

export default function HeroSection() {
  return (
    <section className="container">
      <div className=" hero-section">
        <div className="hero-section-img">
          <Image src={chess} alt={"chess-img"} />
        </div>
        <div className="hero-section-text">
          <h1>Play Chess</h1>
          <h1>Get Paid</h1>
          <p>Join now to get $5 and get started</p>
        </div>
      </div>
    </section>
  );
}
