import { clockIn, clockOut } from "@/api";
import { Card } from "@tremor/react";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { useMutation } from "react-query";
import { set } from "zod";

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
  const { data: session } = useSession();
  const clockInMutation = useMutation(clockIn);
  const clockOutMutation = useMutation(clockOut);

  useEffect(() => {
    if (!qrcode) return;
    if (type === "clock_in") {
      clockInMutation.mutate({
        qrcode_id: qrcode,
        access: session?.user?.access as string,
      });
    }
    if (type === "clock_out") {
      clockOutMutation.mutate({
        qrcode_id: qrcode,
        access: session?.user?.access as string,
      });
    }
  }, [qrcode]);
  if (!open) return null;
  return (
    <div
      className="fixed isolate z-10 inset-0 bg-black/20 grid place-items-center px-4"
      onClick={() => onChange(false)}
    >
      <Card
        onClick={(e) => e.preventDefault()}
        className="max-w-2xl [&>*]:w-[90%] grid place-items-center"
      >
        <QrReader
          constraints={{}}
          onResult={(result, error) => {
            if (result) {
              setQrcode(result.getText());
            }
            if (error) {
              console.info(error);
            }
          }}
        />
      </Card>
    </div>
  );
}

export default Scanner;
