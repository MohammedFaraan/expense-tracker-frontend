export default function SummarySection({ expenseStats }) {
  // Fallback values to prevent layout shift or empty boxes
  const total = expenseStats?.total?.toLocaleString("en-IN") || "0";
  const topCat = expenseStats?.highestCategory || "N/A";
  const topCatAmt =
    expenseStats?.highestCategoryAmount?.toLocaleString("en-IN") || "0";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Total Spent Card */}
      <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col justify-between">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">
          Total Spent
        </p>
        <div className="mt-2">
          <span className="text-2xl font-black text-gray-900">₹{total}</span>
          <p className="text-xs text-green-500 font-medium mt-1">
            ↑ 12% from last year
          </p>
        </div>
      </div>

      {/* Budget Card */}
      <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col justify-between">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">
          Monthly Budget
        </p>
        <div className="mt-2">
          <span className="text-2xl font-black text-gray-900">₹10,000</span>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3">
            <div
              className="bg-indigo-500 h-1.5 rounded-full"
              style={{ width: "75%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Top Category Card - Highlighted */}
      <div className="bg-indigo-600 p-5 rounded-2xl shadow-md hover:shadow-lg text-white flex flex-col justify-between">
        <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider">
          Top Category
        </p>
        <div className="mt-2">
          <span className="text-2xl font-black capitalize">{topCat}</span>
          <p className="text-sm text-indigo-100 mt-1 opacity-90">
            Total: <span className="font-bold text-white">₹{topCatAmt}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
