import React from "react";
import Image from "next/image"
import Button from "./Button";


const Hero = () => {
  return (
    <div className="bg-primary min-h-[calc(100vh_-_96px)] flex items-center justify-center relative">
        <Image src="/img/qr-1.png" alt="sample qr code" className="absolute top-1/2 left-0" width={100} height={200}/>
        <Image src="/img/qr-2.png" alt="sample qr code" className="absolute top-1/2 right-0" width={129} height={280} />
        <Image src="/img/wave.png" alt="wave" className="absolute" objectFit="cover" layout="fill" />
      <div >
        <h1 className="text-white text-center text-6xl font-bold max-w-[1140px] mx-auto">
          Effortless Attendance Tracking with QR Codes
        </h1>
        <p className="mt-4 text-lg text-white text-center max-w-[630px] mx-auto">
          Effortlessly track attendance with our QR-code software. Quick scans
          record and organize data in real-time, saving you time and effort.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Button color="light" size="lg">For organisation</Button>
          <Button color="light" size="lg">For Worker</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
