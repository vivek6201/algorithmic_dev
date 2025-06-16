'use client';

import { Skeleton } from '@repo/ui/components/ui/skeleton';

export default function PageLoadingSkeleton() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      {/* Breadcrumb */}
      <Skeleton className="h-4 w-1/3 sm:w-1/4" />

      {/* Title */}
      <Skeleton className="h-8 w-full sm:w-3/4 rounded-md" />

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* Social icons */}
      <div className="flex gap-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      {/* Section: Company Description */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/2 sm:w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* Section: Role Description */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/2 sm:w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* Section: Qualifications */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/2 sm:w-1/4" />
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full sm:w-3/4" />
        ))}
      </div>

      {/* Apply Button */}
      <Skeleton className="h-10 w-full sm:w-32 rounded-md mt-4" />
    </section>
  );
}
