import { Footer, Navbar, SignupForm } from "@/components/inc";
import Head from "next/head";
import Image from "next/image";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>SignMeIn | Sign Up</title>
      </Head>
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
          <div className="max-w-lg mx-auto w-full">
            <h1 className="text-3xl font-bold text-center">
              Create your account
            </h1>
            <p className="text-center text-gray-500 mt-2">
              Let’s get you started with you started
            </p>
            <SignupForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
