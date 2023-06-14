import Image from "next/image";
import { Inter } from "next/font/google";
import {
  Why,
  Hero,
  About,
  Navbar,
  Cta,
  Features,
  Footer,
} from "@/components/inc";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>SignMeIn | Home</title>
        <meta
          name="description"
          content="Effortless attendance tracking with QR codes. Simplify record-keeping, ensure accuracy. Experience seamless management with our QR code technology."
        />
      </Head>
      <Navbar main />
      <main>
        <Hero />
        <About />
        <Why />
        <Features />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
