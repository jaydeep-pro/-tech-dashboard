'use client';

export default function TargetChart({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Target</h2>
        <div className="text-sm text-gray-500">Revenue Target</div>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-40 h-40">
          {/* Circle progress */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              className="text-gray-200"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="70"
              cx="80"
              cy="80"
            />
            <circle
              className="text-blue-500"
              strokeWidth="8"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="70"
              cx="80"
              cy="80"
              strokeDasharray={`${(parseInt(data.percentage) * 439) / 100} 439`}
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-2xl font-bold">{data.percentage}</div>
            <div className="text-green-500 text-sm">{data.change}</div>
          </div>
        </div>

        <div className="flex-1 ml-8">
          <p className="text-sm text-gray-600 mb-4">
            You succeed earn {data.earnToday} today, its higher than yesterday
          </p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Target</span>
              <span className="text-sm font-medium text-red-500">{data.values.target}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Revenue</span>
              <span className="text-sm font-medium text-green-500">{data.values.revenue}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Today</span>
              <span className="text-sm font-medium text-green-500">{data.values.today}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
