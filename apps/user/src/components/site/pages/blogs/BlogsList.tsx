'use client';

import React, { useCallback, useRef } from 'react';
import BlogCard from './BlogCard';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';

const LIMIT = 10;

function BlogsList() {
  const searchParams = useSearchParams();
  const categories = searchParams.get('category');

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
    <div className="flex flex-col gap-y-6">
      {isLoading && <p>Loading Blogs...</p>}
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
  );
}

export default BlogsList;
