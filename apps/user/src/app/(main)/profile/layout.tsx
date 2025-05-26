import ProfileSidebar from '@/components/site/pages/profile/profileSidebar';
import ProfileContextProvider from '@/contexts/ProfileContext';
import React, { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ProfileContextProvider>
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-[800px] max-w-[1400px] mx-auto mt-24 mb-10">
        <div className="hidden md:block h-full w-full">
          <ProfileSidebar />
        </div>
        {children}
      </div>
    </ProfileContextProvider>
  );
}
