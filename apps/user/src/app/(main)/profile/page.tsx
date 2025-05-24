import ProfileClientLeft from '@/components/site/pages/profile/ProfileClientLeft';
import ProfileClientRight from '@/components/site/pages/profile/ProfileClientRight';
import { getUserData } from '@/helpers/main/userDataGetter';
import { auth } from '@/lib/auth';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Profile - Algorithmic Dev',
  description:
    'A One-Stop Solution for all your tech related queries. Be it Jobs, tutorials, courses, blogs, helper mini apps',
};

export default async function page() {
  const authData = await auth();
  const userData = await getUserData(authData?.user?.email ?? '');

  return (
    <div className="max-w-[1400px] py-5 h-[850px] mx-auto grid grid-cols-1 md:grid-cols-[25%_1fr] gap-5">
      <ProfileClientLeft {...userData} />
      <ProfileClientRight {...userData} />
    </div>
  );
}
