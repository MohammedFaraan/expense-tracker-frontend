import { useState } from "react";
import ExpenseModel from "../components/ExpenseModal";
import { useExpenses } from "../hooks/useExpenses";
import { useNavigate } from "react-router-dom";
import { EXPENSE_CATEGORIES } from "../config/expenseCategories";

function Expenses() {
  const { expenses, isLoading, updateExpense, deleteExpense } = useExpenses();
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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

  if (isLoading) {
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
          <select defaultValue="Pick a color" className="select w-fit">
            <option disabled={true} selected>
              Past Month
            </option>
            <option value="">Crimson</option>
            <option value="">Amber</option>
            <option value="">Velvet</option>
          </select>
          <select defaultValue="all" className="select w-fit">
            <option value="all">
              All categories
            </option>

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
          New Expense
        </button>
      </div>
      <div className="overflow-x-auto rounded-box bg-base-100 shadow-sm">
        <table className="table">
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
            {expenses && expenses.length != 0 ? (
              expenses.map((expense) => {
                const category = getCategory(expense.category);
                return (
                  <tr key={expense.id}>
                    <th>{expense.date}</th>
                    <td>{expense.description}</td>
                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium text-white ${category.color}`}
                      >
                        {category.label}
                      </span>
                    </td>
                    <td>₹{expense.amount}</td>
                    <td className="w-px whitespace-nowrap">
                      <button
                        onClick={() => openModal(expense)}
                        className="btn btn-secondary btn-sm"
                      >
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
