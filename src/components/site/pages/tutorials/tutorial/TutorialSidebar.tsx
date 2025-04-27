"use client";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import React from "react";

export default function TutorialSidebar({
  data,
  topicSlug,
}: {
  data: any;
  topicSlug: string | null;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const navigate = (to: string) => {
    const pathParts = pathname.split("/");
    if (topicSlug) {
      pathParts.splice(-1, 1, to);
      const newPath = pathParts.join("/");
      router.replace(newPath);
    } else {
      pathParts.push(to);
      const newPath = pathParts.join("/");
      router.push(newPath);
    }
  };

  console.log({ data });

  return (
    <div className="h-[800px] w-[250px] pt-2 overflow-y-auto">
      <div className="flex flex-col gap-y-5">
        {data.map((chapter) => (
          <div key={chapter.id}>
            <p className="font-medium">{chapter.title}</p>
            <div className="flex flex-col gap-y-1 my-4">
              {chapter.topics.map((topic) => (
                <div
                  onClick={() => navigate(topic.slug)}
                  key={topic.id}
                  className={cn(
                    "flex gap-2 items-center text-sm max-w-11/12 mb-1 hover:bg-gray-100 dark:hover:bg-neutral-900 rounded-md px-2 cursor-pointer duration-150 transition-colors group py-1.5",
                    topicSlug === topic.slug
                      ? "bg-gray-200 dark:bg-neutral-800"
                      : ""
                  )}
                >
                  <BookOpen size={14} />
                  <p
                    className={cn(
                      "opacity-70 group-hover:opacity-100 duration-150 transition-opacity",
                      topicSlug === topic.slug ? "opacity-100" : ""
                    )}
                  >
                    {topic.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
