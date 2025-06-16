import JobFilters from '@/components/site/pages/jobs/JobsFilter';
import JobListings from '@/components/site/pages/jobs/JobsListing';
import { getClientJobCategories } from '@/helpers/main/jobsGetter';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Jobs - Algorithmic Dev',
  category: 'Tech Jobs',
  description:
    'Discover top tech job opportunities across various categories. Browse software engineering, data science, DevOps, and other technology roles with advanced filtering options to find your perfect match.',
};

export const revalidate = 120;

export default async function JobsPage() {
  const jobCategories = await getClientJobCategories();

  return (
    <div className="w-11/12 max-w-[1400px] mx-auto mt-24 min-h-screen md:px-4">
      {/* Mobile Filters */}
      <div className="lg:hidden">
        <JobFilters data={jobCategories.data ?? []} />
      </div>

      {/* Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 mb-5">
        {/* Sticky Left Sidebar Filters */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 z-10 p-4 rounded-2xl shadow-md border bg-white dark:bg-neutral-900">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <JobFilters data={jobCategories.data ?? []} />
          </div>
        </aside>

        {/* Job Listings */}
        <main className="space-y-4">
          <div className="md:p-4">
            <JobListings />
          </div>
        </main>
      </div>
    </div>
  );
}
