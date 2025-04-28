import ChapterList from "@/components/site/pages/admin/tutorials/ChapterList";
import TopicSection from "@/components/site/pages/admin/tutorials/TopicSection";
import { getTutorialChaptersWithTopics } from "@/helpers/admin/getter";
import React from "react";

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const { topicSlug, chapterSlug } = await searchParams;
  const { data } = await getTutorialChaptersWithTopics(slug);

  let topicData = null;

  if (topicSlug) {
    const chapterData = data?.chapters.find(
      (item) => item.slug === chapterSlug,
    );
    topicData = chapterData?.topics.find((topic) => topic.slug === topicSlug);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 h-[calc(100vh-9%)]">
      <div className="rounded-md border bg-gray-100/30 dark:bg-neutral-800/60 py-5 px-4 h-full">
        <ChapterList chapters={data?.chapters ?? []} tutorialSlug={slug} />
      </div>
      <div className="rounded-md border bg-gray-100/30 dark:bg-neutral-800/60 p-5 h-full w-full overflow-y-auto">
        <TopicSection topic={topicData} />
      </div>
    </div>
  );
}
