export default function ExpenseModel({ expense, isOpen, onClose }) {
  console.log(expense);
  if (!isOpen) return null;

  const handleClose = () => {
    onClose?.();
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

        <form className="py-4  space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-base-content/70">
              Description
            </label>
            <textarea
              rows={2}
              readOnly
              className="textarea textarea-bordered w-full bg-base-200/40 leading-relaxed"
              value={expense?.description ?? ""}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-base-content/70">
              Amount
            </label>
            <input
              type="text"
              className="input bg-base-200/40 w-full"
              value={expense?.amount ?? ""}
            />
          </div>
        </form>

        <div className="modal-action w-full grid grid-cols-2 gap-20">
          <button className="btn btn-outline btn-error">Delete</button>

          <button className="btn btn-secondary">Edit</button>
          {/* <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button> */}
        </div>
      </div>

      {/* Clicking the dark backdrop also closes and syncs state */}
      <form method="dialog" className="modal-backdrop" onClick={handleClose}>
        <button aria-label="close" />
      </form>
    </dialog>
  );
}
