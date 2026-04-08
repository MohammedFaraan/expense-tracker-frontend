import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "../api/expenseApi";

export const useExpenses = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  const addMutation = useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses", "expense-stats"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses", "expense-stats"]);
    },
  });
  const updateMutation = useMutation({
    mutationFn: updateExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses", "expense-stats"]);
    },
  });

  return {
    allExpenses: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    addExpense: addMutation.mutate,
    deleteExpense: deleteMutation.mutate,
    updateExpense: updateMutation.mutateAsync,
  };
};
