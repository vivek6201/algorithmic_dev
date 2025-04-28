import TutorialsFilters from '@/components/site/pages/tutorials/TutorialsFilters';
import TutorialsList from '@/components/site/pages/tutorials/TutorialsList';
import { getClientTutorialsCategories } from '@/helpers/main/tutorialGetter';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tutorials - Algorithmic Dev',
  description:
    'A One-Stop Solution for all your tech related queries. Be it Jobs, tutorials, courses, blogs, helper mini apps',
};

export default async function TutorialsPage() {
  const { data: categories } = await getClientTutorialsCategories();

  return (
    <div className="w-full max-w-[1400px] mx-auto mt-5 min-h-screen px-4">
      <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_2.4fr_0.8fr] gap-6">
        {/* Left Sidebar - Filters (non-sticky) */}
        <aside className="space-y-4 hidden lg:block">
          <div className="p-4 rounded-2xl shadow-md border dark:bg-neutral-900">
            <h2 className="text-xl font-semibold mb-4">Filter Tutorials</h2>
            <TutorialsFilters data={categories ?? []} />
          </div>
        </aside>

        {/* Center Content */}
        <main className="space-y-4">
          {/* Header and Search bar */}
          <div className="flex justify-between items-center px-4">
            <h1 className="text-2xl font-bold flex-1">All Tutorials</h1>
            <input
              type="text"
              placeholder="Search tutorials..."
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[15rem]"
            />
          </div>

          {/* Tutorials List */}
          <div className="p-4">
            <TutorialsList />
          </div>
        </main>

        {/* Right Sidebar - Ads or Highlights (can still be sticky if you want) */}
        <aside className="space-y-4 hidden lg:block">
          <div className="p-4 rounded-2xl shadow-md border text-center dark:bg-neutral-900">
            <p className="text-lg font-semibold">Featured</p>
            <div className="h-48 mt-4 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <span className="text-gray-500">Ad or Highlights</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
