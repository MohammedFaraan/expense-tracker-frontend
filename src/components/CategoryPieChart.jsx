import { useMemo } from "react";
import { ResponsivePie } from "@nivo/pie";

export default function CategoryPieChart({ data }) {
  const currentYear = 2026;

  const { chartData, totalSpent } = useMemo(() => {
    const categoryMap = {};
    let total = 0;

    data?.forEach((item) => {
      const itemDate = new Date(item.date);
      if (itemDate.getFullYear() === currentYear) {
        const cat = item.category;
        if (!categoryMap[cat]) {
          categoryMap[cat] = { id: cat, label: cat, value: 0 };
        }
        categoryMap[cat].value += item.amount;
        total += item.amount;
      }
    });
    return { chartData: Object.values(categoryMap), totalSpent: total };
  }, [data]);

  const CenteredMetric = ({ centerX, centerY }) => (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontSize: "1.4rem", fontWeight: 700, fill: "#1f2937" }}
    >
      ₹{(totalSpent / 1000).toFixed(1)}k
      <tspan
        x={centerX}
        dy="1.4em"
        style={{
          fontSize: "0.6rem",
          fill: "#6b7280",
          textTransform: "uppercase",
        }}
      >
        Spent
      </tspan>
    </text>
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 w-full h-full flex flex-col">
      <h3 className="text-lg font-bold mb-2 text-gray-800">
        Category Distribution
      </h3>

      <div className="h-64 sm:h-72 relative">
        <ResponsivePie
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          innerRadius={0.75}
          padAngle={1.5}
          cornerRadius={4}
          colors={{ scheme: "nivo" }}
          enableArcLabels={false}
          enableArcLinkLabels={false}
          layers={["arcs", CenteredMetric]}
        />
      </div>

      <div className="mt-auto pt-4 space-y-2">
        {chartData.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: `hsl(${(index * 60) % 360}, 70%, 50%)`,
                }}
              />
              <span className="capitalize text-gray-600 truncate max-w-30">
                {item.id}
              </span>
            </div>
            <span className="font-bold text-gray-800">
              {((item.value / totalSpent) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
