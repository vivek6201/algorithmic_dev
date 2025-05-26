import JobFilters from '@/components/site/pages/jobs/JobsFilter';
import JobListings from '@/components/site/pages/jobs/JobsListing';
import { getClientJobCategories } from '@/helpers/main/jobsGetter';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Jobs - Algorithmic Dev',
  description:
    'A One-Stop Solution for all your tech related queries. Be it Jobs, tutorials, courses, blogs, helper mini apps',
};

export const revalidate = 60;

export default async function JobsPage() {
  const jobCategories = await getClientJobCategories();
  return (
    <div className="w-11/12 max-w-[1400px] mx-auto mt-24 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] md:px-0">
        {/* Left Sidebar: Filters */}
        <aside className="space-y-4 hidden lg:block">
          <div className="py-4 md:p-4 rounded-2xl shadow-md border dark:bg-neutral-900">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <JobFilters data={jobCategories.data ?? []} />
          </div>
        </aside>

        {/* Center Content: Job Listings */}
        <main className="space-y-2 md:mx-6">
          {/* Header and Search bar */}
          <div className="flex justify-between p-4">
            <h1 className="text-2xl font-bold flex-1">All Jobs</h1>
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[15rem]"
            />
          </div>

          {/* Jobs List */}
          <div className="md:p-4">
            <JobListings />
          </div>
        </main>
      </div>
    </div>
  );
}
