'use client';

import React, { useCallback, useRef } from 'react';
import BlogCard from './BlogCard';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useIsMobile } from '@repo/ui/hooks/use-mobile';
import { clsx } from '@repo/ui';
import { Skeleton } from '@repo/ui/components/ui/skeleton';
import ListItemSkeleton from '../../shared/ListItemSkeleton';

const LIMIT = 10;

function BlogsList() {
  const searchParams = useSearchParams();
  const categories = searchParams.get('category');
  const isMobile = useIsMobile();

  const fetchBlogs = async ({ pageParam = 1 }) => {
    const response = await axios.get('/api/blogs', {
      params: {
        category: categories ?? undefined,
        page: pageParam,
        limit: LIMIT,
      },
    });

    return {
      blogs: response.data?.data ?? [],
      nextPage: response.data?.data?.length === LIMIT ? pageParam + 1 : null,
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['blogs', categories],
      queryFn: fetchBlogs,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 1,
    });

  const observer = useRef<IntersectionObserver | null>(null);

  const lastBlogRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries?.[0]?.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  const blogs = data?.pages.flatMap((page) => page.blogs) ?? [];

  return (
    <div className="relative">
      {/* Header and Search bar */}
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold mb-2 flex-1">All Blogs</h1>
        {/* <input
          type="text"
          placeholder="Search blogs..."
          className={clsx(
            'w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[15rem]',
            isMobile && 'hidden',
          )}
        /> */}
      </div>
      <div className="flex flex-col gap-y-6">
        {isLoading && (
          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <ListItemSkeleton key={i} />
            ))}
          </div>
        )}
        {isError && <p>Failed to load Blogs.</p>}
        {!isLoading && blogs.length > 0
          ? blogs.map((blog: any, index: number) => {
              const isLast = index === blogs.length - 1;
              return (
                <div ref={isLast ? lastBlogRef : null} key={blog.id}>
                  <BlogCard
                    title={blog.title}
                    description={blog.description}
                    author={blog.authorName}
                    category={blog.category.name}
                    date={blog.updatedAt}
                    slug={blog.slug}
                  />
                </div>
              );
            })
          : !isLoading && <p>No Blogs found</p>}
        {isFetchingNextPage && <p>Loading more blogs...</p>}
      </div>
    </div>
  );
}

export default BlogsList;
