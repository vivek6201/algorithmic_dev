'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface CategoryType {
  name: string;
  id: string;
  slug: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TutorialFilters = ({ data }: { data: CategoryType[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selected = searchParams.get('category')?.split(',') ?? [];

  const toggleFilter = (category: CategoryType) => {
    const newSelected = selected.includes(category.slug)
      ? selected.filter((l) => l !== category.slug)
      : [...selected, category.slug]; // <- FIXED HERE

    const params = new URLSearchParams(searchParams.toString());
    if (newSelected.length > 0) {
      params.set('category', newSelected.join(','));
    } else {
      params.delete('category');
    }

    router.replace(`?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('category');
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="space-y-6 text-sm">
      <div>
        <h3 className="font-semibold mb-2 dark:text-white">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {data.map((category) => {
            const isSelected = selected.includes(category.slug);
            return (
              <button
                key={category.id}
                onClick={() => toggleFilter(category)}
                className={`px-3 py-1 rounded-full border cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-blue-500 text-white dark:bg-blue-600 border-blue-500'
                    : 'hover:bg-blue-100 dark:hover:bg-blue-700 dark:text-gray-300 border dark:border-gray-600'
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        {selected.length > 0 && (
          <button
            onClick={clearFilters}
            className="mt-4 text-sm px-4 py-1 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default TutorialFilters;
