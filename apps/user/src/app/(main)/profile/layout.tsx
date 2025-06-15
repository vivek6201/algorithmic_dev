'use client';

import ProfileSidebar from '@/components/site/pages/profile/profileSidebar';
import React, { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="max-w-[1400px] mx-auto mt-16 md:mt-24 mb-10 min-h-[800px] relative">
      {/* Mobile Header with hamburger */}
      <div className="md:hidden flex items-center px-4 py-2 border-b border-gray-300 dark:border-gray-700">
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
          className="text-blue-600 dark:text-blue-400 focus:outline-none focus:ring focus:ring-blue-500 dark:focus:ring-blue-300 rounded"
        >
          {/* Hamburger icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <h1 className="ml-4 font-semibold text-lg text-gray-900 dark:text-gray-100">Profile</h1>
      </div>

      <div className="md:grid md:grid-cols-[250px_1fr] gap-6">
        {/* Sidebar for md+ */}
        <div className="hidden md:block h-full w-full shadow-sm border-r border-gray-200 dark:border-gray-700 ">
          <ProfileSidebar />
        </div>

        {/* Mobile Sidebar Drawer with Framer Motion */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                onClick={() => setSidebarOpen(false)}
                aria-hidden="true"
              />

              {/* Sidebar panel */}
              <motion.aside
                key="sidebar"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 z-50 shadow-lg border-r border-gray-200 dark:border-gray-700 rounded-r-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-end p-4 md:hidden border-b border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close sidebar"
                    className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 focus:outline-none focus:ring focus:ring-red-400 dark:focus:ring-red-600 rounded"
                  >
                    {/* Close icon */}
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <div className="mt-5">
                  <ProfileSidebar />
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="mt-4 md:mt-0 min-h-[800px]">{children}</main>
      </div>
    </div>
  );
}
