import React from "react";
import Image from "next/image";
import { Button } from "../base";
import Link from "next/link";
const Hero = () => {
  return (
    <div className="bg-primary min-h-[calc(100vh_-_96px)] px-5 flex items-center justify-center relative isolate">
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
      <Image
        src="/img/wave.svg"
        alt="wave"
        className="absolute -z-[2] opacity-40"
        objectFit="cover"
        layout="fill"
      />
      <div className="z-2">
        <h1 className="text-white text-center text-2xl xs:text-4xl md:text-6xl font-bold max-w-[1000px] mx-auto">
          Effortless Attendance Tracking Made Easy with QR Codes
        </h1>
        <p className="mt-4 text-base md:text-lg text-white text-center max-w-[630px] mx-auto">
          {/* Effortlessly track attendance with our QR-code software. Quick scans
          record and organize data in real-time, saving you time and effort. */}
          Effortless attendance tracking with QR codes. Simplify record-keeping,
          ensure accuracy. Experience seamless management with our QR code
          technology.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/signup">
            <Button color="light" size={{ initial: "md", md: "lg" }}>
              For organisation
            </Button>
          </Link>
          <Link href="/login">
            <Button color="light" size={{ initial: "md", md: "lg" }}>
              For Worker
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
