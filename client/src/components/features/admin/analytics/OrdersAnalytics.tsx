"use client";
import { BookOpen, TrendingUp, Users } from "lucide-react";
import { useTheme } from "next-themes";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shadcn/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/shadcn/ui/chart";
import DataCard from "../common/DataCard";

export const description = "A bar chart";

const OrdersAnalytics = () => {
  const { theme } = useTheme();

  const chartData = [
    { month: "January", orders: 186 },
    { month: "February", orders: 305 },
    { month: "March", orders: 100 },
    { month: "April", orders: 73 },
    { month: "May", orders: 209 },
    { month: "June", orders: 214 },
    { month: "July", orders: 214 },
    { month: "August", orders: 214 },
    { month: "September", orders: 214 },
    { month: "October", orders: 214 },
    { month: "November", orders: 214 },
    { month: "December", orders: 214 },
  ];

  const chartConfig = {
    orders: {
      label: "Orders",
      color: theme === "light" ? "#1d4ed8" : "#38bdf8", // accent colors
    },
  } satisfies ChartConfig;
  return (
    <div className="overflow-hidden p-5 bg-surface dark:bg-surface-dark rounded-md border dark:border-text2-dark border-text2  ">
      <div className="flex  flex-col gap-2">
        <h1 className="text-text1 dark:text-text1-dark text-4xl font-bold">
          Orders Analytics
        </h1>
        <p className="text-text2 dark:text-text2-dark">
          Analyze your orders and their performance.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <DataCard
          title="Total Orders"
          value="4"
          icon={BookOpen}
          color="accent"
          trend={{ value: 12, isPositive: true }}
        />
        <DataCard
          title="Peak Month"
          value="3"
          icon={TrendingUp}
          color="success"
          trend={{ value: 8, isPositive: true }}
        />
        <DataCard
          title="Monthly Average"
          value="0.3"
          icon={Users}
          color="primary"
          trend={{ value: 5, isPositive: false }}
        />
      </div>
      <div>
        <Card className=" mx-auto my-10 ">
          <CardHeader>
            <CardTitle className="text-2xl font-bold ">
              Monthly Order Creation Trend
            </CardTitle>
            <CardDescription className="text-base text-text2 dark:text-text2-dark">
              Last 12 months data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value: string) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      hideLabel
                      className="bg-surface dark:bg-surface-dark text-accent-foreground dark:text-accent-dark-foreground"
                    />
                  }
                />
                <Bar
                  dataKey="orders"
                  fill={chartConfig.orders.color}
                  radius={8}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrdersAnalytics;
