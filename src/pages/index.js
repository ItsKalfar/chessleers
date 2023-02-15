import About from "components/About";
import Footer from "components/Footer";
import SocialMedia from "components/SocialMedia";
import Testimonials from "components/Testimonials";
import HeroSection from "../../components/HeroSection";
import { Toaster } from "react-hot-toast";

export default function Navbar() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <HeroSection />
      <About />
      <Testimonials />
      <SocialMedia />
      <Footer />
    </>
  );
}
