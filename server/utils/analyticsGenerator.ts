import { Document, Model } from "mongoose";

interface MonthData {
  month: string;
  count: number;
}

interface MonthlyStats {
  last12Months: MonthData[];
  total: number;
  average: number;
  peakMonth: number; // highest monthly count
}

export async function generateLast12MonthsData<T extends Document>(
  model: Model<T>
): Promise<MonthlyStats> {
  const last12Months: MonthData[] = [];
  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const startDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

    const monthYear = startDate.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    const count = await model.countDocuments({
      createdAt: { $gte: startDate, $lt: endDate },
    });

    last12Months.push({ month: monthYear, count });
  }

  const total = last12Months.reduce((sum, m) => sum + m.count, 0);
  const average = last12Months.length ? total / last12Months.length : 0;
  const peakMonth = Math.max(...last12Months.map((m) => m.count));

  return {
    last12Months,
    total,
    average: parseFloat(average.toFixed(2)),
    peakMonth,
  };
}
