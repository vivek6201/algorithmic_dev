'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import TopicForm from './TopicForm';

export default function TopicSection({
  topic,
}: {
  topic:
    | {
        id: string;
        title: string;
        slug: string;
        content: string;
        order: number;
        chapterId: string;
        createdAt: Date;
        updatedAt: Date;
      }
    | null
    | undefined;
}) {
  const searchParams = useSearchParams();

  const chapterSlug = searchParams.get('chapterSlug');
  const topicSlug = searchParams.get('topicSlug');

  if (!chapterSlug)
    return (
      <div className="w-full h-full flex items-center justify-center flex-col">
        <p>Welcome to Tutorial Builder</p>
        <p className="text-xs opacity-25">Edit any topic or create a topic</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-y-5 ">
      <p className="font-semibold text-2xl mb-5">{topicSlug ? 'Edit Topic' : 'Create Topic'}</p>
      <TopicForm isEdit={topicSlug ? true : false} slug={chapterSlug} topic={topic} />
    </div>
  );
}
