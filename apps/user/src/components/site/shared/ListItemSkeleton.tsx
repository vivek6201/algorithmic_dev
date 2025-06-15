import { Skeleton } from '@repo/ui/components/ui/skeleton';
import React from 'react';

export default function ListItemSkeleton() {
  return (
    <div className="rounded-xl bg-gray-100 dark:bg-[#1c1c1e] p-5 border border-gray-300 dark:border-[#2c2c2e] shadow-sm">
      <div className="mb-3">
        <Skeleton className="h-6 w-32 rounded-full bg-gray-300 dark:bg-[#2c2c2e]" />
      </div>

      <Skeleton className="h-5 w-3/4 mb-2 bg-gray-300 dark:bg-[#2c2c2e]" />
      <Skeleton className="h-4 w-full mb-1 bg-gray-300 dark:bg-[#2c2c2e]" />
      <Skeleton className="h-4 w-5/6 bg-gray-300 dark:bg-[#2c2c2e]" />

      <div className="flex justify-between items-center mt-6 text-sm">
        <Skeleton className="h-4 w-20 bg-gray-300 dark:bg-[#2c2c2e]" />
        <Skeleton className="h-4 w-24 bg-gray-300 dark:bg-[#2c2c2e]" />
      </div>
    </div>
  );
}
