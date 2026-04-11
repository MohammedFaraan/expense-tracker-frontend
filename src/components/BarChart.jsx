import React, { useMemo } from "react";
import { ResponsiveBar } from "@nivo/bar";

export default function BarChart({ data }) {
  const chartData = useMemo(() => {
    const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyTotals = monthLabels.map((month) => ({ month, totalAmount: 0 }));

    if (!data) return monthlyTotals;

    data.forEach((item) => {
      const date = new Date(item.date);
      if (date.getFullYear() === 2026) {
        const monthIndex = date.getMonth();
        monthlyTotals[monthIndex].totalAmount += item.amount;
      }
    });
    return monthlyTotals;
  }, [data]);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-full h-full">
      <h3 className="text-lg font-bold mb-4 text-gray-800 text-left">Monthly Expenses</h3>

      <div className="h-87.5 sm:h-100 w-full ">
        <ResponsiveBar
          data={chartData}
          keys={["totalAmount"]}
          indexBy="month"
          margin={{ top: 20, right: 10, bottom: 50, left: 40 }}
          padding={0.4}
          valueScale={{ type: "linear" }}
          colors={["#6366f1"]}
          borderRadius={8}
          labelSkipHeight={12}
          labelTextColor="#ffffff"
          enableGridY={true}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            legend: "Month",
            legendPosition: "middle",
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            format: (v) => `₹${v >= 1000 ? `${v / 1000}k` : v}`, 
          }}
          animate={true}
          motionConfig="gentle"
        />
      </div>
    </div>
  );
}
