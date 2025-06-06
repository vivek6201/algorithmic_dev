'use client';

import React, { useMemo, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Plus, BookOpen, ChevronRight } from '@repo/ui';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@repo/ui/components/ui/alert-dialog';
import { Button } from '@repo/ui/components/ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@repo/ui/components/ui/accordion';
import HandleChapterModal from './HandleChapterModal';
import { deleteTutorialChapter } from '@/actions/tutorials/chapters';
import { toast } from '@repo/ui/components/ui/sonner';

export interface ChapterListProps {
  tutorialSlug: string;
  chapters: {
    id: string;
    title: string;
    slug: string;
    order: number;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    tutorialId: string;
    topics: {
      id: string;
      title: string;
      slug: string;
      content: string;
      order: number;
      chapterId: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
    _count: {
      topics: number;
    };
  }[];
}

export default function ChapterList({ tutorialSlug, chapters }: ChapterListProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [editChapter, setEditChapter] = useState<ChapterListProps['chapters'][number] | null>(null);

  const chapterSlug = searchParams.get('chapterSlug');
  const topicSlug = searchParams.get('topicSlug');

  const expandedChapterId = useMemo(() => {
    return chapters.find((c) => c.slug === chapterSlug)?.id ?? undefined;
  }, [chapterSlug, chapters]);

  const toggleModal = (edit: boolean) => {
    setModalOpen((prev) => !prev);
    if (!edit) setEditChapter(null);
  };

  const handleEditChapter = (chapter: ChapterListProps['chapters'][number]) => {
    setEditChapter(chapter);
    toggleModal(true);
  };

  const navigateTo = (chapterSlug: string, type: 'new' | 'edit', topicSlug?: string) => {
    const query = new URLSearchParams();
    query.set('chapterSlug', chapterSlug);
    if (type === 'edit' && topicSlug) query.set('topicSlug', topicSlug);

    router.push(`${pathname}?${query.toString()}`);
  };

  const handleDeleteChapter = async (id: string) => {
    const { message, success } = await deleteTutorialChapter(id);

    if (!success) {
      toast.error(message);
      return;
    }

    toast.success(message);
    router.refresh();
  };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-y-2">
        <div className="flex justify-between items-center">
          <p className="uppercase font-medium">Chapters</p>
          <Button size="icon" variant="outline" onClick={() => toggleModal(false)}>
            <Plus />
          </Button>
        </div>

        <div className="flex-1 w-full flex-col gap-y-1">
          <Accordion type="single" collapsible defaultValue={expandedChapterId}>
            {chapters.map((chapter) => (
              <AccordionItem
                key={chapter.id}
                value={chapter.id}
                className={`rounded px-2.5 border-none ${
                  expandedChapterId === chapter.id ? 'bg-gray-200 dark:bg-neutral-600/20' : ''
                }`}
              >
                <AccordionTrigger className="hover:no-underline">{chapter.title}</AccordionTrigger>

                <AccordionContent className="flex flex-col gap-y-1">
                  <div className="mb-5 flex flex-col gap-y-2">
                    {chapter.topics.map((topic) => (
                      <div
                        key={topic.id}
                        onClick={() => navigateTo(chapter.slug, 'edit', topic.slug)}
                        className={`group flex justify-between items-center hover:bg-gray-700/40 dark:hover:bg-neutral-700/60 rounded-md cursor-pointer transition-colors duration-150 ${
                          topicSlug === topic.slug ? 'bg-gray-300 dark:bg-neutral-500/60' : ''
                        }`}
                      >
                        <div className="flex gap-2 items-center px-2 py-1">
                          <BookOpen size={14} />
                          <p>{topic.title}</p>
                        </div>
                        <ChevronRight
                          size={12}
                          className="group-hover:translate-x-2 transition-transform duration-150 mr-3"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-y-2 w-full">
                    <div className="flex gap-2 items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditChapter(chapter)}
                      >
                        Edit Chapter
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            Delete Chapter
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete this
                              chapter.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteChapter(chapter.id)}>
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="uppercase"
                      onClick={() => navigateTo(chapter.slug, 'new')}
                    >
                      <Plus className="mr-1" />
                      Add topic
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <HandleChapterModal
        open={modalOpen}
        handleClose={toggleModal}
        tutorialSlug={tutorialSlug}
        data={editChapter}
      />
    </>
  );
}
