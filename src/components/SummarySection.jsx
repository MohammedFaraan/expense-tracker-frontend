export default function SummarySection({ expenseStats }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="p-4 rounded-box shadow-sm space-y-2">
        <p className="text-gray-400 text-sm font-medium">TOTAL SPENT</p>
        <p className="text-lg font-bold">
          {expenseStats && `₹${expenseStats.total}`}
        </p>
      </div>
      <div className="p-4 rounded-box shadow-sm space-y-2">
        <p className="text-gray-400 text-sm font-medium">BUDGET</p>
        <p className="text-lg font-bold">₹10000</p>
      </div>
      <div className="bg-secondary text-white p-4 rounded-box shadow-sm space-y-2">
        <p className="font-medium text-sm">TOP CATEGORY</p>
        <p className="text-lg font-bold capitalize">
          {expenseStats && `${expenseStats.highestCategory}`}
        </p>
        <p className="font-medium">
          {expenseStats && `₹${expenseStats.highestCategoryAmount}`}
        </p>
      </div>
    </div>
  );
}
