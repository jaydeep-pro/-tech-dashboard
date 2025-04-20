'use client';

import { useEffect, useState } from 'react';
import StatsCard from './components/dashboard/StatsCard';
import RevenueChart from './components/dashboard/RevenueChart';
import SalesDonutChart from './components/dashboard/SalesDonutChart';
import TargetChart from './components/dashboard/TargetChart';
import TopProducts from './components/dashboard/TopProducts';
import TopCategories from './components/dashboard/TopCategories';
import RecentOrders from './components/dashboard/RecentOrders';
import CustomerGrowth from './components/dashboard/CustomerGrowth';
import DateSelector from './components/dashboard/DateSelector';
import {
  getStats,
  getRevenueData,
  getSalesSource,
  getTopProducts,
  getTopCategories,
  getRecentOrders,
  getCustomerGrowth,
} from './utils/api';

export default function Home() {
  const [stats, setStats] = useState([]);
  const [revenueData, setRevenueData] = useState(null);
  const [salesSource, setSalesSource] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [recentOrders, setRecentOrders] = useState(null);
  const [customerGrowth, setCustomerGrowth] = useState(null);
  const [selectedDate, setSelectedDate] = useState('This Month');

  const handleDateChange = newDate => {
    setSelectedDate(newDate);
    // Here you would typically fetch new data based on the selected date
    // For now, we'll just use the existing data
  };

  useEffect(() => {
    // Fetch all data
    setStats(getStats());
    setRevenueData(getRevenueData());
    setSalesSource(getSalesSource());
    setTopProducts(getTopProducts());
    setTopCategories(getTopCategories());
    setRecentOrders(getRecentOrders());
    setCustomerGrowth(getCustomerGrowth());
  }, []);

  return (
    <div
      className="min-h-screen bg-gray-50 bg-opacity-50 space-y-6 p-6"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)`,
        backgroundSize: '24px 24px',
      }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-medium">Welcome Back Jenil</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your store today</p>
        </div>
        <DateSelector selected={selectedDate} onSelect={handleDateChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TargetChart data={revenueData?.target} />
        <RevenueChart data={revenueData?.monthlyData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SalesDonutChart data={salesSource} />
        <TopProducts data={topProducts} />
        <TopCategories data={topCategories} />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <RecentOrders data={recentOrders} />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <CustomerGrowth data={customerGrowth} />
        </div>
      </div>
    </div>
  );
}
