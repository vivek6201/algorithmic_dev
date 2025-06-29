import { BlogWithCategoryAndReactions } from '@/types/main';
import Link from 'next/link';
import React from 'react';

interface BlogCardProps extends BlogWithCategoryAndReactions {
  categoryName: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  description,
  authorName,
  categoryName,
  slug,
  updatedAt,
}) => {
  const encodedSlug = encodeURIComponent(slug);
  return (
    <div className="border rounded-2xl flex flex-col items-start p-5 md:p-6 shadow-sm hover:shadow-md transition bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-100 min-h-[200px]">
      {/* Category */}
      <span className="text-xs max-w-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full inline-block mb-3">
        {categoryName}
      </span>

      {/* Title */}
      <Link
        href={`/blogs/${encodedSlug}`}
        className="text-base sm:text-lg md:text-xl font-semibold mb-2 hover:underline underline-offset-2"
      >
        {title}
      </Link>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {description.split(' ').length > 20
          ? description.split(' ').slice(0, 20).join(' ') + '...'
          : description}
      </p>

      {/* Author + Date */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 w-full">
        <span>By {authorName}</span>
        <span>{updatedAt.toDateString()}</span>
      </div>
    </div>
  );
};

export default BlogCard;
