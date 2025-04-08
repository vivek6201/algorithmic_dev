"use client"
import React from "react";

const categories = [
  "Web Development",
  "Mobile Development",
  "AI/ML",
  "Cloud",
  "DevOps",
];
const genres = ["Tutorial", "News", "Opinion", "Guide", "Interview"];
const trending = ["Most Liked", "Most Viewed", "Recently Updated"];
const tags = [
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Kubernetes",
  "Docker",
  "TailwindCSS",
];
const timeFilters = ["Last 24 Hours", "This Week", "This Month"];

const BlogsFilters = () => {
  return (
    <div className="space-y-6 text-sm">
      {/* Category Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-2 dark:text-white">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 dark:text-gray-300 transition text-gray-700"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Genre Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-2 dark:text-white">Genre</h3>
        <div className="flex flex-wrap gap-2">
          {genres.map((gen) => (
            <button
              key={gen}
              className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 dark:text-gray-300 transition text-gray-700"
            >
              {gen}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-2 dark:text-white">Trending</h3>
        <div className="flex flex-col gap-2">
          {trending.map((trend) => (
            <label
              key={trend}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
            >
              <input type="radio" name="trending" className="accent-blue-500" />
              <span>{trend}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-lg font-semibold mb-2 dark:text-white">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs hover:bg-blue-100 dark:hover:bg-blue-600 cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Time Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-2 dark:text-white">
          Published
        </h3>
        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Any Time</option>
          {timeFilters.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BlogsFilters;
