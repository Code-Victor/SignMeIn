import {
  BriefcaseIcon,
  ChartIcon,
  ClockIcon,
  HomeIcon,
} from "@/components/icons";
import { Sidebar } from "@/components/inc";
import ChartCard from "@/components/inc/Chart";
import EmployeeTable from "@/components/inc/EmployeeTable";
import QrCard from "@/components/inc/QrCard";
import type { NextPageWithLayout } from "@/pages/_app";
import { Card, Col, Grid, Icon, Metric, Text, Title } from "@tremor/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { Ring } from "@uiball/loaders";

const links = [
  {
    name: "Overview",
    href: "/app/organizations",
    icon: HomeIcon,
  },
  {
    name: "Workers",
    href: "/app/organizations/workers",
    icon: BriefcaseIcon,
  },
  {
    name: "History",
    href: "/app/organizations/history",
    icon: ClockIcon,
  },
  {
    name: "Leaderboard",
    href: "/app/organizations/leaderboard",
    icon: ChartIcon,
  },
];

const Dashboard: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  return (
    <>
      <div>
        <Text>Welcome</Text>
        <Title>{session?.user.username}</Title>
      </div>
      <div>
        <Title className="text-primary">Dashboard</Title>
        <Grid numCols={5} className="gap-6">
          <Col numColSpan={2} className="h-full">
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
          </Col>
          <Col numColSpan={2} className="h-full">
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
          </Col>
          <QrCard />
          <Col numColSpan={4}>
            <ChartCard />
          </Col>
          <Col numColSpan={5}>
            <EmployeeTable />
          </Col>
        </Grid>
      </div>
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
  if (session?.user.role !== "is_organization") {
    router.push("/login?message=unauthorized");
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }
  return (
    <div className="flex">
      <Sidebar links={links} />
      <div className="flex-1">
        <nav className="grid items-center h-16 pr-4 shadow-md sticky top-0 w-full z-10 bg-white">
          <div className="flex gap-2 items-center justify-self-end">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
              {name?.[0]}
            </div>

            <Text className="text-lg font-medium">{name}</Text>
          </div>
        </nav>
        <div className="px-4 pt-4">{children}</div>
      </div>
    </div>
  );
}
Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default Dashboard;
