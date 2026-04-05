import api from "./client";

// GET all expenses
export const getExpenses = () => {
    return api.get("/expenses");
};

// ADD expense
export const addExpense = (data) => {
    return api.post("/expenses/", data);
};

// UPDATE expense
export const updateExpense = ({id, data}) => {
    return api.put(`/expenses/${id}`, data);
};

// DELETE expense
export const deleteExpense = (id) => {
    return api.delete(`/expenses/${id}`);
};