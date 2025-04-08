import React from "react";
import { BookIcon, ClockIcon } from "lucide-react";

type Props = {
  title: string;
  description: string;
  chapters: number;
  duration: string;
  difficulty: string;
  language: string;
  author: string;
  publishedAt: string;
  tags: string[];
};

const TutorialCard = ({
  title,
  description,
  chapters,
  duration,
  difficulty,
  language,
  author,
  publishedAt,
  tags,
}: Props) => {
  return (
    <div className="border rounded-2xl p-5 shadow-sm hover:shadow-md transition dark:border-neutral-700 dark:bg-neutral-900">
      <h2 className="text-2xl font-bold mb-2 dark:text-white">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 text-sm mb-3">
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-full">
          {language}
        </span>
        <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200 rounded-full">
          {difficulty}
        </span>
        <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 rounded-full flex items-center gap-1">
          <BookIcon size={14} /> {chapters} Chapters
        </span>
        <span className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 rounded-full flex items-center gap-1">
          <ClockIcon size={14} /> {duration}
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
        <span>{publishedAt}</span>
      </div>
    </div>
  );
};

export default TutorialCard;
