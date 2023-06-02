import React, { ReactElement } from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import { DashboardLayout } from ".";

const Workers: NextPageWithLayout = () => {
  return <div>Workers</div>;
};

Workers.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Workers;
