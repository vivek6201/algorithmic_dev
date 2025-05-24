import JobsForm from '@/components/site/pages/jobs/JobsForm';
import React from 'react';

export default function page() {
  return (
    <div className="flex flex-col gap-y-5">
      <p className="font-bold text-2xl">Create Job</p>
      <JobsForm />
    </div>
  );
}
