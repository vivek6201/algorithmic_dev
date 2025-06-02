'use client';

import { Button } from '@repo/ui/components/ui/button';
import { useRouter } from 'nextjs-toploader/app';
import { ArrowRight } from '@repo/ui';
import React from 'react';

export default function NavigationCard({ name, link }: { name: string; link: string }) {
  const router = useRouter();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 transition-all shadow-md hover:shadow-xl hover:scale-[1.015] group">
      {/* Left highlight stripe */}
      <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-indigo-500 to-blue-500" />

      {/* Content */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-semibold capitalize text-gray-900 dark:text-white tracking-tight group-hover:tracking-wider transition-all duration-200">
            {name}
          </p>
        </div>

        {/* Button on the right */}
        <Button
          size="sm"
          className="flex items-center gap-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 transition-colors px-4 py-2"
          onClick={() => router.push(link)}
        >
          Visit <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
