import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement } from "react";
import { DashboardLayout } from ".";
import EmployeeTable from "@/components/inc/EmployeeTable";

const History: NextPageWithLayout = () => {
  return (
    <div>
      <h1 className="text-primary font-bold text-lg mb-8">History</h1>
      <EmployeeTable full />
    </div>
  );
};
History.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default History;
