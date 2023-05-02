import Image from "next/image";
import React from "react";
import Button from "./Button";

function Features() {
  return (
    <div className="bg-primary py-8 px-5 relative overflow-hidden">
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
      <div className="flex flex-col md:flex-row gap-6 py-5 px-5">
        <div className="grid grid-cols-1 basis-1/2">
          <h1 className="text-white font-bold">
            Features that makes us standout
          </h1>
        </div>
        <img src="/img/Mockup 1.png" alt="" className="basis-1/2" />
      </div>
    </div>
  );
}

export default Features;
