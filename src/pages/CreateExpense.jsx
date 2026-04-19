import { useForm } from "react-hook-form";
import { EXPENSE_CATEGORIES } from "../config/expenseCategories";
import { useExpenses } from "../hooks/useExpenses";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CreateExpense() {
  const { addExpense } = useExpenses();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddExpense = (expenseData) => {
    try {
      const data = {
        ...expenseData,
      };
      addExpense(data);
      toast.success("Expense saved!");
      navigate("/expenses");
    } catch (e) {
      toast.error(e?.message || "Network error");
      console.error(e?.message || "Network error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 mx-auto py-6 md:w-[95%]">
      <h1 className="text-2xl font-bold">Create an Expense</h1>

      <form
        onSubmit={handleSubmit(handleAddExpense)}
        className="shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-box w-sm md:w-md p-6 space-y-6"
      >
        <div className="space-y-2">
          <label className="label text-black font-medium">Amount</label>
          <input
            type="number"
            className="input bg-base-200/40 w-full"
            placeholder="How much did you spent?"
            {...register("amount", {
              required: "Amount is required",
              minLength: {
                value: 1,
                message: "Amount must have atleast 1 number",
              },
            })}
          />
          {errors.amount && (
            <p className="text-error">{errors.amount.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="label text-black font-medium">Description</label>
          <input
            type="text"
            className="input bg-base-200/40 w-full"
            placeholder="What was this expense for?"
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 3,
                message: "Description must contain atleast 3 chars",
              },
            })}
          />
          {errors.description && (
            <p className="text-error">{errors.description.message}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="label text-black font-medium">Category</label>
            <select
              className="select appearance-none bg-base-200/40 w-full"
              {...register("category", {
                required: "Category is required",
              })}
              defaultValue=""
            >
              <option value="">Select category</option>

              {EXPENSE_CATEGORIES &&
                EXPENSE_CATEGORIES.map((category, index) => (
                  <option value={category.id} key={index}>
                    {category.label}
                  </option>
                ))}
            </select>
            {errors.category && (
              <p className="text-error">{errors.category.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="label text-black font-medium">Date</label>
            <input
              type="date"
              className="input bg-base-200/40 w-full"
              {...register("date", {
                required: "Date is required",
              })}
            ></input>
            {errors.date && <p className="text-error">{errors.date.message}</p>}
          </div>
        </div>
        <button className="btn btn-secondary w-full">Save Expense</button>
      </form>
    </div>
  );
}

export default CreateExpense;
