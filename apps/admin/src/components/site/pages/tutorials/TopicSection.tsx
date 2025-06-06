'use client';
import { useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';
import TopicForm from './TopicForm';
import { Button } from '@repo/ui/components/ui/button';
import { Trash2 } from '@repo/ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/ui/select';
import { updateTutorialTopicStatus } from '@/actions/tutorials/publish';
import { toast } from '@repo/ui/components/ui/sonner';
import { deleteTutorialTopic } from '@/actions/tutorials/topics';
import { useRouter } from 'nextjs-toploader/app';

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
        published: boolean;
        createdAt: Date;
        updatedAt: Date;
      }
    | null
    | undefined;
}) {
  const searchParams = useSearchParams();
  const [publishedStatus, setPublishedStatus] = React.useState(
    topic?.published ? 'publish' : 'draft',
  );
  const router = useRouter();

  const handleStatusChange = async (value: string) => {
    try {
      const { message, success } = await updateTutorialTopicStatus(
        topic?.id ?? '',
        value === 'publish',
      );

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success(message);
      setPublishedStatus(value);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  };

  const handleDeleteTopic = useCallback(async () => {
    try {
      const { message, success } = await deleteTutorialTopic(topic?.id ?? '');

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success(message);

      // Clone the search params (since useSearchParams is read-only)
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('chapterSlug');
      newParams.delete('topicSlug');

      const queryString = newParams.toString();
      const newUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ''}`;

      window.location.replace(newUrl);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  }, [topic?.id, router, searchParams]);

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
      <div className="flex justify-between items-center mb-5">
        <p className="font-semibold text-2xl ">{topicSlug ? 'Edit Topic' : 'Create Topic'}</p>
        <div className="flex items-center gap-2">
          <Select value={publishedStatus} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="publish">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Button size={'icon'} variant={'destructive'} onClick={handleDeleteTopic}>
            <Trash2 />
          </Button>
        </div>
      </div>
      <TopicForm isEdit={topicSlug ? true : false} slug={chapterSlug} topic={topic} />
    </div>
  );
}
