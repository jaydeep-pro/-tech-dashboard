'use client';

import { useState, useEffect, useRef } from 'react';
import { getRecentOrders, deleteOrder, updateOrderStatus } from '../../utils/api';
import DeleteConfirmation from './DeleteConfirmation';

export default function RecentOrders() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [showFilters, setShowFilters] = useState(false);
  const [showEditColumns, setShowEditColumns] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([200, 8000]);
  const [sortOrder, setSortOrder] = useState('low-to-high');
  const [selectedColumns, setSelectedColumns] = useState({
    paymentType: true,
    bankName: true,
    discount: true,
    deliveryStatus: true,
    deliveryDate: true,
  });
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, orderId: null });

  // Refs for click outside detection
  const datePickerRef = useRef(null);
  const filtersRef = useRef(null);
  const editColumnsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setShowFilters(false);
      }
      if (editColumnsRef.current && !editColumnsRef.current.contains(event.target)) {
        setShowEditColumns(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchOrders = async () => {
    const result = await getRecentOrders(currentPage, 5, {
      ...filters,
      search: searchTerm,
      dateRange: dateRange.start && dateRange.end ? [dateRange.start, dateRange.end] : null,
    });
    setData(result);
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, filters, searchTerm, dateRange]);

  const handleDelete = async orderId => {
    setDeleteConfirm({ show: true, orderId });
  };

  const confirmDelete = async () => {
    if (deleteConfirm.orderId) {
      await deleteOrder(deleteConfirm.orderId);
      fetchOrders();
      setDeleteConfirm({ show: false, orderId: null });
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus);
    fetchOrders();
  };

  const getStatusColor = status => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'text-orange-500 bg-orange-50';
      case 'shipped':
        return 'text-blue-500 bg-blue-50';
      case 'delivered':
        return 'text-green-500 bg-green-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const renderDatePicker = () => (
    <div
      ref={datePickerRef}
      className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg z-50 border border-gray-200 w-[720px]"
      style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}
    >
      <div className="p-4">
        <div className="flex gap-6">
          <div className="w-48 border-r border-gray-200">
            <div className="space-y-1">
              <button
                onClick={() => {
                  const today = new Date();
                  setDateRange({ start: today, end: today });
                }}
                className="w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
              >
                Today
              </button>
              <button
                onClick={() => {
                  const yesterday = new Date();
                  yesterday.setDate(yesterday.getDate() - 1);
                  setDateRange({ start: yesterday, end: yesterday });
                }}
                className="w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
              >
                Yesterday
              </button>
              <button
                onClick={() => {
                  const today = new Date();
                  const weekStart = new Date();
                  weekStart.setDate(today.getDate() - today.getDay());
                  setDateRange({ start: weekStart, end: today });
                }}
                className="w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
              >
                This week
              </button>
              <button
                onClick={() => {
                  const today = new Date();
                  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                  setDateRange({ start: monthStart, end: today });
                }}
                className="w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
              >
                This month
              </button>
              <button
                onClick={() => {
                  const today = new Date();
                  const yearStart = new Date(today.getFullYear(), 0, 1);
                  setDateRange({ start: yearStart, end: today });
                }}
                className="w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
              >
                This year
              </button>
            </div>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-900">January 2022</h3>
                    <div className="flex items-center gap-4">
                      <button className="text-gray-400 hover:text-gray-500">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    <div className="text-xs font-medium text-gray-500">Mo</div>
                    <div className="text-xs font-medium text-gray-500">Tu</div>
                    <div className="text-xs font-medium text-gray-500">We</div>
                    <div className="text-xs font-medium text-gray-500">Th</div>
                    <div className="text-xs font-medium text-gray-500">Fr</div>
                    <div className="text-xs font-medium text-gray-500">Sa</div>
                    <div className="text-xs font-medium text-gray-500">Su</div>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 31 }, (_, i) => (
                      <button
                        key={i}
                        className={`h-8 text-sm rounded-full ${
                          i + 1 === 6
                            ? 'bg-blue-500 text-white'
                            : i + 1 === 13
                              ? 'bg-blue-500 text-white'
                              : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-900">February 2022</h3>
                    <div className="flex items-center gap-4">
                      <button className="text-gray-400 hover:text-gray-500">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    <div className="text-xs font-medium text-gray-500">Mo</div>
                    <div className="text-xs font-medium text-gray-500">Tu</div>
                    <div className="text-xs font-medium text-gray-500">We</div>
                    <div className="text-xs font-medium text-gray-500">Th</div>
                    <div className="text-xs font-medium text-gray-500">Fr</div>
                    <div className="text-xs font-medium text-gray-500">Sa</div>
                    <div className="text-xs font-medium text-gray-500">Su</div>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 28 }, (_, i) => (
                      <button
                        key={i}
                        className="h-8 text-sm rounded-full hover:bg-gray-100 text-gray-700"
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex gap-4">
          <div className="text-sm">
            <span className="text-gray-500">Start:</span>{' '}
            <span className="font-medium">
              {dateRange.start ? dateRange.start.toLocaleDateString() : 'Not set'}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">End:</span>{' '}
            <span className="font-medium">
              {dateRange.end ? dateRange.end.toLocaleDateString() : 'Not set'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setDateRange({ start: null, end: null });
              setShowDatePicker(false);
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Clear
          </button>
          <button
            onClick={() => {
              if (dateRange.start && dateRange.end) {
                fetchOrders();
              }
              setShowDatePicker(false);
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );

  const renderFilters = () => (
    <div
      ref={filtersRef}
      className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg z-50 border border-gray-200 w-80"
      style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium text-gray-900">Filter</h3>
          <button
            onClick={() => setFilters({})}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Clear all
          </button>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg pl-9 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <svg
              className="w-4 h-4 absolute left-3 top-2.5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                name="sort"
                value="low-to-high"
                checked={sortOrder === 'low-to-high'}
                onChange={e => setSortOrder(e.target.value)}
              />
              <span className="ml-2 text-sm text-gray-700">Low to high</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                name="sort"
                value="high-to-low"
                checked={sortOrder === 'high-to-low'}
                onChange={e => setSortOrder(e.target.value)}
              />
              <span className="ml-2 text-sm text-gray-700">High to Low</span>
            </label>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-gray-700">Price Range</span>
              <span className="text-gray-500">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="8000"
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <select
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.comparison || ''}
              onChange={e => setFilters({ ...filters, comparison: e.target.value })}
            >
              <option value="">Select comparison</option>
              <option value="<">Less Than</option>
              <option value="=">=</option>
              <option value=">">&gt;</option>
              <option value=">=">&gt;=</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEditColumns = () => (
    <div
      ref={editColumnsRef}
      className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg z-50 border border-gray-200 w-64"
      style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium text-gray-900">Edit Columns</h3>
          <button
            onClick={() =>
              setSelectedColumns({
                paymentType: true,
                bankName: true,
                discount: true,
                deliveryStatus: true,
                deliveryDate: true,
              })
            }
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Reset
          </button>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Find an Column"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg
            className="w-4 h-4 absolute right-3 top-2.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="space-y-3">
          {Object.entries(selectedColumns).map(([key, value]) => (
            <label key={key} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={value}
                onChange={e =>
                  setSelectedColumns({
                    ...selectedColumns,
                    [key]: e.target.checked,
                  })
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  if (!data) return null;

  return (
    <div className="bg-white rounded-xl">
      <div className="px-5 py-4 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-2">
          <h2 className="text-[15px] font-semibold text-gray-900">Recent Orders</h2>
          <span className="px-2 py-0.5 text-xs font-medium text-green-600 bg-green-50 rounded-full">
            +{data?.newOrders || 0} Orders
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowEditColumns(!showEditColumns)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
              Edit Columns
            </button>
            {showEditColumns && renderEditColumns()}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Select Date
            </button>
            {showDatePicker && renderDatePicker()}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Filters
            </button>
            {showFilters && renderFilters()}
          </div>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700">See All</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-5 text-sm font-medium text-gray-500">Product</th>
              <th className="text-left py-3 px-5 text-sm font-medium text-gray-500">Customer</th>
              <th className="text-left py-3 px-5 text-sm font-medium text-gray-500">Total</th>
              <th className="text-left py-3 px-5 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left py-3 px-5 text-sm font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.orders.map(order => (
              <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/40">
                <td className="py-3 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
                    <div>
                      <div className="font-medium text-gray-900">{order.product}</div>
                      {order.additionalProducts > 0 && (
                        <div className="text-xs text-gray-500">
                          +{order.additionalProducts} other products
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-5">
                  <div className="font-medium text-gray-900">{order.customer}</div>
                  <div className="text-xs text-gray-500">{order.email}</div>
                </td>
                <td className="py-3 px-5">
                  <div className="font-medium text-gray-900">${order.total}</div>
                </td>
                <td className="py-3 px-5">
                  <select
                    className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}
                    value={order.status}
                    onChange={e => handleStatusUpdate(order.id, e.target.value)}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td className="py-3 px-5">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 flex items-center justify-between border-t border-gray-100">
        <div className="text-sm text-gray-500">
          Showing {(currentPage - 1) * 5 + 1}-
          {Math.min(currentPage * 5, data.pagination.totalItems)} from {data.pagination.totalItems}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {[...Array(data.pagination.totalPages)].map((_, index) => {
            const page = index + 1;
            if (
              page === 1 ||
              page === data.pagination.totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 flex items-center justify-center rounded text-sm ${
                    currentPage === page
                      ? 'bg-blue-500 text-white'
                      : 'border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <span key={page} className="px-0.5">
                  ...
                </span>
              );
            }
            return null;
          })}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === data.pagination.totalPages}
            className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <DeleteConfirmation
        isOpen={deleteConfirm.show}
        onClose={() => setDeleteConfirm({ show: false, orderId: null })}
        onConfirm={confirmDelete}
        itemName="order"
      />
    </div>
  );
}
