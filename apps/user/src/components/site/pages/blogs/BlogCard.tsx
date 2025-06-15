import Link from 'next/link';
import React from 'react';

interface BlogCardProps {
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  description,
  author,
  date,
  category,
  slug,
}) => {
  const encodedSlug = encodeURIComponent(slug);
  return (
    <div className="border rounded-2xl flex flex-col items-start p-5 md:p-6 shadow-sm hover:shadow-md transition bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-100 h-[210px]">
      {/* Category */}
      <span className="text-xs max-w-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full inline-block mb-3">
        {category}
      </span>

      {/* Title */}
      <Link
        href={`/blogs/${encodedSlug}`}
        className="text-xl font-semibold mb-2 line-clamp-2 hover:underline underline-offset-2"
      >
        {title}
      </Link>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{description}</p>

      {/* Author + Date */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 w-full">
        <span>By {author}</span>
        <span>{new Date(date).toDateString()}</span>
      </div>
    </div>
  );
};

export default BlogCard;
