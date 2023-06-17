import { clockIn, clockOut } from "@/api";
import { Card } from "@tremor/react";
import { on } from "events";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import { useMutation, useQueryClient } from "react-query";
import { set } from "zod";
import { Button } from "../base";

function Scanner({
  open,
  onChange,
  type,
}: {
  open: boolean;
  onChange: (open: boolean) => void;
  type: "clock_in" | "clock_out";
}) {
  const [qrcode, setQrcode] = React.useState<string>("");
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  function onSuccess() {
    queryClient.invalidateQueries("workerAttendanceHistory");
  }
  const clockInMutation = useMutation(clockIn, {
    onSuccess,
  });
  const clockOutMutation = useMutation(clockOut, {
    onSuccess,
  });
  const [changeCam, setChangeCam] = useState(false);
  useEffect(() => {
    if (!qrcode) return;
    if (type === "clock_in") {
      clockInMutation.mutate({
        qrcode_id: qrcode,
        access: session?.user?.access as string,
      });
      console.log(qrcode);
      onChange(false);
      setQrcode("");
    }
    if (type === "clock_out") {
      clockOutMutation.mutate({
        qrcode_id: qrcode,
        access: session?.user?.access as string,
      });
      console.log(qrcode);
      onChange(false);
      setQrcode("");
    }
  }, [qrcode]);
  if (!open) return null;
  return (
    <div
      className="fixed isolate z-10 inset-0 bg-black/20 grid place-items-center px-4"
      onClick={() => onChange(false)}
    >
      <Card
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl [&>*]:w-[90%] grid place-items-center"
      >
        <QrReader
          scanDelay={10}
          constraints={{
            facingMode: { exact: !changeCam ? "user" : "environment" },
          }}
          onResult={(result, error) => {
            if (result) {
              setQrcode(result.getText());
            }
            if (error) {
              console.info(error);
            }
          }}
        />
        <Button onClick={() => setChangeCam(!changeCam)}>Change Camera</Button>
      </Card>
    </div>
  );
}

export default Scanner;
