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
import { GetWorkersResponse } from "@/api/types";

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
function EmployeeInfoTable({ data }: { data?: GetWorkersResponse }) {
  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>id</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>gender</TableHeaderCell>
            <TableHeaderCell>age</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.organization_workers.map((item, index) => {
            return (
              <TableRow key={item.first_name}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{`${item.first_name} ${item.last_name}`}</TableCell>
                <TableCell>
                  <Text>{item.gender}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.age}</Text>
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
