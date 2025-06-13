import { Skeleton } from '@repo/ui/components/ui/skeleton';
import React from 'react';

export default function ListItemSkeleton() {
  return (
    <div className="rounded-xl bg-[#1c1c1e] p-5 border border-[#2c2c2e] shadow-sm">
      <div className="mb-3">
        <Skeleton className="h-6 w-32 rounded-full bg-[#2c2c2e]" />
      </div>

      <Skeleton className="h-5 w-3/4 mb-2 bg-[#2c2c2e]" />
      <Skeleton className="h-4 w-full mb-1 bg-[#2c2c2e]" />
      <Skeleton className="h-4 w-5/6 bg-[#2c2c2e]" />

      <div className="flex justify-between items-center mt-6 text-sm">
        <Skeleton className="h-4 w-20 bg-[#2c2c2e]" />
        <Skeleton className="h-4 w-24 bg-[#2c2c2e]" />
      </div>
    </div>
  );
}
