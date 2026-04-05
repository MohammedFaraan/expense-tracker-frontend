import { useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { useExpenses } from "../hooks/useExpenses";

export default function ExpenseModel({
  expense,
  setExpense,
  updateExpense,
  deleteExpense,
  isOpen,
  onClose,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClose = () => {
    setIsEditing(false);
    onClose?.();
  };

  const handleEditSave = async () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      handleExpenseUpdate();
    }
  };

  const handleExpenseUpdate = async () => {
    try {
      const data = {
        amount: expense.amount,
        description: expense.description,
        category: expense.category,
        date: expense.date,
      };
      const res = await updateExpense({ id: expense?.id, data });
      setExpense(res);
      toast.success("Expense updated!");
      setIsEditing(false);
    } catch (e) {
      toast.error("Update failed! " + e.message || "Network Error");
      console.error("Update Failed: ", e.message || "Network Error");
    }
  };

  const handleExpenseDelete = () => {
    try {
      deleteExpense(expense?.id);
      onClose?.();
      setExpense(null);
      toast.success("Expense Deleted!");
      navigate("/expenses");
    } catch (e) {
      toast.error("Delete failed! " + e.message || "Network Error");
      console.error("Delte Failed: ", e.message || "Network Error");
    }
  };

  return (
    <dialog open onClose={handleClose} className="modal">
      <div className="modal-box max-w-[60%]">
        <div className="modal-header space-y-1">
          <h3 className="font-bold text-xl">Expense Details</h3>
          <p>
            <span>{expense?.date} · </span>
            <span>{expense?.category}</span>
          </p>
          <button
            className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleClose}
          >
            ✕
          </button>
        </div>

        <form className="py-4 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-base-content/70">
              Description
            </label>
            <textarea
              rows={2}
              className={`textarea textarea-bordered w-full ${isEditing ? "bg-base-200/40" : "bg-base-200/60"} leading-relaxed`}
              value={expense?.description ?? ""}
              onChange={(e) =>
                setExpense({ ...expense, description: e.target.value })
              }
              readOnly={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-base-content/70">
              Amount
            </label>
            <input
              type="number"
              className={`input ${isEditing ? "bg-base-200/40" : "bg-base-200/60"} w-full`}
              value={expense?.amount ?? ""}
              onChange={(e) =>
                setExpense({ ...expense, amount: parseInt(e.target.value, 10) })
              }
              readOnly={!isEditing}
            />
          </div>
        </form>

        <div className="modal-action w-full grid grid-cols-2 gap-20">
          <button
            className="btn btn-outline btn-error"
            onClick={handleExpenseDelete}
          >
            Delete
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleEditSave}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
