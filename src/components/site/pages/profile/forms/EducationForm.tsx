'use client';

import React from 'react';
import { UserDataType } from '@/helpers/main/userDataGetter';

type Props = {
  profile: NonNullable<UserDataType>['profile'];
};

export default function EducationForm({ profile }: Props) {
  if (!profile) return <p>No education data available.</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Education</h2>
      {profile.educationDetails.map((edu, index) => (
        <div key={index} className="mb-4 p-3 border rounded"></div>
      ))}
    </div>
  );
}
