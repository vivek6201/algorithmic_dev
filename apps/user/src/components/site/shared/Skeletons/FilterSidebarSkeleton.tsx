'use client';

import { Skeleton } from '@repo/ui/components/ui/skeleton';

export default function FilterSidebarSkeleton() {
  return (
    <aside className="w-full max-w-sm p-4 sm:p-6 bg-muted/30 rounded-2xl space-y-6">
      {/* Filters heading */}
      <Skeleton className="h-6 w-1/4" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-8 w-40 rounded-full" />
          <Skeleton className="h-8 w-40 rounded-full" />
        </div>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </div>
    </aside>
  );
}
