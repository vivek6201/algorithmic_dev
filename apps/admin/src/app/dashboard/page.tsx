import NavigationCard from '@/components/site/pages/dashboard/NavigationCard';
import React from 'react';

export default function page() {
  return (
    <div>
      <h2 className="text-xl font-bold">Admin Panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        <NavigationCard name={'Jobs'} link={'/dashboard/jobs'} />
        <NavigationCard name={'Tutorials'} link={'/dashboard/tutorials'} />
        <NavigationCard name={'Blogs'} link={'/dashboard/blogs'} />
        <NavigationCard name={'Action'} link={'/dashboard/actions'} />
      </div>
    </div>
  );
}
