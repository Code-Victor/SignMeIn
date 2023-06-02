import React, { ReactElement } from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import { DashboardLayout } from ".";
import EmployeeTable from "@/components/inc/EmployeeTable";

const History: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="text-primary font-bold text-lg mb-8">History</h1>
      <EmployeeTable full />
    </>
  );
};

History.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default History;
