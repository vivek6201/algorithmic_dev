import React from 'react';
import { ArrowRight, BookIcon } from '@repo/ui';
import { Button } from '@repo/ui/components/ui/button';
import { useRouter } from 'nextjs-toploader/app';
import { usePathname } from 'next/navigation';
import { TutorialWithRelations } from '@/app/api/tutorials/route';

interface TutorialCardProps extends TutorialWithRelations {
  topicSlug: string;
  tags: string[];
}

const TutorialCard = ({
  title,
  slug,
  topicSlug,
  tags,
  description,
  chapters,
  createdAt,
}: TutorialCardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="border rounded-2xl p-5 shadow-sm hover:shadow-md transition dark:border-neutral-700 dark:bg-neutral-900">
      <div
        className="flex justify-between items-center group mb-2 cursor-pointer"
        onClick={() => router.push(`${pathname}/${slug}/${encodeURIComponent(topicSlug)}`)}
      >
        <h2 className="text-2xl font-bold mb-2 dark:text-white group-hover:cursor-pointer group-hover:underline">
          {title}
        </h2>
        <Button variant={'ghost'} className="cursor-pointer">
          <ArrowRight className="group-hover:translate-x-1.5 duration-150 transition-transform" />
        </Button>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{description}</p>

      <div className="flex flex-wrap gap-2 text-sm mb-3">
        <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 rounded-full flex items-center gap-1">
          <BookIcon size={14} /> {chapters.length} Chapters
        </span>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2 max-w-[50%]">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        <span>{new Date(createdAt).toDateString()}</span>
      </div>
    </div>
  );
};

export default TutorialCard;
