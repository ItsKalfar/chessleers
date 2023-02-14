import About from "components/About";
import Footer from "components/Footer";
import SocialMedia from "components/SocialMedia";
import Testimonials from "components/Testimonials";
import HeroSection from "../../components/HeroSection";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Chessleers</title>
        <meta
          http-equiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'unsafe-eval'; object-src 'none'; style-src 'unsafe-inline'"
        />
        {/* <meta http-equiv="Permissions-Policy" content="interest-cohort=()" /> */}
      </Head>
      <Toaster position="top-center" reverseOrder={false} />
      <HeroSection />
      <About />
      <Testimonials />
      <SocialMedia />
      <Footer />
    </>
  );
}
