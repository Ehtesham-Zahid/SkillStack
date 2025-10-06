"use client";
import { BookOpen, TrendingUp, Users } from "lucide-react";
import { useTheme } from "next-themes";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
import { useGetOrdersAnalyticsQuery } from "@/src/redux/features/analytics/analyticsApi";
import Spinner from "@/src/components/ui/Spinner";

export const description = "A line chart";

const OrdersAnalytics = () => {
  const { data: ordersData, isLoading } = useGetOrdersAnalyticsQuery();
  const { theme } = useTheme();

  const chartData = ordersData?.orders?.last12Months?.map((month: any) => ({
    month: month.month,
    orders: month.count,
  }));

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
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner fullPage={false} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <DataCard
              title="Total Orders"
              value={ordersData?.orders?.total || 0}
              icon={BookOpen}
              color="accent"
              trend={{
                value: ordersData?.orders?.total || 0,
                isPositive: true,
              }}
            />
            <DataCard
              title="Peak Month"
              value={ordersData?.orders?.peakMonth || 0}
              icon={TrendingUp}
              color="success"
              trend={{
                value: ordersData?.orders?.peakMonth || 0,
                isPositive: true,
              }}
            />
            <DataCard
              title="Monthly Average"
              value={ordersData?.orders?.average || 0}
              icon={Users}
              color="primary"
              trend={{
                value: ordersData?.orders?.average || 0,
                isPositive: false,
              }}
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
                  <LineChart
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
        </>
      )}
    </div>
  );
};

export default OrdersAnalytics;
