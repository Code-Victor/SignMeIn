import React, { ReactElement } from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import { DashboardLayout } from ".";
import EmployeeInfoTable from "@/components/inc/EmployeeInfoTable";

const Workers: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="text-primary font-bold text-lg mb-8">Workers Info</h1>
      <EmployeeInfoTable />
    </>
  );
};

Workers.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Workers;
