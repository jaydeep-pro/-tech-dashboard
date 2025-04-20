'use client';

export default function CustomerGrowth({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white rounded-xl">
      <div className="px-5 py-4 flex justify-between items-center border-b border-gray-100">
        <h2 className="text-lg font-medium">Customer Growth</h2>
        <div className="text-sm text-gray-500">This Month</div>
      </div>
      <div className="p-5">
        <div className="relative">
          {/* World Map Placeholder */}
          <div className="h-48 bg-gray-50 rounded mb-6 relative">
            {/* Add world map SVG or image here */}
            <div className="absolute top-4 left-4 bg-gray-900 text-white rounded px-3 py-1 text-sm">
              <div>Cust: {data.total}</div>
              <div>Growth: {data.growth}</div>
            </div>
          </div>

          {/* Countries List */}
          <div className="space-y-4">
            {data.countries.map(country => (
              <div key={country.name} className="flex flex-col">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{country.name}</span>
                    <span className="text-sm text-gray-500">{country.customers} Customers</span>
                  </div>
                  <span className="text-sm font-medium">{country.percentage}</span>
                </div>
                {/* Progress bar */}
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{
                      width: country.percentage,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
