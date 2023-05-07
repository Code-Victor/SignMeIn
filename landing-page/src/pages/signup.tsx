import { Footer, Navbar } from "@/components";
import Image from "next/image";
1
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div className="bg-white min-h-[calc(100vh_-_96px)] px-5 flex items-center justify-center relative isolate">
          <Image
            src="/img/qr-1.png"
            alt="sample qr code"
            className="absolute top-0 md:top-1/2 -z-[1] left-0"
            width={100}
            height={200}
          />
          <Image
            src="/img/qr-2.png"
            alt="sample qr code"
            className="absolute bottom-0  -z-[1]  md:top-1/2 right-0"
            width={129}
            height={280}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
