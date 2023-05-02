import Image from "next/image";
import React from "react";
import Button from "./Button";

function Why() {
  return (
    <div className="container mx-auto py-9 px-20">
      <h1 className="text-xl md:text-4xl font-bold text-center">
        Why should you use SignMeIn
      </h1>
      <div className="pt-9 flex flex-col gap-20 ">
        <div className="flex flex-col md:flex-row items-center gap-28 ">
          <img src="/img/pana.png" alt="" className="basis-1/2 h-96" />

          <div className="flex flex-col gap-5 basis-1/2">
            <p>KEEP TRACK</p>
            <p className="text-primary text-xl md:text-4xl font-bold">
              Say Goodbye to Time-Tracking Hassles with SignMeIn
            </p>
            <p>
              SignMeIN simplifies attendance management for businesses with
              advanced features like QR-code, GPS location tracking, and
              automated timesheets, eliminating manual tracking's time-consuming
              and error-prone processes.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-28">
          <div className="flex flex-col gap-5 basis-1/2">
            <p>SAVE TIME AND COST</p>
            <p className="text-primary text-xl md:text-4xl font-bold">
              Keep Your Business Running Smoothly with SignMeIn
            </p>
            <p>
              SignMeIn is an attendance management app that simplifies employee
              attendance tracking and saves businesses time and money. Its
              real-time attendance tracking, shift scheduling, and vacation
              request features make it an ideal solution for busy business
              owners who want to focus on growing their business.
            </p>
          </div>
          <img src="/img/pana.png" alt="" className="basis-1/2 h-96" />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-28">
          <img src="/img/pana.png" alt="" className="basis-1/2 h-96" />
          <div className="flex flex-col gap-5 basis-1/2">
            <p>EASY TO USE</p>
            <p className="text-primary text-xl md:text-4xl font-bold">
              Make Attendance Management a Breeze with SignMeIn
            </p>
            <p>
              Streamline attendance management with SignMeIn - the user-friendly
              time attendant app. Your employees can clock in/out, request time
              off, and view schedules, all in one place. Keep your business
              running smoothly with SignMeIn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Why;
