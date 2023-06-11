import Image from "next/image";
import React from "react";
import { Button } from "../base";
import dasboardImage from "@public/img/Dashboard 1.png";

function About() {
  return (
    <div className="container mx-auto py-9 px-5">
      <h1 className="text-2xl md:text-4xl max-w-[1030px] mx-auto font-bold text-center text-primary ">
        Built to Empower Organizations Monitor and Encourage Promptness at Work
      </h1>
      <Image
        src={dasboardImage}
        alt="sample dashboard"
        className="pt-10 mx-auto"
      />
    </div>
  );
}

export default About;
