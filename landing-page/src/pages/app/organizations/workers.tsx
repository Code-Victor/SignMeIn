import React, { ReactElement } from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import { DashboardLayout } from ".";
import EmployeeInfoTable from "@/components/inc/EmployeeInfoTable";
import { Button } from "@/components/base";
import { AddWorkerForm } from "@/components/inc";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "react-query";
import { getWorkers } from "@/api/";
import { Ring } from "@uiball/loaders";

const Workers: NextPageWithLayout = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const {
    data: info,
    isLoading,
    error,
  } = useQuery("employeeInfo", () =>
    getWorkers({ access: session?.user?.access! })
  );
  if (isLoading)
    return (
      <div className="min-h-screen min-w-screen grid place-items-center">
        <Ring size={50} color="#663ed6" />
      </div>
    );
  if (error) return <div>Error</div>;
  return (
    <>
      <div className="flex justify-between items-center py-2">
        <h1 className="text-primary font-bold text-lg mb-8">Workers Info</h1>
        <Button size="sm" onClick={() => setOpenModal((open) => !open)}>
          add workers
        </Button>
      </div>
      <EmployeeInfoTable data={info} />
      <AddWorkerForm
        open={openModal}
        onSuccess={() => {
          setOpenModal(false);
          queryClient.invalidateQueries("employeeInfo");
        }}
      />
    </>
  );
};

Workers.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Workers;
