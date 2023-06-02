import React, { ReactElement } from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import { DashboardLayout } from ".";

const Leaderboard: NextPageWithLayout = () => {
  return <div>Leaderboard</div>;
};

Leaderboard.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Leaderboard;
