import { Button } from "@/components/base";
import { useSession, signIn, signOut } from "next-auth/react";
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
import HistoryTable from "@/components/inc/HistoryTable";
import { NextPageWithLayout } from "@/pages/_app";
import { Col, Grid, Icon, Text, Title } from "@tremor/react";
import Image from "next/image";
import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import Scanner from "@/components/inc/Scanner";
import { useQuery } from "react-query";
import { getWorkerAttendance } from "@/api";
import { Ring } from "@uiball/loaders";

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
  const { data: session, status } = useSession();
  const name = session?.user.username;
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState<"clock_in" | "clock_out">("clock_in");
  const { data } = useQuery("workerAttendanceHistory", () =>
    getWorkerAttendance(session?.user.access as string)
  );
  return (
    <>
      <h1 className="text-xl font-medium mb-4">
        Hello, <span className="font-bold">{name}</span>
      </h1>
      <Carousel>
        <Carousel.Slide className="md:flex-[0_0_40%] lg:flex-[0_0_33%] bg-primary text-white py-12 rounded-lg shadow flex items-center justify-center gap-4">
          <div className="flex items-center justify-center bg-white rounded-full w-12 h-12 text-primary">
            <BriefcaseIcon />
          </div>
          <div className="flex flex-col gap-1">
            <p>Total attendance</p>
            <h2 className="text-2xl font-bold">{data?.length}</h2>
          </div>
        </Carousel.Slide>
        <Carousel.Slide className="md:flex-[0_0_40%] lg:flex-[0_0_33%] bg-primary text-white py-12 rounded-lg shadow flex items-center justify-center gap-4">
          <div className="flex items-center justify-center bg-white rounded-full w-12 h-12 text-primary">
            <ClockIcon />
          </div>
          <div className="flex flex-col gap-1">
            <p>Average Time In</p>
            <h2 className="text-2xl font-bold">08:01 AM</h2>
          </div>
        </Carousel.Slide>
        <Carousel.Slide className="md:flex-[0_0_40%] lg:flex-[0_0_33%] bg-primary text-white py-12 rounded-lg shadow flex items-center justify-center gap-4">
          <div className="flex items-center justify-center bg-white rounded-full w-12 h-12 text-primary">
            <ClockIcon />
          </div>
          <div className="flex flex-col gap-1">
            <p>Average Time Out</p>
            <h2 className="text-2xl font-bold">5:06 PM</h2>
          </div>
        </Carousel.Slide>
      </Carousel>
      <div className="flex justify-center gap-2 mt-2 mb-6">
        <Button
          size="lg"
          onClick={() => {
            setOpen(true);
            setType("clock_in");
          }}
        >
          Clock in
        </Button>
        <Button
          size="lg"
          onClick={() => {
            setOpen(true);
            setType("clock_out");
          }}
        >
          Clock out
        </Button>
        <Scanner open={open} onChange={(open) => setOpen(open)} type={type} />
      </div>
      <HistoryTable data={data} />
    </>
  );
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const name = session?.user.username;
  console.log(session);
  if (status === "loading") {
    return (
      <div className="min-h-screen min-w-screen grid place-items-center">
        <Ring size={50} color="#663ed6" />
      </div>
    );
  }
  if (session?.user.role !== "is_worker") {
    router.push("/login?message=unauthorized");
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }
  return (
    <div className="flex-col flex md:flex-row">
      <Sidebar links={links} />
      <div className="flex-1 ">
        <div>
          <nav className="px-4 flex justify-between md:justify-end items-center py-4 bg-white shadow-md">
            <h1 className="md:hidden text-primary text-2xl font-bold">
              SignMeIn
            </h1>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                {name?.[0]}
              </div>

              <Text className="text-lg font-medium">{name}</Text>
            </div>
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
