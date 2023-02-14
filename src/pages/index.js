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
          content="default-src http://localhost:3000/; object-src 'none'; unsafe-inline"
        ></meta>
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
