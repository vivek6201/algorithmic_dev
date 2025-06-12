import BlogsFilters from '@/components/site/pages/blogs/BlogsFilters';
import BlogsList from '@/components/site/pages/blogs/BlogsList';
import DrawerFilter from '@/components/site/shared/DrawerFilter';
import { getClientBlogsCategories } from '@/helpers/main/blogGetter';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Blogs - Algorithmic Dev',
  description:
    'A One-Stop Solution for all your tech related queries. Be it Jobs, tutorials, courses, blogs, helper mini apps',
};

export const revalidate = 60;

export default async function page() {
  const { data: categories } = await getClientBlogsCategories();

  return (
    <div className="w-11/12 max-w-[1400px] mx-auto mt-24 min-h-screen">
      <div className="lg:hidden">
        <BlogsFilters data={categories ?? []} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5 w-full px-5 xl:px-0 mx-auto">
        {/* Left Sidebar: Filters for Desktop */}
        <aside className="space-y-4 hidden lg:block w-full h-fit self-start sticky top-24">
          <div className="p-4 rounded-2xl shadow-md border dark:bg-neutral-900">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <BlogsFilters data={categories ?? []} />
          </div>
        </aside>

        {/* Center Content: Blogs List */}
        <main className="space-y-4">
          <div className="md:p-4">
            <BlogsList />
          </div>
        </main>
      </div>
    </div>
  );
}
