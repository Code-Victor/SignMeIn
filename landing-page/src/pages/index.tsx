import Image from "next/image";
import { Inter } from "next/font/google";
import { Why, Hero, About, Navbar, Cta, Features, Footer } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar />
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
