import Image from "next/image";
import { Inter } from "next/font/google";
import { Hero, Navbar, Cta, Footer } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
