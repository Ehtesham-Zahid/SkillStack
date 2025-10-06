"use client";
import { BookOpen, TrendingUp, Users } from "lucide-react";
import { useTheme } from "next-themes";

import { CartesianGrid, XAxis, Area, AreaChart } from "recharts";

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
import { useGetUsersAnalyticsQuery } from "@/src/redux/features/analytics/analyticsApi";
import Spinner from "@/src/components/ui/Spinner";

export const description = "A line chart";

const UsersAnalytics = () => {
  const { data: usersData, isLoading } = useGetUsersAnalyticsQuery();
  const { theme } = useTheme();
  console.log(usersData);

  const chartData = usersData?.users?.last12Months?.map((month: any) => ({
    month: month.month,
    users: month.count,
  }));

  const chartConfig = {
    users: {
      label: "Users",
      color: theme === "light" ? "#1d4ed8" : "#38bdf8", // accent colors
    },
  } satisfies ChartConfig;
  return (
    <div className="overflow-hidden p-5 bg-surface dark:bg-surface-dark rounded-md border dark:border-text2-dark border-text2  ">
      <div className="flex  flex-col gap-2">
        <h1 className="text-text1 dark:text-text1-dark text-4xl font-bold">
          Users Analytics
        </h1>
        <p className="text-text2 dark:text-text2-dark">
          Analyze your users and their performance.
        </p>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner fullPage={false} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <DataCard
              title="Total Users"
              value={usersData?.users?.total || 0}
              icon={BookOpen}
              color="accent"
              trend={{ value: usersData?.users?.total || 0, isPositive: true }}
            />
            <DataCard
              title="Peak Month"
              value={usersData?.users?.peakMonth || 0}
              icon={TrendingUp}
              color="success"
              trend={{
                value: usersData?.users?.peakMonth || 0,
                isPositive: true,
              }}
            />
            <DataCard
              title="Monthly Average"
              value={usersData?.users?.average || 0}
              icon={Users}
              color="primary"
              trend={{
                value: usersData?.users?.average || 0,
                isPositive: false,
              }}
            />
          </div>
          <div>
            <Card className=" mx-auto my-10 ">
              <CardHeader>
                <CardTitle className="text-2xl font-bold ">
                  Monthly User Creation Trend
                </CardTitle>
                <CardDescription className="text-base text-text2 dark:text-text2-dark">
                  Last 12 months data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <AreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
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
                    <Area
                      dataKey="users"
                      type="natural"
                      fill={chartConfig.users.color}
                      fillOpacity={0.4}
                      stroke={chartConfig.users.color}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersAnalytics;
