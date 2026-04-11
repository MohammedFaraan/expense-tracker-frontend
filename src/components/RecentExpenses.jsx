import { MdOutlineRemoveRedEye } from "react-icons/md";
import { EXPENSE_CATEGORIES } from "../config/expenseCategories";
import { useExpenses } from "../hooks/useExpenses";
import { useNavigate } from "react-router-dom";

export default function RecentExpenses() {
  const { expenses } = useExpenses(5);

  const navigate = useNavigate();

  const getCategory = (categoryId) =>
    EXPENSE_CATEGORIES.filter((c) => c.id == categoryId)[0];

  return (
    <div className="overflow-x-auto p-4 rounded-box bg-base-100 shadow-sm">
      <h3 className="text-lg font-bold mb-4 text-gray-800 text-left ">
        Recent Expenses
      </h3>
      <table className="table whitespace-nowrap">
        {/* head */}
        <thead className="bg-base-200/50">
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
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
                      className={`rounded-full px-3 py-1 text-xs font-medium text-white ${category?.color}`}
                    >
                      {category?.label}
                    </span>
                  </td>
                  <td>₹{expense.amount}</td>
                  
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
      <div className="text-center mt-4"><button className="btn btn-secondary" onClick={() => navigate("/expenses")}>View More</button></div>
    </div>
  );
}
