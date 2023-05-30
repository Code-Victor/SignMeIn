import { Card } from "@tremor/react";
import Button from "@/components/Button";
import Image from "next/image";
import React from "react";
import { QRCodeSVG } from "qrcode.react";

function QrCard() {
  const [randomValue, setRandomValue] = React.useState("0");
  return (
    <Card className="flex flex-col row-span-2 h-full p-2">
      <QRCodeSVG  value={randomValue} width="100%" />
      <div className="mt-8 flex flex-col gap-2">
        <Button onClick={() => setRandomValue(crypto.randomUUID())}>
          Generate New Qr-code
        </Button>
        <Button outline>Print Qr-code</Button>
      </div>
    </Card>
  );
}

export default QrCard;
