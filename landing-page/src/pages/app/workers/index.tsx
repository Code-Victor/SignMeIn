import { Button } from "@/components/base";
import {
  ClockIcon,
  ChartIcon,
  HomeIcon,
  BriefcaseIcon,
} from "@/components/icons";
import { Sidebar } from "@/components/inc";
import Bottombar from "@/components/inc/Bottombar";
import Carousel from "@/components/inc/Carousel";
import EmployeeTable from "@/components/inc/EmployeeTable";
import { NextPageWithLayout } from "@/pages/_app";
import { Col, Grid, Icon, Text, Title } from "@tremor/react";
import Image from "next/image";
import React, { ReactElement } from "react";

const links = [
  {
    name: "Home",
    href: "/app/workers",
    icon: HomeIcon,
  },
  {
    name: "History",
    href: "/app/workers/history",
    icon: ClockIcon,
  },
  {
    name: "Leaderboard",
    href: "/app/workers/leaderboard",
    icon: ChartIcon,
  },
];

const Dashboard: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="text-xl font-medium mb-4">
        Hello, <span className="font-bold">Oluwaseun Hamzat</span>
      </h1>
      <Carousel>
        <Carousel.Slide className="md:flex-[0_0_40%] lg:flex-[0_0_33%] bg-primary text-white py-12 rounded-lg shadow flex items-center justify-center gap-4">
          <div className="flex items-center justify-center bg-white rounded-full w-12 h-12 text-primary">
            <BriefcaseIcon />
          </div>{" "}
          <div className="flex flex-col gap-1">
            <p>Total attendance</p>
            <h2 className="text-2xl font-bold">2,000</h2>
          </div>
        </Carousel.Slide>
        <Carousel.Slide className="md:flex-[0_0_40%] lg:flex-[0_0_33%] bg-primary text-white py-12 rounded-lg shadow flex items-center justify-center gap-4">
          <div className="flex items-center justify-center bg-white rounded-full w-12 h-12 text-primary">
            <BriefcaseIcon />
          </div>{" "}
          <div className="flex flex-col gap-1">
            <p>Total attendance</p>
            <h2 className="text-2xl font-bold">2,000</h2>
          </div>
        </Carousel.Slide>
        <Carousel.Slide className="md:flex-[0_0_40%] lg:flex-[0_0_33%] bg-primary text-white py-12 rounded-lg shadow flex items-center justify-center gap-4">
          <div className="flex items-center justify-center bg-white rounded-full w-12 h-12 text-primary">
            <BriefcaseIcon />
          </div>{" "}
          <div className="flex flex-col gap-1">
            <p>Total attendance</p>
            <h2 className="text-2xl font-bold">2,000</h2>
          </div>
        </Carousel.Slide>
      </Carousel>
      <div className="flex justify-center gap-2 mt-2 mb-6">
        <Button size="lg">Clock in</Button>
        <Button size="lg" disabled>
          Clock out
        </Button>
      </div>
      <EmployeeTable />
    </>
  );
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-col flex md:flex-row">
      <Sidebar links={links} />
      <div className="flex-1 ">
        <div>
          <nav className="px-4 flex justify-between md:justify-end items-center py-4 bg-white shadow-md">
            <h1 className="md:hidden text-primary text-2xl font-bold">
              SignMeIn
            </h1>
            <Image
              src="/img/avatar.png"
              alt="avatar"
              width={60}
              height={60}
              className="h-12 w-12"
            />
          </nav>
          <div className="px-4 pt-2">{children}</div>
        </div>
      </div>
      <Bottombar links={links} />
    </div>
  );
}
Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;
