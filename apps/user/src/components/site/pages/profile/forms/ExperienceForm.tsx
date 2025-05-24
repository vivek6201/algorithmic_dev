'use client';

import React from 'react';
import { UserDataType } from '@/helpers/main/userDataGetter';

type Props = {
  profile: NonNullable<UserDataType>['profile'];
};

export default function ExperienceForm({ profile }: Props) {
  if (!profile) return <p>No experience data available.</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Experience</h2>
      {profile.experienceDetails.map((exp, index) => (
        <div key={index} className="mb-4 p-3 border rounded"></div>
      ))}
    </div>
  );
}
