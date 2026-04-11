import api from "./client";

// GET all expenses
export const getExpenses = (limit) => {
  return api.get("/expenses", {
    params: { limit } // If limit is undefined, Axios won't even add it to the URL
  });
};

// GET expenses by year and month
export const getExpensesByYearMonth = ({ year, month }) => {
  return api.get(`/expenses/filter_by_month_year?year=${year}&month=${month}`);
};

// GET expenses stats
export const getExpenseStats = () => {
  return api.get("/expenses/stats/");
};

// ADD expense
export const addExpense = (data) => {
  return api.post("/expenses/", data);
};

// UPDATE expense
export const updateExpense = ({ id, data }) => {
  return api.put(`/expenses/${id}`, data);
};

// DELETE expense
export const deleteExpense = (id) => {
  return api.delete(`/expenses/${id}`);
};
