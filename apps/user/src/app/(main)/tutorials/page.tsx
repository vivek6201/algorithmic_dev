import TutorialsFilters from '@/components/site/pages/tutorials/TutorialsFilters';
import TutorialsList from '@/components/site/pages/tutorials/TutorialsList';
import FilterSidebarSkeleton from '@/components/site/shared/Skeletons/FilterSidebarSkeleton';
import { getClientTutorialsCategories } from '@/helpers/main/tutorialGetter';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Tutorials - Algorithmic Dev',
  description:
    'A One-Stop Solution for all your tech related queries. Be it Jobs, tutorials, courses, blogs, helper mini apps',
};

export const revalidate = 120;

export default async function TutorialsPage() {
  const { data: categories } = await getClientTutorialsCategories();

  return (
    <div className="w-full max-w-[1400px] mx-auto mt-24 min-h-screen md:px-4">
      {/* Mobile Filters */}
      <div className="lg:hidden px-4">
        <TutorialsFilters data={categories ?? []} />
      </div>

      {/* Grid layout with sidebar and main content */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        {/* Left Sidebar - Sticky Filters */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 z-10 p-4 rounded-2xl shadow-md border bg-white dark:bg-neutral-900">
            <h2 className="text-xl font-semibold mb-4">Filter Tutorials</h2>
            <TutorialsFilters data={categories ?? []} />
          </div>
        </aside>

        {/* Center Content */}
        <main className="space-y-4">
          <div className="p-4">
            <TutorialsList />
          </div>
        </main>
      </div>
    </div>
  );
}
