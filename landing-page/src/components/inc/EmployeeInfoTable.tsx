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
import { Button } from "../base";
import Link from "next/link";
import { MoreIcon } from "../icons";

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
function EmployeeInfoTable() {
  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Position</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Avg Check-in</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => {
            return (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Text>{item.Role}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.email}</Text>
                </TableCell>
                <TableCell>
                  <button>
                    <Icon
                      icon={MoreIcon}
                      variant="solid"
                      tooltip="Edit user data"
                    />
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}

export default EmployeeInfoTable;
