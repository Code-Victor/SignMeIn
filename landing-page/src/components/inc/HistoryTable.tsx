import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
  Flex,
} from "@tremor/react";
import { Button } from "../base";
import Link from "next/link";
import { convertTime } from "@/utils";

const Clock = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

const data = [
  {
    day: "Monday, 29 2023.",
    Role: "Federal Councillor",
    timeIn: "8:00AM",
    timeOut: "5:04PM",
    status: "active",
  },
  {
    day: "Monday, 29 2023.",
    Role: "Federal Councillor",

    timeIn: "7:54AM",
    timeOut: "5:20PM",
    status: "active",
  },
  {
    day: "Monday, 29 2023.",
    Role: "Federal Councillor",
    timeIn: "8:05AM",
    timeOut: "5:10PM",
    status: "active",
  },
  {
    day: "Monday, 29 2023.",
    Role: "Federal Councillor",
    timeIn: "8:00AM",
    timeOut: "5:28PM",
    status: "active",
  },
  {
    day: "Monday, 29 2023.",
    Role: "Federal Councillor",
    timeIn: "9:00AM",
    timeOut: "4:04PM",
    status: "active",
  },
  {
    day: "Monday, 29 2023.",
    Role: "Federal Councillor",
    timeIn: "8:00AM",
    timeOut: "5:04PM",
    status: "active",
  },
  {
    day: "Monday, 29 2023.",
    Role: "Federal Councillor",
    timeIn: "8:00AM",
    timeOut: "5:04PM",
    status: "active",
  },
];

const HistoryTable = ({
  full = false,
  data,
}: {
  full?: boolean;
  data?: { date: string; clock_in: string; clock_out: string }[];
}) => (
  <Card>
    {!full && (
      <Flex justifyContent="between" alignItems="center" className="mb-5">
        <Title>Time Records</Title>
        <Link href="/app/workers/history">
          <Button>view all</Button>
        </Link>
      </Flex>
    )}
    <div className="flex flex-col gap-2 md:hidden">
      {data
        ?.slice()
        .reverse()
        .slice(0, full ? data.length : 5)
        .map((item, i) => {
          const timeIn = item.clock_in.replace("AM", "").split(":");
          const timeInHour = parseInt(timeIn[0]);
          const timeInMin = parseInt(timeIn[1]);
          const timeInTime = timeInHour * 60 + timeInMin;
          const isLate = timeInTime > 480;
          return (
            <Card key={i} className="flex flex-col gap">
              <div className="flex justify-between">
                <p>{item.date}</p>
                <Badge color={isLate ? "red" : "green"} icon={Clock}>
                  {isLate ? "late" : "on time"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <p className="text-primary">Check in time</p>
                <p className="text-primary">Check out time</p>
              </div>
              <div className="flex justify-between">
                <p>{convertTime(item.clock_in)}</p>
                <p>{convertTime(item.clock_out)}</p>
              </div>
            </Card>
          );
        })}
    </div>
    <Table className="hidden md:block">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell>Time In</TableHeaderCell>
          <TableHeaderCell>Time Out</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data
          ?.slice()
          .reverse()
          .slice(0, full ? data.length : 5)
          .map((item, i) => {
            const timeIn = item.clock_in.replace("AM", "").split(":");
            const timeInHour = parseInt(timeIn[0]);
            const timeInMin = parseInt(timeIn[1]);
            const timeInTime = timeInHour * 60 + timeInMin;
            const isLate = timeInTime > 480;
            return (
              <TableRow key={i}>
                <TableCell>{item.date}</TableCell>

                <TableCell>
                  <Text>{convertTime(item.clock_in)}</Text>
                </TableCell>
                <TableCell>
                  <Text>{convertTime(item.clock_out)}</Text>
                </TableCell>
                <TableCell>
                  <Badge color={isLate ? "red" : "green"} icon={Clock}>
                    {isLate ? "late" : "on time"}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  </Card>
);
export default HistoryTable;
