'use client';

export default function RevenueChart({ data }) {
  if (!data) return null;

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const maxValue = Math.max(...data.data.map(d => Math.max(d.revenue, d.sales)));
  const chartHeight = 200;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Statistic</h2>
        <div className="text-sm text-gray-500">Revenue and Sales</div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-600">Revenue: {data.revenue}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-sm text-gray-600">Sales: {data.sales}</span>
        </div>
      </div>

      <div className="relative h-[200px]">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between text-xs text-gray-500">
          {['$1.2k', '$1k', '$800', '$600', '$400', '$200', '0'].map((label, i) => (
            <div key={i} className="relative -ml-2">
              {label}
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div className="absolute left-16 right-0 top-0 bottom-0">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="border-t border-gray-100 w-full" />
            ))}
          </div>

          {/* Lines */}
          <svg className="absolute inset-0" viewBox={`0 0 ${months.length * 50} ${chartHeight}`}>
            {/* Revenue line */}
            <path
              d={data.data
                .map(
                  (d, i) =>
                    `${i === 0 ? 'M' : 'L'} ${i * 50 + 25} ${chartHeight - (d.revenue / maxValue) * chartHeight}`
                )
                .join(' ')}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
            />
            {/* Sales line */}
            <path
              d={data.data
                .map(
                  (d, i) =>
                    `${i === 0 ? 'M' : 'L'} ${i * 50 + 25} ${chartHeight - (d.sales / maxValue) * chartHeight}`
                )
                .join(' ')}
              fill="none"
              stroke="#F97316"
              strokeWidth="2"
            />
          </svg>

          {/* X-axis labels */}
          <div className="absolute left-0 right-0 bottom-0 flex justify-between transform translate-y-6 text-xs text-gray-500">
            {months.map(month => (
              <div key={month}>{month}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
