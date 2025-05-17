'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import EducationForm from './forms/EducationForm';
import ProjectsForm from './forms/ProjectsForm';
import ExperienceForm from './forms/ExperienceForm';
import { UserDataResponseType, UserDataType } from '@/helpers/main/userDataGetter';

const tabs = [
  { name: 'Education', component: EducationForm },
  { name: 'Projects', component: ProjectsForm },
  { name: 'Experience', component: ExperienceForm },
];

export default function ProfileClientRight({ data: userData }: UserDataResponseType) {
  const [currentTab, setCurrentTab] = useState<string>(tabs[0].name);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (tabs.some((tab) => tab.name === hash)) {
      setCurrentTab(hash);
    }
  }, []);

  const handleTabChange = (tabName: string) => {
    setCurrentTab(tabName);
    const url = new URL(window.location.href);
    url.hash = tabName === 'Education' ? '' : `#${tabName}`;
    window.history.replaceState(null, '', url.toString());
  };

  const renderCurrentTab = (data: UserDataType) => {
    const matchedTab = tabs.find((tab) => tab.name === currentTab);
    if (!matchedTab) return null;
    const Component = matchedTab.component;
    return <Component profile={data?.profile ?? null} />;
  };

  return (
    <div className="w-full h-full border rounded-md overflow-hidden">
      <div className="flex items-center justify-between border-b">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => handleTabChange(tab.name)}
            className={cn(
              'flex items-center justify-center px-5 w-full py-4 cursor-pointer border-r transition-colors duration-200',
              'hover:bg-gray-100 dark:hover:bg-neutral-900',
              currentTab === tab.name
                ? 'bg-gray-100 text-black font-semibold dark:bg-neutral-900 dark:text-white'
                : 'text-gray-500 dark:text-gray-400',
            )}
            aria-current={currentTab === tab.name ? 'true' : 'false'}
          >
            <p className="truncate">{tab.name}</p>
          </button>
        ))}
      </div>
      <div className="p-5">{renderCurrentTab(userData)}</div>
    </div>
  );
}
