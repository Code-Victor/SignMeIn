import Image from "next/image";
import React from "react";
import Button from "./Button";

function About() {
  return (
    <div className="container mx-auto py-9 px-20">
      <h1 className="text-xl md:text-4xl font-bold text-center text-primary md:px-72">
        Built to help organization monitor and encourage promptness at work
      </h1>
      <img src="/img/Dashboard 1.png" alt="" className="pt-10 mx-auto" />
    </div>
  );
}

export default About;
