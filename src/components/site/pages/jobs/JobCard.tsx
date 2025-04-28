import { Button } from "@/components/ui/button";
import { JobCategory, Jobs } from "@/generated/prisma";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type JobCardProps = { job: Jobs; categories: JobCategory[] };

const JobCard = ({ job, categories }: JobCardProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={`${pathname}/${job?.slug}`}
      className="border rounded-xl p-5 bg-white dark:bg-zinc-900 shadow-sm group hover:shadow-md cursor-pointer transition min-h-[100px] flex flex-col gap-y-5"
    >
      <div>
        <div className="max-w-[60%] flex gap-2 flex-wrap mb-2">
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
          {job.title}
        </h2>
        <div className="flex gap-x-2 items-center mt-2">
          <Badge title={job.type} />
          <Badge title={job.experienceLevel.split("_").join(" ")} />
          <Badge title={job.salaryRange} />
        </div>
      </div>

      <div className="w-full justify-between flex gap-2 items-center ">
        <span className="text-xs text-gray-500">
          {new Date(job.createdAt).toDateString()}
        </span>

        <Button className="cursor-pointer">
          View More <ChevronRight />
        </Button>
      </div>
    </Link>
  );
};

export default JobCard;

function Badge({ title }: { title: string }) {
  return (
    <div className="rounded-full dark:bg-gray-200 bg-black/80 px-4 py-1">
      <p className="text-xs dark:text-black text-white">{title}</p>
    </div>
  );
}
