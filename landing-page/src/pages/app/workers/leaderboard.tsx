import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement } from "react";
import { DashboardLayout } from ".";
import Leaderboard from "@/components/inc/Leaderboard";

const LeaderboardPage: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="text-primary font-bold text-lg mb-8">Workers Info</h1>
      <Leaderboard />
    </>
  );
};
LeaderboardPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default LeaderboardPage;
