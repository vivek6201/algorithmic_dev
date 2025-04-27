import JobsForm from "@/components/site/pages/admin/jobs/JobsForm";
import { getJobBySlug } from "@/helpers/admin/getter";
import React from "react";

interface JobPageProps {
  params: Promise<{ slug: string }>;
}

export default async function page({ params }: JobPageProps) {
  const { slug } = await params;
  const { success, data } = await getJobBySlug(slug);

  console.log({ data });

  if (!success || !data) return;

  return (
    <div className="flex flex-col gap-y-5">
      <p className="font-bold text-2xl">Edit Job</p>
      <JobsForm
        isEdit={true}
        job={{
          ...data,
          jobCategories: data.jobCategories.map((category) => ({
            ...category,
            description: category.description,
          })),
        }}
      />
    </div>
  );
}
