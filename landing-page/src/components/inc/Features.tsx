import Image from "next/image";
import React from "react";
import { Button } from "../base";
import mockup from "@public/img/Mockup.svg";

const features = [
  // {
  //   heading: "Clock in and out with QR-code scanning and Fingerprint",
  //   pargraph:
  //     "take your attendants by scanning a daily generated admin QR code or finger print scanner",
  // },
  // {
  //   heading: "Clock in and out with QR-code scanning and Fingerprint",
  //   pargraph:
  //     "take your attendants by scanning a daily generated admin QR code or finger print scanner",
  // },
  // {
  //   heading: "Clock in and out with QR-code scanning and Fingerprint",
  //   pargraph:
  //     "take your attendants by scanning a daily generated admin QR code or finger print scanner",
  // },
  {
    heading: "Effortless Clock-in and Clock-out",
    paragraph:
      "With SignMeIn, attendees can easily clock in and out using our convenient QR code scanning method. Simply scan the daily generated admin QR code for a seamless attendance experience.",
  },
  {
    heading: "Comprehensive Tracking Dashboard",
    paragraph:
      "SignMeIn provides organizations with a powerful tracking dashboard to monitor attendance data in real-time. Gain valuable insights into attendance patterns, trends, and overall attendance performance, empowering you to make informed decisions and optimize your operations.",
  },
  {
    heading: "Access to Leaderboard",
    paragraph:
      "Engage and motivate your attendees with SignMeIn's leaderboard feature. Recognize and reward individuals or teams with the highest attendance records, fostering a healthy sense of competition and driving attendance excellence.",
  },
];

function Features() {
  return (
    <div className="bg-primary relative overflow-hidden">
      <Image
        src="/img/Vector.svg"
        className="absolute top-0 left-0 min-w-[112px] w-[15%]"
        alt="blob"
        width={112}
        height={70}
      />
      <Image
        src="/img/Vector2.svg"
        className="absolute right-0 bottom-0 min-w-[119px] w-[20%]"
        alt="blob"
        width={119}
        height={70}
      />
      <div className="container mx-auto flex flex-col md:flex-row gap-20 items-center py-10 md:py-12  px-5 text-white">
        <div className="grid grid-cols-1 basis-1/2 z-40">
          <div className="flex flex-col gap-10">
            <h1 className="text-center text-2xl md:text-left md:text-4xl font-bold">
              Features that makes us standout
            </h1>
            <div className="flex flex-col gap-5 md:gap-8">
              {features.map((feature, i) => (
                <div key={i}>
                  <h2 className="font-bold text-lg">{feature.heading}</h2>
                  <p className="font-thin">{feature.paragraph}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Image
          src={mockup}
          alt="model version"
          className="basis-1/2 max-h-[540px] z-40"
        />
      </div>
    </div>
  );
}

export default Features;
