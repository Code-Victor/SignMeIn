import Image, { StaticImageData } from "next/image";
import React from "react";
import Button from "./base/Button";
import pana from "../../public/img/pana.svg";

type ReasonProps = {
  heading: string;
  subheading: string;
  paragraph: string;
  image: StaticImageData;
};

function Reason({ heading, subheading, paragraph, image }: ReasonProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-12 ">
      <div className="flex-1">
        <Image
          src={image}
          alt={subheading}
          className="w-full max-w-[400px] mx-auto"
        />
      </div>

      <div className="flex flex-col gap-4 md:flex-1">
        <span className="text-sm">{subheading.toUpperCase()}</span>
        <h1 className="text-primary text-2xl  md:text-4xl font-bold">
          {heading}
        </h1>
        <p>{paragraph}</p>
      </div>
    </div>
  );
}

const data: ReasonProps[] = [
  {
    heading: "Say Goodbye to Time-Tracking Hassles with SignMeIn",
    subheading: "keep track",
    paragraph:
      "SignMeIN simplifies attendance management for businesses withadvanced features like QR-code, GPS location tracking, and automated timesheets, eliminating manual tracking's time-consumingand error-prone processes.",
    image: pana,
  },
  {
    heading: "Keep Your Business Running Smoothly with SignMeIn",
    subheading: "save time and cost",
    paragraph:
      "SignMeIn is an attendance management app that simplifies employee attendance tracking and saves businesses time and money. Its real-time attendance tracking, shift scheduling, and vacation request features make it an ideal solution for busy business owners who want to focus on growing their business.",
    image: pana,
  },
  {
    heading: "Make Attendance Management a Breeze with SignMeIn",
    subheading: "easy to use",
    paragraph:
      "Streamline attendance management with SignMeIn - the user-friendly time attendant app. Your employees can clock in/out, request time off, and view schedules, all in one place. Keep your business running smoothly with SignMeIn.",
    image: pana,
  },
];

function Why() {
  return (
    <div className="container mx-auto py-9 px-5">
      <h1 className="text-2xl md:text-4xl font-bold text-center">
        Why should you use SignMeIn
      </h1>
      <div className="pt-9 md:[&>*:nth-child(2)]:flex-row-reverse flex flex-col gap-20 ">
        {data.map((reason) => (
          <Reason {...reason} key={reason.heading} />
        ))}
      </div>
    </div>
  );
}

export default Why;
