'use client';
import { Button } from '@repo/ui/components/ui/button';
import { ChevronLeft, ChevronRight, Menu } from '@repo/ui';
import { usePathname } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import React from 'react';
import HTMLRenderer from '@repo/ui/components/elements/HTMLRenderer';

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

  const handlePageChange = (type: 'next' | 'prev') => {
    if (!nextSlug && type === 'next') return;
    if (!prevSlug && type === 'prev') return;

    const newSlug = type === 'next' ? nextSlug : prevSlug;
    const newPath = pathname.replace(/[^/]+$/, newSlug ?? '');

    router.push(newPath);
  };

  return (
    <div className="w-full h-[800px]">
      <div className="flex w-full items-center gap-5 lg:hidden border-b py-2">
        <Menu size={18} className="opacity-70" />
      </div>
      <div className="w-full py-10 md:px-10 h-full overflow-y-auto scrollbar-none">
        <h2 className="text-2xl font-bold mb-5 ml-4">{data.title}</h2>
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
