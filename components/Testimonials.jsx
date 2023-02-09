import React from "react";
import Image from "next/image";
import mesh from "../assets/mesh.webp";
import tachyon from "../assets/tachyon.webp";
import protocolLabs from "../assets/protocolLabs.webp";

export default function Testimonials() {
  return (
    <section className="container testimonials">
      <h1>Backed By the Giants</h1>
      <p>
        They are not just the backers, but believers of what we do, and how we
        aim to change the ecosystem and become the part of the change.
      </p>
      <div className="img-wrapper">
        <Image className="brand-logo" src={mesh} alt="" />
        <Image className="brand-logo" src={tachyon} alt="" />
        <Image className="brand-logo" src={protocolLabs} alt="" />
      </div>
    </section>
  );
}
