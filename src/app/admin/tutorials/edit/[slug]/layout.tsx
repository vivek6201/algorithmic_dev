import ChapterList from "@/components/site/pages/admin/tutorials/ChapterList";
import { getTutorialChapters } from "@/helpers/admin/getter";
import React, { ReactNode } from "react";

export default async function TutorialLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await getTutorialChapters(slug);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 h-[calc(100vh-9%)]">
      <div className="rounded-md border bg-neutral-800 p-5 h-full">
        <ChapterList chapters={data?.chapters} />
      </div>
      <div className="rounded-md border bg-neutral-800 p-5">{children}</div>
    </div>
  );
}
