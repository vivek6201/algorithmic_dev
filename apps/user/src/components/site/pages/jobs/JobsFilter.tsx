'use client';

import { useIsMobile } from '@repo/ui/hooks/use-mobile';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import DrawerFilter from '../../shared/DrawerFilter';
import { useFilterStore } from '@/store/filterStore';
import { useEffect } from 'react';
import FilterButtonGroup from '../../shared/FilterButtonGroup';
import { jobExperience, jobTabs, jobTypes } from '@/lib/constants';
import { updateParams } from '@/lib/clientUtils';

interface CategoryType {
  name: string;
  id: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const JobFilters = ({ data }: { data: CategoryType[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile(1024);
  const { setTabs, activeTab } = useFilterStore();

  useEffect(() => {
    setTabs(jobTabs);
  }, [setTabs]);

  const selectedCategories = searchParams.get('category')?.split(',') ?? [];
  const selectedJobTypes = searchParams.get('type')?.split(',') ?? [];
  const selectedExperience = searchParams.get('experience')?.split(',') ?? [];

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    jobTabs.forEach((key) => params.delete(key.label));
    router.replace(`?${params.toString()}`);
  };

  if (isMobile) {
    return (
      <DrawerFilter>
        {activeTab?.label === 'category' && (
          <FilterButtonGroup
            items={data.map((cat) => ({ name: cat.name, value: cat.slug }))}
            selectedValues={selectedCategories}
            onToggle={(val) => updateParams('category', val, searchParams, router)}
          />
        )}
        {activeTab?.label === 'type' && (
          <FilterButtonGroup
            items={jobTypes}
            selectedValues={selectedJobTypes}
            onToggle={(val) => updateParams('type', val, searchParams, router)}
          />
        )}
        {activeTab?.label === 'experience' && (
          <FilterButtonGroup
            items={jobExperience}
            selectedValues={selectedExperience}
            onToggle={(val) => updateParams('experience', val, searchParams, router)}
          />
        )}
      </DrawerFilter>
    );
  }

  return (
    <aside className="space-y-6 text-sm">
      <div>
        <h3 className="font-semibold text-lg mb-2">Category</h3>
        <FilterButtonGroup
          items={data.map((cat) => ({ name: cat.name, value: cat.slug }))}
          selectedValues={selectedCategories}
          onToggle={(val) => updateParams('category', val, searchParams, router)}
        />
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-2">Job Type</h3>
        <FilterButtonGroup
          items={jobTypes}
          selectedValues={selectedJobTypes}
          onToggle={(val) => updateParams('type', val, searchParams, router)}
        />
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-2">Experience</h3>
        <FilterButtonGroup
          items={jobExperience}
          selectedValues={selectedExperience}
          onToggle={(val) => updateParams('experience', val, searchParams, router)}
        />
      </div>

      {(selectedCategories.length > 0 ||
        selectedJobTypes.length > 0 ||
        selectedExperience.length > 0) && (
        <button
          onClick={clearFilters}
          className="mt-4 text-sm px-4 py-1 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
        >
          Clear Filters
        </button>
      )}
    </aside>
  );
};

export default JobFilters;
