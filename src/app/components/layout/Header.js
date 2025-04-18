"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getUnreadNotificationsCount,
  getUnreadMessagesCount,
} from "@/app/utils/api";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const notifications = await getUnreadNotificationsCount();
      const messages = await getUnreadMessagesCount();
      setNotificationCount(notifications);
      setMessageCount(messages);
    };
    fetchCounts();
  }, []);

  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-white border-b border-gray-200 z-30">
      <div className="flex items-center justify-between h-full px-6">
        {/* Search */}
        <div className="w-96">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M9.58366 17.5C13.9559 17.5 17.5003 13.9555 17.5003 9.58333C17.5003 5.21116 13.9559 1.66666 9.58366 1.66666C5.21149 1.66666 1.66699 5.21116 1.66699 9.58333C1.66699 13.9555 5.21149 17.5 9.58366 17.5Z"
                  stroke="#667085"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.3337 18.3333L16.667 16.6667"
                  stroke="#667085"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              type="search"
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-500"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Calendar */}
          <button className="relative p-2 text-gray-400 hover:text-gray-500">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M7.33333 1.83333V4.58333"
                stroke="#667085"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.6667 1.83333V4.58333"
                stroke="#667085"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.20833 8.33917H18.7917"
                stroke="#667085"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.25 7.79167V15.5833C19.25 18.3333 17.875 20.1667 14.6667 20.1667H7.33333C4.125 20.1667 2.75 18.3333 2.75 15.5833V7.79167C2.75 5.04167 4.125 3.20833 7.33333 3.20833H14.6667C17.875 3.20833 19.25 5.04167 19.25 7.79167Z"
                stroke="#667085"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-500">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M11 2.75C7.54833 2.75 4.75 5.54833 4.75 9V11.9533C4.75 12.5417 4.49167 13.475 4.16667 13.9717L3.16667 15.4733C2.44167 16.5917 2.93333 17.8567 4.18333 18.2617C8.65833 19.7633 13.3508 19.7633 17.8258 18.2617C19.0208 17.8842 19.5492 16.5367 18.8608 15.4733L17.8608 13.9717C17.5358 13.475 17.2775 12.5417 17.2775 11.9533V9C17.25 5.54833 14.4517 2.75 11 2.75Z"
                stroke="#667085"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                d="M12.7142 2.93333C12.4167 2.84167 12.1008 2.77667 11.7758 2.75C10.9058 2.66667 10.0725 2.75 9.28583 2.93333C9.57667 2.25833 10.2342 1.79333 11 1.79333C11.7658 1.79333 12.4233 2.25833 12.7142 2.93333Z"
                stroke="#667085"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.75 18.7917C13.75 20.1375 12.5458 21.2417 11 21.2417C10.2333 21.2417 9.51667 20.9167 9 20.4C8.48333 19.8833 8.25 19.1667 8.25 18.7917"
                stroke="#667085"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
            </svg>
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-blue-500 rounded-full">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Messages */}
          <button className="relative p-2 text-gray-400 hover:text-gray-500">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M7.79167 17.4167H7.33333C3.66667 17.4167 1.83333 16.5 1.83333 11.9167V7.33333C1.83333 3.66667 3.66667 1.83333 7.33333 1.83333H14.6667C18.3333 1.83333 20.1667 3.66667 20.1667 7.33333V11.9167C20.1667 15.5833 18.3333 17.4167 14.6667 17.4167H14.2083C13.9292 17.4167 13.6592 17.5508 13.4892 17.7667L12.1 19.6167C11.495 20.405 10.505 20.405 9.9 19.6167L8.51083 17.7667C8.36833 17.5783 8.03917 17.4167 7.79167 17.4167Z"
                stroke="#667085"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.6633 10.0833H14.6715"
                stroke="#667085"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.9958 10.0833H11.004"
                stroke="#667085"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.32833 10.0833H7.33658"
                stroke="#667085"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {messageCount > 0 && (
              <span className="absolute top-1.5 right-1.5 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-blue-500 rounded-full">
                {messageCount}
              </span>
            )}
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm">
                JP
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-900">
                  Jenil Patel
                </div>
                <div className="text-xs text-gray-500">Manager</div>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Your Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Settings
                </Link>
                <hr className="my-1" />
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
