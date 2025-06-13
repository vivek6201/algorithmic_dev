'use client';

import React, { useRef, useEffect } from 'react';
import TutorialCard from './TutorialCard';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { clsx } from '@repo/ui';
import { useIsMobile } from '@repo/ui/hooks/use-mobile';
import ListItemSkeleton from '../../shared/ListItemSkeleton';

const LIMIT = 10;

export default function TutorialsList() {
  const searchParams = useSearchParams();
  const categories = searchParams.get('category');
  const isMobile = useIsMobile();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchTutorials = async ({ pageParam = 1 }) => {
    const res = await axios.get('/api/tutorials', {
      params: {
        category: categories ?? undefined,
        page: pageParam,
        limit: LIMIT,
      },
    });

    const { data, pagination } = res.data;

    return {
      tutorials: data,
      nextPage: pagination.currentPage + 1,
      hasMore: pagination.currentPage < pagination.totalPages,
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['tutorials', categories],
      queryFn: fetchTutorials,
      getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPage : undefined),
      initialPageParam: 1,
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries?.[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const tutorials = data?.pages.flatMap((page) => page.tutorials) ?? [];

  return (
    <div className="relative">
      {/* Header and Search bar */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold flex-1">All Tutorials</h1>
        {/* <input
          type="text"
          placeholder="Search tutorials..."
          className={clsx(
            'w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[15rem]',
            isMobile && 'hidden',
          )}
        /> */}
      </div>
      <div className="flex flex-col gap-y-6">
        {isLoading && Array.from([1, 2, 3, 4, 5]).map((_, i) => <ListItemSkeleton key={i} />)}
        {isError && <p>Failed to load tutorials.</p>}
        {tutorials.map((tutorial: any) => (
          <TutorialCard
            key={tutorial.id}
            title={tutorial.title}
            description={tutorial.description}
            chapters={tutorial._count.chapters}
            slug={tutorial.slug}
            topicSlug={tutorial?.chapters?.[0]?.topics?.[0]?.slug}
            publishedAt={new Date(tutorial.createdAt).toDateString()}
            tags={tutorial.categories.map((c: any) => c.category.name)}
          />
        ))}
        <div ref={observerRef} className="h-12" />
        {isFetchingNextPage && <p className="text-center">Loading more tutorials...</p>}
      </div>
    </div>
  );
}
