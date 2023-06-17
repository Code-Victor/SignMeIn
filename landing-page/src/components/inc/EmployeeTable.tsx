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
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import { getAttendanceRecord } from "@/api";
import { Ring } from "@uiball/loaders";
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

const EmployeeTable = ({ full = false }: { full?: boolean }) => {
  const { data: session } = useSession();
  const { data, isLoading, error } = useQuery(
    "AttendanceRecord",
    () => getAttendanceRecord(session?.user.access as string),
    {
      refetchInterval: 60000, //refetches every 60 seconds
    }
  );

  if (isLoading)
    return (
      <Card className="flex h-72 p-2 items-center justify-center">
        <Ring size={50} color="#663ed6" />
      </Card>
    );
  if (error) return <div>Error</div>;
  return (
    <Card>
      {!full && (
        <Flex justifyContent="between" alignItems="center" className="mb-5">
          <Title>Time Records</Title>
          <Link href="/app/organizations/history">
            <Button>view all</Button>
          </Link>
        </Flex>
      )}
      <div className="flex flex-col gap-2 md:hidden">
        {data
          ?.slice()
          .reverse()
          .slice(0, full ? data.length : 5)
          .map((item) => {
            const timeIn = item.clock_in.replace("AM", "").split(":");
            const timeInHour = parseInt(timeIn[0]);
            const timeInMin = parseInt(timeIn[1]);
            const timeInTime = timeInHour * 60 + timeInMin;
            const isLate = timeInTime > 480;
            return (
              <Card key={item.name} className="flex flex-col gap">
                <div className="flex justify-between">
                  <p>{item.name}</p>
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
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>

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
            .map((item) => {
              const timeIn = item.clock_in.replace("AM", "").split(":");
              const timeInHour = parseInt(timeIn[0]);
              const timeInMin = parseInt(timeIn[1]);
              const timeInTime = timeInHour * 60 + timeInMin;
              const isLate = timeInTime > 480;
              return (
                <TableRow key={item.name}>
                  <TableCell>{item.name}</TableCell>

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
};
export default EmployeeTable;
