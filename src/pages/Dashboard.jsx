import BarChart from "../components/BarChart";
import CategoryPieChart from "../components/CategoryPieChart";
import RecentExpenses from "../components/RecentExpenses";
import SummarySection from "../components/SummarySection";
import { useExpenses } from "../hooks/useExpenses";
import { useExpensesStats } from "../hooks/useExpensesStats";

function Dashboard() {
  const { expenses, isLoading } = useExpenses();
  const { data: expenseStats } = useExpensesStats();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-infinity text-info w-24"></span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-10 mx-auto py-6 w-[95%]">
      <h1 className="text-4xl font-bold">Dashboard</h1>

      <SummarySection expenseStats={expenseStats} />
      {expenses && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          {/* Bar Chart: Spans 2 columns on large screens */}
          <div className="lg:col-span-2">
            <BarChart data={expenses} />
          </div>

          {/* Pie Chart: Spans 1 column on large screens */}
          <div className="lg:col-span-1">
            <CategoryPieChart data={expenses} />
          </div>
        </div>
      )}
      <RecentExpenses />
    </div>
  );
}

export default Dashboard;
