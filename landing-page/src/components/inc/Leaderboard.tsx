import React from "react";
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
  Icon,
  Flex,
} from "@tremor/react";
import { Medal } from "../icons";

const data = [
  {
    name: "Viola Amherd",
    Role: "Federal Councillor",
    email: "oluwaborihamzat@gmail.com",
  },
  {
    name: "Simonetta Sommaruga",
    Role: "Federal Councillor",
    email: "oluwaborihamzat@gmail.com",
  },
  {
    name: "Alain Berset",
    Role: "Federal Councillor",
    email: "oluwaborihamzat@gmail.com",
  },
  {
    name: "Ignazio Cassis",
    Role: "Federal Councillor",
    email: "oluwaborihamzat@gmail.com",
  },
  {
    name: "Ueli Maurer",
    Role: "Federal Councillor",
    email: "oluwaborihamzat@gmail.com",
  },
  {
    name: "Guy Parmelin",
    Role: "Federal Councillor",
    email: "oluwaborihamzat@gmail.com",
  },
  {
    name: "Karin Keller-Sutter",
    Role: "Federal Councillor",
    email: "oluwaborihamzat@gmail.com",
  },
];
function Leaderboard() {
  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow className="text-center">
            <TableHeaderCell>Position</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell className="hidden md:table-cell">
              Role
            </TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => {
            const lead = index < 3;
            const medal = ["#FEDE2A", "#BBCBD2", "#F6B981"];
            return (
              <TableRow key={item.name}>
                <TableCell className="flex justify-center">
                  {lead ? <Medal fill={medal[index]} /> : index + 1}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 ">
                    <Text>{item.name}</Text>
                    <Text className="md:hidden text-sm">{item.Role}</Text>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Text>{item.Role}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.email}</Text>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}

export default Leaderboard;
