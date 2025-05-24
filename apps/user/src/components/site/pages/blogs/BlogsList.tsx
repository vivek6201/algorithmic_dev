'use client';
import React from 'react';
import BlogCard from './BlogCard';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function BlogsList() {
  const searchParams = useSearchParams();
  const categories = searchParams.get('category');

  const fetchBlogs = async (categories: string | null) => {
    const response = await axios.get('/api/blogs', {
      params: { category: categories ?? undefined },
    });
    return response.data.data;
  };

  const {
    data: blogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['blogs', categories],
    queryFn: () => fetchBlogs(categories),
  });

  return (
    <div className="flex flex-col gap-y-6">
      {isLoading && <p>Loading tutorials...</p>}
      {isError && <p>Failed to load tutorials.</p>}
      {blogs?.map((blog: any) => {
        return (
          <BlogCard
            key={blog.id}
            title={blog.title}
            description={blog.description}
            author={blog.authorName}
            category={blog.category.name}
            date={blog.updatedAt}
            slug={blog.slug}
          />
        );
      })}
    </div>
  );
}

export default BlogsList;
