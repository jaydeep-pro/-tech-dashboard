'use client';

import { useState } from 'react';

export default function SalesDonutChart({ data }) {
  if (!data || !data.sources || data.sources.length === 0) return null;

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];
  const total = data.sources.reduce((sum, source) => sum + (Number(source.value) || 0), 0);

  // Helper function to format numbers
  const formatNumber = number => {
    if (!number || isNaN(number)) return '0';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(number);
  };

  // Helper function to calculate growth percentage
  const getGrowthPercentage = () => {
    if (!data.growth || isNaN(data.growth)) return '+0.00%';
    return `${data.growth >= 0 ? '+' : ''}${Number(data.growth).toFixed(2)}%`;
  };

  return (
    <div className="bg-white rounded-xl">
      <div className="px-5 py-4 flex justify-between items-center border-b border-gray-100">
        <h2 className="text-lg font-medium">Sales Source</h2>
        <div className="text-sm text-gray-500">This Month</div>
      </div>
      <div className="p-5">
        <div className="relative w-full aspect-square max-w-[240px] mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90">
            {data.sources.map((source, index) => {
              const value = Number(source.value) || 0;
              const percentage = total > 0 ? (value / total) * 100 : 0;
              const circumference = 2 * Math.PI * 40;
              const offset = index * (circumference / data.sources.length);
              const dashArray = `${(percentage / 100) * circumference} ${circumference}`;
              const isHovered = hoveredIndex === index;

              return (
                <circle
                  key={source.name}
                  cx="50%"
                  cy="50%"
                  r="40"
                  fill="none"
                  stroke={colors[index]}
                  strokeWidth={isHovered ? '14' : '12'}
                  strokeDasharray={dashArray}
                  strokeDashoffset={-offset}
                  className="transform origin-center transition-all duration-300"
                  style={{
                    filter: isHovered ? 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' : 'none',
                    opacity: hoveredIndex === null || isHovered ? 1 : 0.7,
                  }}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-semibold">${formatNumber(total)}</div>
            <div className="text-sm text-green-500">{getGrowthPercentage()}</div>
          </div>
        </div>

        <div className="space-y-3">
          {data.sources.map((source, index) => {
            const value = Number(source.value) || 0;
            const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : '0.00';

            return (
              <div
                key={source.name}
                className="flex items-center justify-between p-2 rounded-lg transition-colors duration-200 hover:bg-gray-50"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full transition-transform duration-200"
                    style={{
                      backgroundColor: colors[index],
                      transform: hoveredIndex === index ? 'scale(1.2)' : 'scale(1)',
                    }}
                  />
                  <span className="text-sm text-gray-600">{source.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">{percentage}%</span>
                  <span className="text-sm font-medium">${formatNumber(value)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
