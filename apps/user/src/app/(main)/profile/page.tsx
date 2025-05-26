import EducationBlock from '@/components/site/pages/profile/education/EducationBlock';
import ProjectBlock from '@/components/site/pages/profile/project/ProjectBlock';
import UserBlock from '@/components/site/pages/profile/user/UserBlock';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Profile - Algorithmic Dev',
  description:
    'A One-Stop Solution for all your tech related queries. Be it Jobs, tutorials, courses, blogs, helper mini apps',
};

export default async function page() {
  return (
    <div className="max-w-[1400px] flex flex-col gap-y-5 px-5">
      <UserBlock />
      <EducationBlock />
      <ProjectBlock />
    </div>
  );
}
