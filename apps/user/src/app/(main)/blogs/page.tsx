import BlogsFilters from '@/components/site/pages/blogs/BlogsFilters';
import BlogsList from '@/components/site/pages/blogs/BlogsList';
import { getClientBlogsCategories } from '@/helpers/main/blogGetter';
import { Metadata } from 'next';
import React from 'react';

const blogDesc =
  'Explore our collection of programming tutorials, tech insights, and development guides. Find articles on algorithms, web development, software engineering, and the latest technology trends to enhance your coding skills.';

export const metadata: Metadata = {
  title: 'Blogs - Algorithmic Dev',
  openGraph: {
    type: 'book',
    locale: 'en-US',
    countryName: 'India',
    description: blogDesc,
  },
  description: blogDesc,
  applicationName: 'AlgorithmicDev',
};

export const revalidate = 120;

export default async function page() {
  const { data: categories } = await getClientBlogsCategories();

  return (
    <div className="w-11/12 max-w-[1400px] mx-auto mt-24 min-h-screen">
      <div className="lg:hidden">
        <BlogsFilters data={categories ?? []} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5 w-full xl:px-0 mx-auto mb-5">
        {/* Left Sidebar: Filters for Desktop */}
        <aside className="space-y-4 hidden lg:block w-full h-fit self-start sticky top-24">
          <div className="rounded-2xl p-4 shadow-md border dark:bg-neutral-900">
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
