'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFilterStore } from '@/store/filterStore';
import { tutorialFilterTabs } from '@/lib/constants';
import { useIsMobile } from '@repo/ui/hooks';
import DrawerFilter from '../../shared/DrawerFilter';
import FilterButtonGroup from '../../shared/FilterButtonGroup';
import { updateParams } from '@/lib/clientUtils';

interface CategoryType {
  name: string;
  id: string;
  slug: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TutorialFilters = ({ data }: { data: CategoryType[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setTabs, activeTab } = useFilterStore();
  const isMobile = useIsMobile(1024);

  useEffect(() => {
    setTabs(tutorialFilterTabs);
  }, [setTabs]);
  const selected = searchParams.get('category')?.split(',') ?? [];

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('category');
    router.replace(`?${params.toString()}`);
  };

  if (isMobile) {
    return (
      <DrawerFilter>
        {activeTab?.label === 'category' && (
          <FilterButtonGroup
            items={data.map((cat) => ({ name: cat.name, value: cat.slug }))}
            selectedValues={selected}
            onToggle={(val) => updateParams('category', val, searchParams, router)}
          />
        )}
      </DrawerFilter>
    );
  }

  return (
    <div className="space-y-6 text-sm">
      <div>
        <h3 className="font-semibold mb-2 dark:text-white">Categories</h3>
        <div className="flex flex-wrap gap-2">
          <FilterButtonGroup
            items={data.map((cat) => ({ name: cat.name, value: cat.slug }))}
            selectedValues={selected}
            onToggle={(val) => updateParams('category', val, searchParams, router)}
          />
        </div>

        {selected.length > 0 && (
          <button
            onClick={clearFilters}
            className="mt-4 text-sm px-4 py-1 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default TutorialFilters;
