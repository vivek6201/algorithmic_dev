'use client';

import React from 'react';
import { UserDataType } from '@/helpers/main/userDataGetter';

type Props = {
  profile: NonNullable<UserDataType>['profile'];
};

export default function ProjectsForm({ profile }: Props) {
  if (!profile) return <p>No projects data available.</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Projects</h2>
      {profile.projects.map((project, index) => (
        <div key={index} className="mb-4 p-3 border rounded">
          <p>
            <strong>Name:</strong> {project.projectName}
          </p>
          <p>
            <strong>Description:</strong> {project.description}
          </p>
        </div>
      ))}
    </div>
  );
}
