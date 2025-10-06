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
import { useGetCoursesAnalyticsQuery } from "@/src/redux/features/analytics/analyticsApi";
import Spinner from "@/src/components/ui/Spinner";

export const description = "A bar chart";

const CoursesAnalytics = () => {
  const { data: coursesData, isLoading } = useGetCoursesAnalyticsQuery();
  const { theme } = useTheme();

  const chartData = coursesData?.courses?.last12Months?.map((month: any) => ({
    month: month.month,
    courses: month.count,
  }));

  const chartConfig = {
    courses: {
      label: "Courses",
      color: theme === "light" ? "#1d4ed8" : "#38bdf8", // accent colors
    },
  } satisfies ChartConfig;
  return (
    <div className="overflow-hidden p-5 bg-surface dark:bg-surface-dark rounded-md border dark:border-text2-dark border-text2  ">
      <div className="flex  flex-col gap-2">
        <h1 className="text-text1 dark:text-text1-dark text-4xl font-bold">
          Courses Analytics
        </h1>
        <p className="text-text2 dark:text-text2-dark">
          Analyze your courses and their performance.
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
              title="Total Courses"
              value={coursesData?.courses?.total || 0}
              icon={BookOpen}
              color="accent"
              trend={{
                value: coursesData?.courses?.total || 0,
                isPositive: true,
              }}
            />
            <DataCard
              title="Peak Month"
              value={coursesData?.courses?.peakMonth || 0}
              icon={TrendingUp}
              color="success"
              trend={{
                value: coursesData?.courses?.peakMonth || 0,
                isPositive: true,
              }}
            />
            <DataCard
              title="Monthly Average"
              value={coursesData?.courses?.average || 0}
              icon={Users}
              color="primary"
              trend={{
                value: coursesData?.courses?.average || 0,
                isPositive: false,
              }}
            />
          </div>
          <div>
            <Card className=" mx-auto my-10 ">
              <CardHeader>
                <CardTitle className="text-2xl font-bold ">
                  Monthly Course Creation Trend
                </CardTitle>
                <CardDescription className="text-base text-text2 dark:text-text2-dark">
                  Last 12 months data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <BarChart accessibilityLayer data={chartData || []}>
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
        </>
      )}
    </div>
  );
};

export default CoursesAnalytics;
