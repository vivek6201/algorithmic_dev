import { BlogWithCategoryAndReactions } from '@/types/main';
import LazyImage from '@repo/ui/components/elements/LazyImage';
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
  coverImage,
}) => {
  const encodedSlug = encodeURIComponent(slug);

  return (
    <div className="flex flex-col sm:flex-row border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-100 w-full max-h-[500px] md:max-h-[250px]">
      {/* Cover Image */}
      <div className="w-full sm:w-2/5 bg-gray-100 dark:bg-neutral-800">
        <div className="aspect-video sm:aspect-auto sm:h-full w-full">
          <LazyImage
            src={coverImage || '/cover-image-placeholder.png'}
            alt="cover image"
            height={500}
            width={500}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 overflow-hidden">
        {/* Category */}
        <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full inline-block mb-3 w-max">
          {categoryName}
        </span>

        {/* Title */}
        <Link
          href={`/blogs/${encodedSlug}`}
          className="text-lg sm:text-xl font-semibold mb-2 hover:underline underline-offset-2 line-clamp-2"
        >
          {title}
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{description}</p>

        {/* Author + Date */}
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-auto">
          <span>By {authorName}</span>
          <span>{new Date(updatedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
