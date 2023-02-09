import About from "components/About";
import Footer from "components/Footer";
import SocialMedia from "components/SocialMedia";
import Testimonials from "components/Testimonials";
import HeroSection from "../../components/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <About />
      <Testimonials />
      <SocialMedia />
      <Footer />
    </>
  );
}
