"use client";

import StatsCard from "./components/dashboard/StatsCard";
import RevenueChart from "./components/dashboard/RevenueChart";
import SalesDonutChart from "./components/dashboard/SalesDonutChart";

const stats = [
  {
    title: "Total Project",
    value: "6,784",
    change: "10%",
    changeType: "increase",
  },
  {
    title: "In Progress",
    value: "1,920",
    change: "10%",
    changeType: "increase",
  },
  { title: "Finished", value: "4,412", change: "10%", changeType: "increase" },
  { title: "Unfinished", value: "329", change: "10%", changeType: "increase" },
];

const topProducts = [
  { name: "Logic+ Wireless Mouse", price: "$1,240", category: "Mouse" },
  { name: "PS Wireless Controller", price: "$1,189", category: "Smartphone" },
  { name: "Ximi Mechanical Keyboard", price: "$1,100", category: "Smartphone" },
  { name: "Audia Tech Earphone", price: "$908", category: "Earphone" },
  { name: "Sams S14 Pro", price: "$900", category: "Tablet" },
  { name: "Sams A13 5G", price: "$870", category: "Smartphone" },
  { name: "Jsound P01 TWS", price: "$870", category: "Earphone" },
];

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-medium">Welcome Back Jenil</h1>
          <p className="text-gray-500 mt-1">
            Lorem ipsum dolor si amet welcome back jenil
          </p>
        </div>
        <button className="bg-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border border-gray-200">
          Select Dates
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <SalesDonutChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Top Products</h2>
            <button className="text-blue-600 text-sm">View all</button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product) => (
              <div key={product.name} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded"></div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <div className="text-sm font-medium">{product.price}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Recent Orders</h2>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm bg-gray-100 rounded">
                Select Date
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 rounded">
                Filters
              </button>
              <button className="text-blue-600 text-sm">See All</button>
            </div>
          </div>
          <div className="h-[400px] bg-gray-50 rounded flex items-center justify-center">
            Orders table will be implemented next
          </div>
        </div>
      </div>
    </div>
  );
}
