"use client";
import { useTheme } from "next-themes";

import { Card, CardContent, CardHeader, CardTitle } from "@/src/shadcn/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/shadcn/ui/chart";

import {
  Area,
  AreaChart,
  BarChart,
  CartesianGrid,
  Line,
  XAxis,
  LineChart,
} from "recharts";
import { Bar } from "recharts";
import {
  useGetCoursesAnalyticsQuery,
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/src/redux/features/analytics/analyticsApi";
import { ChartConfig } from "@/src/shadcn/ui/chart";
import DataCard from "../common/DataCard";
import { BookOpen } from "lucide-react";
import { TrendingUp } from "lucide-react";
import Spinner from "@/src/components/ui/Spinner";

export const description = "A bar chart";

const AdminDashboardMain = () => {
  const { theme } = useTheme();

  // --------USERS---------
  const { data: usersData, isLoading: usersLoading } =
    useGetUsersAnalyticsQuery();
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery();
  const { data: coursesData, isLoading: coursesLoading } =
    useGetCoursesAnalyticsQuery();
  console.log(usersData, ordersData, coursesData);

  const chartDataUsers = usersData?.users?.last12Months?.map((month: any) => ({
    month: month.month,
    users: month.count,
  }));

  const chartDataOrders = ordersData?.orders?.last12Months?.map(
    (month: any) => ({
      month: month.month,
      orders: month.count,
    })
  );

  const chartDataCourses = coursesData?.courses?.last12Months?.map(
    (month: any) => ({
      month: month.month,
      courses: month.count,
    })
  );

  const chartConfig = {
    orders: {
      label: "Orders",
      color: theme === "light" ? "#1d4ed8" : "#38bdf8", // accent colors
    },
    users: {
      label: "Users",
      color: theme === "light" ? "#1d4ed8" : "#38bdf8", // accent colors
    },
    courses: {
      label: "Courses",
      color: theme === "light" ? "#1d4ed8" : "#38bdf8", // accent colors
    },
  } satisfies ChartConfig;

  return (
    <div className="overflow-hidden p-5 bg-surface dark:bg-surface-dark rounded-md border dark:border-text2-dark border-text2  ">
      <div className="flex  flex-col gap-2">
        <h1 className="text-text1 dark:text-text1-dark text-4xl font-bold">
          Admin Dashboard
        </h1>
        <p className="text-text2 dark:text-text2-dark">
          Analyze your admin dashboard and their performance.
        </p>
      </div>
      {ordersLoading || usersLoading || coursesLoading ? (
        <div className="flex justify-center items-center h-full my-20">
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
              title="Total Orders"
              value={ordersData?.orders?.total || 0}
              icon={TrendingUp}
              color="success"
              trend={{
                value: ordersData?.orders?.total || 0,
                isPositive: true,
              }}
            />
            <DataCard
              title="Total Courses"
              value={coursesData?.courses?.total || 0}
              icon={BookOpen}
              color="accent"
              trend={{
                value: coursesData?.courses?.total || 0,
                isPositive: true,
              }}
            />
          </div>{" "}
          <div className="my-6">
            <div>
              <Card className=" mx-auto  ">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold ">
                    Orders Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <LineChart
                      accessibilityLayer
                      data={chartDataOrders}
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
                      <Line
                        dataKey="orders"
                        type="natural"
                        stroke={chartConfig.orders.color}
                        strokeWidth={2}
                        dot={{
                          fill: chartConfig.orders.color,
                        }}
                        activeDot={{
                          r: 6,
                        }}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div>
              <Card className=" mx-auto ">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold ">
                    Users Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <AreaChart
                      accessibilityLayer
                      data={chartDataUsers}
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

            <div>
              <Card className=" mx-auto ">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold ">
                    Courses Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartDataCourses || []}>
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
                        dataKey="courses"
                        fill={chartConfig.courses.color}
                        radius={8}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboardMain;
