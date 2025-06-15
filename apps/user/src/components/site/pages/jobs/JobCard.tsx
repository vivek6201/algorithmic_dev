'use client';
import { Button } from '@repo/ui/components/ui/button';
import { JobCategory } from '@repo/db';
import { ChevronRight } from '@repo/ui';
import Link from 'next/link';
import { JobWithCategories } from '@/types/main';

type JobCardProps = { job: JobWithCategories; categories: JobCategory[] };

const JobCard = ({ job, categories }: JobCardProps) => {
  return (
    <Link
      href={`/jobs/${job?.slug}`}
      className="border rounded-xl p-3 md:p-5 bg-white dark:bg-zinc-900 shadow-sm group hover:shadow-md cursor-pointer transition min-h-[100px] flex flex-col gap-y-5"
    >
      <div>
        <div className="flex gap-2 mb-2 overflow-x-auto w-full">
          {categories.map((category) => (
            <span
              className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full inline-block"
              key={category.id}
            >
              {category.name}
            </span>
          ))}
        </div>

        <h2 className="text-xl font-semibold group-hover:underline">
          {job.companyName} is hiring for {job.position} | {job.location}
        </h2>
        <div className="flex gap-x-2 items-center mt-2">
          <Badge title={job.type} />
          <Badge title={job.experienceLevel.toLowerCase().split('_').join(' ')} />
          <Badge title={job.salaryRange} />
        </div>
      </div>

      <div className="w-full justify-between flex gap-2 items-center ">
        <span className="text-xs text-gray-500">{new Date(job.createdAt).toDateString()}</span>

        <Button className="cursor-pointer" size={'sm'}>
          View More <ChevronRight />
        </Button>
      </div>
    </Link>
  );
};

export default JobCard;

export function Badge({ title }: { title: string }) {
  return (
    <div className="rounded-full dark:bg-gray-200 bg-black/80 px-2 py-1">
      <p className="text-xs dark:text-black text-white">{title}</p>
    </div>
  );
}
