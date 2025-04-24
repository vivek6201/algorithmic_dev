import BlogsFilters from "@/components/site/pages/blogs/BlogsFilters";
import BlogsList from "@/components/site/pages/blogs/BlogsList";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Blogs - Algorithmic Dev",
  description:
    "A One-Stop Solution for all your tech related queries. Be it Jobs, tutorials, courses, blogs, helper mini apps",
};

export default function page() {
  return (
    <div className="w-full max-w-[1400px] mx-auto mt-5 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_2.4fr_0.8fr] md:px-8 lg:px-0">
        {/* Left Sidebar: Filters */}
        <aside className="space-y-4 hidden lg:block">
          <div className="p-4 rounded-2xl shadow-md border dark:bg-neutral-900">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <BlogsFilters />
          </div>
        </aside>

        {/* Center Content: Blogs List */}
        <main className="space-y-4 mx-6">
          {/* Header and Search bar */}
          <div className="flex justify-between p-4">
            <h1 className="text-2xl font-bold mb-2 flex-1">All Blogs</h1>
            <input
              type="text"
              placeholder="Search blogs..."
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[15rem]"
            />
          </div>

          {/* Blogs List */}
          <div className=" p-4">
            <BlogsList />
          </div>
        </main>

        {/* Right Sidebar: Ads */}
        <aside className="space-y-4 hidden lg:block">
          <div className=" p-4 rounded-2xl shadow-md border text-center">
            <p className="text-lg font-semibold">Advertisement</p>
            <div className="h-48 mt-4 rounded-xl flex items-center justify-center">
              <span className="text-gray-500">Ad Space</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
