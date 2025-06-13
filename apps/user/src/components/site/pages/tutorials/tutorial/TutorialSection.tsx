'use client';
import { Button } from '@repo/ui/components/ui/button';
import { ChevronLeft, ChevronRight, Menu, MenuIcon } from '@repo/ui';
import { usePathname } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import React from 'react';
import HTMLRenderer from '@repo/ui/components/elements/HTMLRenderer';
import { useUtilityStore } from '@/store/sidebarStore';

export default function TutorialSection({
  data,
  prevSlug,
  nextSlug,
}: {
  prevSlug?: string;
  nextSlug?: string;
  data: {
    id: string;
    order: number;
    title: string;
    slug: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    chapterId: string;
  };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { setTutorialSidebar } = useUtilityStore();

  const handlePageChange = (type: 'next' | 'prev') => {
    if (!nextSlug && type === 'next') return;
    if (!prevSlug && type === 'prev') return;

    const newSlug = type === 'next' ? nextSlug : prevSlug;
    const newPath = pathname.replace(/[^/]+$/, encodeURIComponent(newSlug ?? ''));

    router.push(newPath);
  };

  return (
    <div className="w-full h-[800px]">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center px-4 py-2 border-b border-gray-300 dark:border-gray-700">
        <button
          onClick={() => setTutorialSidebar(true)}
          aria-label="Open sidebar"
          className="text-blue-600 dark:text-blue-400 focus:outline-none focus:ring focus:ring-blue-500 dark:focus:ring-blue-300 rounded"
        >
          {/* Hamburger icon */}
          <MenuIcon />
        </button>
        <h1 className="ml-4 font-semibold text-lg text-gray-900 dark:text-gray-100">
          {data.title}
        </h1>
      </div>

      <div className="w-full py-5 lg:py-10 lg:px-10 h-full overflow-y-auto scrollbar-none">
        <h2 className="text-2xl font-bold mb-5 ml-4 hidden lg:block">{data.title}</h2>
        <HTMLRenderer content={data.content} />
        <div className="flex justify-between items-center border-t mt-5 py-5">
          <Button
            disabled={!prevSlug}
            onClick={() => handlePageChange('prev')}
            size={'lg'}
            className="cursor-pointer"
          >
            <ChevronLeft />
            Prev
          </Button>
          <Button
            disabled={!nextSlug}
            onClick={() => handlePageChange('next')}
            size={'lg'}
            className="cursor-pointer"
          >
            Next
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
