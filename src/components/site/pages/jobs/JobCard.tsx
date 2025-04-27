import { Button } from "@/components/ui/button";
import { Jobs } from "@/generated/prisma";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type JobCardProps = Jobs;

const JobCard = ({
  title,
  type,
  experienceLevel,
  slug,
  createdAt,
  link,
}: JobCardProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={`${pathname}/${slug}`}
      className="border rounded-xl p-5 bg-white dark:bg-zinc-900 shadow-sm group hover:shadow-md cursor-pointer transition min-h-[100px] flex flex-col gap-y-5"
    >
      <div>
        <h2 className="text-xl font-semibold group-hover:underline">{title}</h2>
        <div className="flex gap-x-2 items-center mt-2">
          <Badge title={type} />
          <Badge title={experienceLevel.split("_").join(" ")} />
        </div>
      </div>

      <div className="w-full justify-between flex gap-2 items-center ">
        <span className="text-xs text-gray-500">
          {new Date(createdAt).toDateString()}
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
