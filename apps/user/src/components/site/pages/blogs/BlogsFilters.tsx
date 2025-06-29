'use client';

import { useIsMobile } from '@repo/ui/hooks/use-mobile';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import React, { useEffect } from 'react';
import DrawerFilter from '../../shared/DrawerFilter';
import { useFilterStore } from '@/store/filterStore';
import FilterButtonGroup from '../../shared/FilterButtonGroup';
import { blogTabs } from '@/lib/constants';
import { updateParams } from '@/lib/clientUtils';

interface CategoryType {
  name: string;
  id: string;
  slug: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogsFilters = ({ data }: { data: CategoryType[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile(1024);
  const { setTabs, activeTab } = useFilterStore();

  useEffect(() => {
    setTabs(blogTabs);
  }, [setTabs]);

  const selected = searchParams.get('category')?.split(',') ?? [];

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('category');
    router.replace(`?${params.toString()}`);
  };

  if (isMobile) {
    return (
      <div className="">
        <DrawerFilter>
          {activeTab?.label === 'category' && (
            <FilterButtonGroup
              items={data.map((cat) => ({ name: cat.name, value: cat.slug }))}
              selectedValues={selected}
              onToggle={(val) => updateParams('category', val, searchParams, router)}
            />
          )}
        </DrawerFilter>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-sm">
      <div className="">
        <h3 className="font-semibold mb-2 dark:text-white">Categories</h3>
        <FilterButtonGroup
          items={data.map((cat) => ({ name: cat.name, value: cat.slug }))}
          selectedValues={selected}
          onToggle={(val) => updateParams('category', val, searchParams, router)}
        />
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

export default BlogsFilters;
