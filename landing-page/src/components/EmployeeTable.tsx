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
import Button from "./Button";

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
    name: "Viola Amherd",
    Role: "Federal Councillor",
    timeIn: "8:00AM",
    timeOut: "5:04PM",
    status: "active",
  },
  {
    name: "Simonetta Sommaruga",
    Role: "Federal Councillor",

    timeIn: "7:54AM",
    timeOut: "5:20PM",
    status: "active",
  },
  {
    name: "Alain Berset",
    Role: "Federal Councillor",
    timeIn: "8:05AM",
    timeOut: "5:10PM",
    status: "active",
  },
  {
    name: "Ignazio Cassis",
    Role: "Federal Councillor",
    timeIn: "8:00AM",
    timeOut: "5:28PM",
    status: "active",
  },
  {
    name: "Ueli Maurer",
    Role: "Federal Councillor",
    timeIn: "9:00AM",
    timeOut: "4:04PM",
    status: "active",
  },
  {
    name: "Guy Parmelin",
    Role: "Federal Councillor",
    timeIn: "8:00AM",
    timeOut: "5:04PM",
    status: "active",
  },
  {
    name: "Karin Keller-Sutter",
    Role: "Federal Councillor",
    timeIn: "8:00AM",
    timeOut: "5:04PM",
    status: "active",
  },
];

const EmployeeTable = () => (
  <Card>
    <Flex justifyContent="between" alignItems="center">
      <Title>Time Records</Title>
      <Button>view all</Button>
    </Flex>
    <Table className="mt-5">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
          <TableHeaderCell>Time In</TableHeaderCell>
          <TableHeaderCell>Time Out</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => {
          const timeIn = item.timeIn.replace("AM", "").split(":");
          const timeInHour = parseInt(timeIn[0]);
          const timeInMin = parseInt(timeIn[1]);
          const timeInTime = timeInHour * 60 + timeInMin;
          const isLate = timeInTime > 480;
          return (
            <TableRow key={item.name}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Text>{item.Role}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.timeIn}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.timeOut}</Text>
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
export default EmployeeTable;
