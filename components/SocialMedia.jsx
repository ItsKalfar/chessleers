import React from "react";
import { AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import Link from "next/link";

export default function SocialMedia() {
  return (
    <section className="container">
      <div className="social-media">
        <h2>Connect With Us</h2>
        <div className="social-media-icons">
          <Link href="/">
            <AiOutlineTwitter className="social-media-icon" />
          </Link>
          <Link href="/">
            <AiOutlineInstagram className="social-media-icon" />
          </Link>
          <Link href="/">
            <FaDiscord className="social-media-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
}
