import React, { ReactElement } from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import { DashboardLayout } from ".";

const History: NextPageWithLayout = () => {
  return <div>History</div>;
};

History.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default History;
