import { useState } from "react";
import ExpenseModel from "../components/ExpenseModal";
import { useExpenses } from "../hooks/useExpenses";
import { useNavigate } from "react-router-dom";
import { EXPENSE_CATEGORIES } from "../config/expenseCategories";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getExpensesByYearMonth } from "../api/expenseApi";

function Expenses() {
  const { allExpenses, isAllLoading, updateExpense, deleteExpense } =
    useExpenses();
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState({ year: null, month: null });
  const navigate = useNavigate();

  const { data: filteredExpenses, isLoading: isFilteredLoading } = useQuery({
    queryKey: ["filtered_expenses", dateFilter.year, dateFilter.month],
    queryFn: () => getExpensesByYearMonth(dateFilter),
    enabled: !!dateFilter.year && !!dateFilter.month,
  });

  const displayExpenses =
    !!dateFilter.year && !!dateFilter.month
      ? (filteredExpenses ?? []) // If filtering, use results or empty array
      : (allExpenses ?? []); // Otherwise, use all expenses or empty array

  const getCategory = (categoryId) =>
    EXPENSE_CATEGORIES.filter((c) => c.id == categoryId)[0];

  const openModal = (expense) => {
    setIsModalOpen(true);
    setSelectedExpense(expense);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExpense(null);
  };

  const handleYearMonthSelect = (e) => {
    console.log(e.target.value);
    const val = e.target.value;
    if (val) {
      const [year, month] = val.split("-");
      setDateFilter({ year: parseInt(year), month: parseInt(month) });
    }
  };

  if (isAllLoading || isFilteredLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-infinity text-info w-24"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 mx-auto py-6 w-[95%]">
      <h1 className="text-2xl font-bold">All Expenses</h1>
      <div className="flex flex-wrap items-center justify-between bg-base-200/50 p-3 rounded-box shadow-sm w-full gap-4">
        <div className="flex flex-row gap-2">
          <input
            type="month"
            onChange={handleYearMonthSelect}
            className="input"
          />
          <select defaultValue="all" className="select w-fit">
            <option value="all">All categories</option>

            {EXPENSE_CATEGORIES &&
              EXPENSE_CATEGORIES.map((category, index) => (
                <option value={category.id} key={index}>
                  {category.label}
                </option>
              ))}
          </select>
        </div>
        <button
          className="btn btn-secondary btn-md"
          onClick={() => navigate("/expenses/create")}
        >
          <FaPlus />
          New Expense
        </button>
      </div>
      <div className="overflow-x-auto rounded-box bg-base-100 shadow-sm">
        <table className="table whitespace-nowrap">
          {/* head */}
          <thead className="bg-base-200/50">
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayExpenses && displayExpenses.length != 0 ? (
              displayExpenses.map((expense) => {
                const category = getCategory(expense.category);
                return (
                  <tr key={expense.id}>
                    <th>{expense.date}</th>
                    <td>{expense.description}</td>
                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium text-white ${category?.color}`}
                      >
                        {category?.label}
                      </span>
                    </td>
                    <td>₹{expense.amount}</td>
                    <td className="w-px">
                      <button
                        onClick={() => openModal(expense)}
                        className="btn btn-secondary btn-sm"
                      >
                        <MdOutlineRemoveRedEye />
                        View
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="py-4 text-center">
                <td>No expenses yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ExpenseModel
        isOpen={isModalOpen}
        onClose={closeModal}
        expense={selectedExpense}
        setExpense={setSelectedExpense}
        updateExpense={updateExpense}
        deleteExpense={deleteExpense}
      />
    </div>
  );
}

export default Expenses;
