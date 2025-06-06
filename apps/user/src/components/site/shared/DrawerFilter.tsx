'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@repo/ui/components/ui/drawer';
import { Button } from '@repo/ui/components/ui/button';
import { clsx, Filter } from '@repo/ui';
import { useFilterStore } from '@/store/filterStore';

export default function DrawerFilter({ children }: { children: ReactNode }) {
  const { tabs, setActiveTab, activeTab } = useFilterStore();

  useEffect(() => {
    if (tabs.length > 0 && tabs[0]) setActiveTab(tabs[0]);
  }, []);

  return (
    <div className="block lg:hidden mb-4">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant={'secondary'} className="flex items-center">
            <Filter />
            Filters
          </Button>
        </DrawerTrigger>
        <DrawerContent className="pb-8">
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
          </DrawerHeader>
          <div>
            <div className="flex w-full p-2 border-b gap-2 items-center">
              {tabs.map((it) => {
                return (
                  <button
                    key={it.id}
                    onClick={() => setActiveTab(it)}
                    className={clsx(
                      'px-3 text-sm py-1 capitalize rounded-full border cursor-pointer transition-colors',
                      activeTab === it
                        ? 'bg-blue-500 text-white dark:bg-blue-600 border-blue-500'
                        : 'hover:bg-blue-100 dark:hover:bg-blue-700 dark:text-gray-300 border dark:border-gray-600',
                    )}
                  >
                    {it.label}
                  </button>
                );
              })}
            </div>
            <div className="my-5 mx-2">{children}</div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
