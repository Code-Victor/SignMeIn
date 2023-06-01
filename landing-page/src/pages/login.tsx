import { Footer, Navbar } from "@/components/inc";
import Image from "next/image";


export default function SignIn() {
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
          <div>
            <h1>Create your account</h1>
            <p>Let`s get you started</p>
            <form>
              <div className="flex flex-col gap-4">
                <label>Fullname</label>
                <input id="fullname"></input>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
