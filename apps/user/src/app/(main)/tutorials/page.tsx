import TutorialsFilters from '@/components/site/pages/tutorials/TutorialsFilters';
import TutorialsList from '@/components/site/pages/tutorials/TutorialsList';
import { getClientTutorialsCategories } from '@/helpers/main/tutorialGetter';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tutorials - Algorithmic Dev',
  description:
    'A One-Stop Solution for all your tech related queries. Be it Jobs, tutorials, courses, blogs, helper mini apps',
};

export const revalidate = 60;

export default async function TutorialsPage() {
  const { data: categories } = await getClientTutorialsCategories();

  return (
    <div className="w-full max-w-[1400px] mx-auto mt-24 min-h-screen px-4">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        {/* Left Sidebar - Filters (non-sticky) */}
        <aside className="space-y-4 hidden lg:block">
          <div className="p-4 rounded-2xl shadow-md border dark:bg-neutral-900">
            <h2 className="text-xl font-semibold mb-4">Filter Tutorials</h2>
            <TutorialsFilters data={categories ?? []} />
          </div>
        </aside>

        {/* Center Content */}
        <main className="space-y-4">
          {/* Tutorials List */}
          <div className="p-4">
            <TutorialsList />
          </div>
        </main>
      </div>
    </div>
  );
}
