"use client";

const StatsCard = ({ title, value, change, changeType }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-2">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold">{value}</p>
          <div
            className={`text-sm px-2.5 py-0.5 rounded-full flex items-center ${
              changeType === "increase"
                ? "text-green-700 bg-green-100"
                : "text-red-700 bg-red-100"
            }`}
          >
            <span className="mr-1">
              {changeType === "increase" ? "↑" : "↓"}
            </span>
            {change}
          </div>
        </div>
        <p className="text-gray-400 text-sm">+$150 today</p>
      </div>
    </div>
  );
};

export default StatsCard;
