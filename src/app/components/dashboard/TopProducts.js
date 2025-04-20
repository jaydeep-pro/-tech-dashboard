'use client';

export default function TopProducts({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white rounded-xl">
      <div className="px-5 py-4 flex justify-between items-center border-b border-gray-100">
        <h2 className="text-lg font-medium">Top Products</h2>
        <div className="text-sm text-gray-500">This Month</div>
      </div>
      <div className="p-5">
        {data.map((product, index) => (
          <div key={product.name} className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
              {/* Product image placeholder */}
              <span className="text-gray-400 text-xl">{product.category[0]}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
            <div className="text-sm font-medium">{product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
