import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement } from "react";
import { DashboardLayout } from ".";
import EmployeeTable from "@/components/inc/EmployeeTable";
import HistoryTable from "@/components/inc/HistoryTable";
import { useQuery } from "react-query";
import { getWorkerAttendance } from "@/api";
import { useSession } from "next-auth/react";

const History: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const { data } = useQuery("workerAttendanceHistory", () =>
    getWorkerAttendance(session?.user.access as string)
  );
  return (
    <div>
      <h1 className="text-primary font-bold text-lg mb-8">History</h1>
      <HistoryTable data={data} full />
    </div>
  );
};
History.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default History;
