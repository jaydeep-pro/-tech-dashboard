"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Official Website", "Offline Store", "Amazon Store", "Reseller"],
  datasets: [
    {
      data: [10000, 10000, 10000, 10000],
      backgroundColor: ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"],
      borderWidth: 0,
    },
  ],
};

const options = {
  responsive: true,
  cutout: "75%",
  plugins: {
    legend: {
      display: false,
    },
  },
};

const SalesDonutChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Sales Source</h2>
        <span className="text-green-500 text-sm">+10%</span>
      </div>
      <div className="relative">
        <div className="w-48 h-48 mx-auto">
          <Doughnut data={data} options={options} />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-2xl font-semibold">$75.5k</div>
          <div className="text-sm text-gray-500">Total Sales</div>
        </div>
      </div>
      <div className="mt-6 space-y-2">
        {data.labels.map((label, index) => (
          <div key={label} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full`}
                style={{
                  backgroundColor: data.datasets[0].backgroundColor[index],
                }}
              ></div>
              <span className="text-sm">{label}</span>
            </div>
            <span className="text-sm font-medium">$10,000</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesDonutChart;
