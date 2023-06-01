import * as React from "react";
import { Card, Title, AreaChart } from "@tremor/react";

const chartdata = [
  {
    date: "Mar 22",
    SignIn: 2890,
    SignOut: 2338,
  },
  {
    date: "Mar 23",
    SignIn: 2756,
    SignOut: 2103,
  },
  {
    date: "Mar 24",
    SignIn: 3322,
    SignOut: 2194,
  },
  {
    date: "Mar 25",
    SignIn: 3470,
    SignOut: 2108,
  },
  {
    date: "Mar 26",
    SignIn: 3475,
    SignOut: 1812,
  },
  {
    date: "Mar 27",
    SignIn: 3129,
    SignOut: 1726,
  },
];

const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};

const ChartCard = () => (
  <Card>
    <Title>SignIn and SignOut Times</Title>
    <AreaChart
      className="h-72 mt-4"
      data={chartdata}
      index="date"
      categories={["SignIn", "SignOut"]}
      colors={["indigo", "cyan"]}
    //   valueFormatter={dataFormatter}
    />
  </Card>
);
export default ChartCard;
