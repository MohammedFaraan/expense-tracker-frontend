import { useQuery } from "@tanstack/react-query";
import { getExpenseStats } from "../api/expenseApi";

export const useExpensesStats = () => {
  return useQuery({
    queryKey: ["expense-stats"],
    queryFn: getExpenseStats,
  });
};
