'use client';

export default function TopCategories({ data }) {
  if (!data) return null;

  const getChangeColor = change => {
    const value = parseFloat(change);
    if (value > 0) return 'text-green-500';
    if (value < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <div className="bg-white rounded-xl">
      <div className="px-5 py-4 flex justify-between items-center border-b border-gray-100">
        <h2 className="text-lg font-medium">Top Categories</h2>
        <div className="text-sm text-gray-500">This Month</div>
      </div>
      <div className="p-5">
        <div className="space-y-4">
          {data.map(category => (
            <div key={category.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  {/* Icon based on category - you can add proper icons here */}
                  <span className="text-gray-600 text-lg">{category.name[0]}</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.value}</p>
                </div>
              </div>
              <span className={`text-sm font-medium ${getChangeColor(category.change)}`}>
                {category.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
