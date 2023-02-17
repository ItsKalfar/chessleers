import Tilt from "react-parallax-tilt";

export default function HeroSection() {
  return (
    <section className="container">
      <div className=" hero-section">
        <Tilt
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          perspective={1000}
          className="hero-section-img"
        ></Tilt>
        <div className="hero-section-text">
          <h1>Play Chess</h1>
          <h1>Get Paid</h1>
          <p>Join now to get $5 and get started</p>
        </div>
      </div>
    </section>
  );
}
