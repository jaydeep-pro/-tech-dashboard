"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      align: "end",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "#f3f4f6",
      },
      ticks: {
        callback: (value) => `$${value}`,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const data = {
  labels,
  datasets: [
    {
      label: "Revenue",
      data: [
        1000, 1200, 900, 1600, 1200, 1500, 1300, 1800, 1400, 1100, 1500, 1700,
      ],
      borderColor: "#2563eb",
      backgroundColor: "#2563eb",
      tension: 0.4,
    },
    {
      label: "Sales",
      data: [800, 900, 700, 1200, 900, 1100, 1000, 1400, 1100, 800, 1200, 1300],
      borderColor: "#f97316",
      backgroundColor: "#f97316",
      tension: 0.4,
    },
  ],
};

const RevenueChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Revenue and Sales</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">Revenue:</span>
            <span className="text-blue-600">1,240</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">Sales:</span>
            <span className="text-orange-600">30%</span>
          </div>
        </div>
      </div>
      <Line options={options} data={data} height={80} />
    </div>
  );
};

export default RevenueChart;
