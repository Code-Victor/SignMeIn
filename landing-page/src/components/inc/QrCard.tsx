import { Card } from "@tremor/react";
import Button from "@/components/base/Button";
import Image from "next/image";
import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "react-query";
import { getQrCode } from "@/api";
import { Ring } from "@uiball/loaders";

function QrCard() {
  const { data: session } = useSession();
  const {
    data: qrCode,
    isLoading,
    error,
    refetch,
  } = useQuery(
    "QrCode",
    () =>
      getQrCode(session?.user?.access as string, session?.user?.id as number),
    {
      refetchOnWindowFocus: false,
    }
  );
  if (isLoading)
    return (
      <Card className="flex flex-col row-span-2 h-full p-2 items-center justify-center">
        <Ring size={50} color="#663ed6" />
      </Card>
    );
  if (error) return <div>Error</div>;
  return (
    <Card className="flex flex-col row-span-2 h-full p-2">
      <QRCodeSVG value={qrCode?.UUID!} width="100%" />
      <div className="mt-8 flex flex-col gap-2">
        <Button onClick={() => refetch()}>Generate New Qr-code</Button>
        <Button outline>Print Qr-code</Button>
      </div>
    </Card>
  );
}

export default QrCard;
