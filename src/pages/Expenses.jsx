import { useEffect, useState } from "react";
import api from "../api/client";
import ExpenseModel from "../components/ExpenseModal";
import toast from "react-hot-toast";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchExpenses = async () => {
    try {
      const data = await api.get("/expenses");
      setExpenses(data);
    } catch (e) {
      toast.error(e.message || "Network error")
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const openModal = (expense) => {
    setIsModalOpen(true);
    setSelectedExpense(expense);
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExpense(null);
  }

  console.log(expenses);

  return (
    <div className="flex flex-col gap-10 mx-auto py-6 w-[95%]">
      <h1 className="text-2xl font-bold">All Expenses</h1>
      <div className="grid grid-cols-2 gap-40 md:gap-80 w-full">
        <select defaultValue="Pick a color" className="select w-full">
          <option disabled={true} selected>All Categories</option>
          <option>Crimson</option>
          <option>Amber</option>
          <option>Velvet</option>
        </select>
        <select defaultValue="Pick a color" className="select w-full">
          <option disabled={true} selected>Month</option>
          <option>Crimson</option>
          <option>Amber</option>
          <option>Velvet</option>
        </select>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead className="bg-base-200">
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses &&
              expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="cursor-pointer"
                  onClick={() =>
                    openModal(expense)
                  }
                >
                  <th>{expense.date}</th>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td>₹{expense.amount}</td>
                </tr>
              ))}
            {/* row 1 */}
          </tbody>
        </table>
      </div>
      <ExpenseModel isOpen={isModalOpen} onClose={closeModal} expense={selectedExpense} setExpense={setSelectedExpense} fetchExpenses={fetchExpenses}/>
    </div>
  );
}

export default Expenses;
