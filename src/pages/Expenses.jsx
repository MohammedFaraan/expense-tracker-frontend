import { useEffect, useState } from "react";
import api from "../api/client";
import ExpenseModel from "../components/ExpenseModal";
import toast from "react-hot-toast";
import { useExpenses } from "../hooks/useExpenses";

function Expenses() {
  const { expenses, isLoading, updateExpense, deleteExpense } = useExpenses();
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      {/* <div className="grid grid-cols-2 gap-40 md:gap-80 w-full">
        <div>
          <select defaultValue="Pick a color" className="select w-full">
            <option disabled={true} selected>
              Past Month
            </option>
            <option value="">Crimson</option>
            <option value="">Amber</option>
            <option value="">Velvet</option>
          </select>
          <select className="select w-full">
            <option disabled={true} selected>
              All categories
            </option>
            <option value="">Crimson</option>
            <option value="">Amber</option>
            <option value="">Velvet</option>
          </select>
        </div>
        <button className="btn btn-secondary">New Expense</button>
      </div> */}
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-xl">
        <table className="table">
          {/* head */}
          <thead className="bg-base-200/70">
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses &&
              expenses.map((expense) => (
                <tr key={expense.id}>
                  <th>{expense.date}</th>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
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
              ))}
          </tbody>
        </table>
      </div>
      <ExpenseModel
        isOpen={isModalOpen}
        onClose={closeModal}
        expense={selectedExpense}
        setExpense={setSelectedExpense}
        updateExpense={updateExpense}
      />
    </div>
  );
}

export default Expenses;
