import React from "react";
import {
  Card,
  Metric,
  Text,
  Flex,
  BadgeDelta,
  DeltaType,
  Grid,
  Title,
  Col,
  Icon,
} from "@tremor/react";
import Image from "next/image";
import ChartCard from "@/components/inc/Chart";
import QrCard from "@/components/inc/QrCard";
import EmployeeTable from "@/components/inc/EmployeeTable";
import { Sidebar } from "@/components/inc";
import {
  BriefcaseIcon,
  ChartIcon,
  ClockIcon,
  HomeIcon,
} from "@/components/icons";

const links = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "History",
    href: "/workers",
    icon: BriefcaseIcon,
  },
  {
    name: "Leaderboard",
    href: "#",
    icon: ChartIcon,
  },
];

function Dashboard() {
  return (
    <div className="flex">
      <Sidebar links={links} />
      <div className="flex-1 px-4 pt-4">
        {/* <nav className="flex justify-between items-center h-16 pr-4 shadow-md">
          <div />
          <div className="flex gap-2 items-center">
            <Image src="/img/avatar.png" alt="avatar" width={40} height={40} />
            <Text className="text-lg font-medium">Alade Christopher</Text>
          </div>
        </nav> */}
        {/* <div>
          <Text>Welcome</Text>
          <Title>Kibo School Organisation</Title>
        </div> */}
        <div className="my-4 py-10 px-10">
          <div className="flex gap-3">
            <Image src="/img/avatar.png" alt="avatar" width={60} height={60} />
            <div>
              <p className="font-light text-sm">Good evening</p>
              <p className="font-bold text-lg">Alade Christopher</p>
            </div>
          </div>
          <div className="flex justify-between pt-10">
            <div className="flex gap-4 bg-secondary rounded-xl py-10 px-12">
              <div className="bg-primary p-1 rounded-full">
                <Icon icon={BriefcaseIcon} size="xl" color="white" />
              </div>
              <div>
                <p className="text-primary font-bold">Total Attendance</p>
                <p className=" text-2xl font-bold">309</p>
              </div>
            </div>
            <div className="flex gap-4 bg-secondary rounded-xl py-10 px-12">
              <div className="bg-primary p-1 rounded-full">
                <Icon icon={BriefcaseIcon} size="xl" color="white" />
              </div>
              <div>
                <p className="text-primary font-bold">Avg. Check In Time</p>
                <p className=" text-2xl font-bold">309</p>
              </div>
            </div>
            <div className="flex gap-4 bg-secondary rounded-xl py-10 px-12">
              <div className="bg-primary p-1 rounded-full">
                <Icon icon={BriefcaseIcon} size="xl" color="white" />
              </div>
              <div>
                <p className="text-primary font-bold">Avg. Check Out Time</p>
                <p className=" text-2xl font-bold">309</p>
              </div>
            </div>
            
          </div>
        </div>
        <div>
          <Title className="text-primary">Dashboard</Title>
          <Grid numCols={5} className="gap-6">
            {/* <Col numColSpan={2} className="h-full">
              <Card
                decoration="left"
                decorationColor="purple"
                className="flex justify-between items-center h-full"
              >
                <div>
                  <Text>Total workers</Text>
                  <Metric>500</Metric>
                </div>
                <div className="bg-primary/30 flex items-center justify-center w-12 h-12 rounded-full">
                  <Icon icon={BriefcaseIcon} size="xl" color="violet" />
                </div>
              </Card>
            </Col> */}
            {/* <Col numColSpan={2} className="h-full">
              <Card
                decoration="left"
                decorationColor="purple"
                className="flex justify-between items-center h-full"
              >
                <div>
                  <Text>Total workers</Text>
                  <Metric>500</Metric>
                  <Text className="text-primary text-sm">
                    {new Date().toDateString()}
                  </Text>
                </div>
                <div className="bg-primary/30 flex items-center justify-center w-12 h-12 rounded-full">
                  <Icon icon={BriefcaseIcon} size="xl" color="violet" />
                </div>
              </Card>
            </Col> */}
            {/* <QrCard /> */}
            {/* <Col numColSpan={4}>
              <ChartCard />
            </Col> */}
            <Col numColSpan={5}>
              <EmployeeTable />
            </Col>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
