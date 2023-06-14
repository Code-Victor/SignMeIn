import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../base";

function Cta() {
  return (
    <div className="bg-white py-10 md:py-12 px-5">
      <div className="mx-auto shadow-lg bg-primary rounded-[32px] max-w-[1140px] overflow-hidden grid place-items-center relative">
        <Image
          src="/img/blob-1.svg"
          className="absolute top-0 right-0 min-w-[112px] w-[20%]"
          alt="blob"
          width={112}
          height={70}
        />
        <Image
          src="/img/blob-2.svg"
          className="absolute left-0 bottom-0 min-w-[119px] w-[20%]"
          alt="blob"
          width={119}
          height={201}
        />
        <div className="flex flex-col items-center gap-6 py-24 px-5">
          <h1 className="text-white text-2xl md:text-5xl max-w-[700px] text-center font-bold">
            Boost promptness, streamline attendance, save costs with SignMeIn.
          </h1>
          <Link href="/signup">
            <Button size={{ initial: "md", md: "lg" }} color="light">
              Get started now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cta;
