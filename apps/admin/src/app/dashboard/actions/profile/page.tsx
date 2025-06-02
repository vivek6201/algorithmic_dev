import PersonalInfo from '@/components/site/pages/auth/PersonalInfo';
import ResetPass from '@/components/site/pages/auth/ResetPass';
import React from 'react';

export default function page() {
  return (
    <div className="flex flex-col gap-y-5">
      <h2 className="text-2xl mb-5 font-bold">My Profile</h2>
      <PersonalInfo />
      <ResetPass />
    </div>
  );
}
