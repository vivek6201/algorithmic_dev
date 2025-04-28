'use client';

import React, { useMemo, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Plus, BookOpen, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import HandleChapterModal from './HandleChapterModal';

interface ChapterListProps {
  tutorialSlug: string;
  chapters: {
    id: string;
    title: string;
    slug: string;
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

  const chapterSlug = searchParams.get('chapterSlug');
  const topicSlug = searchParams.get('topicSlug');

  const expandedChapterId = useMemo(() => {
    return chapters.find((c) => c.slug === chapterSlug)?.id ?? undefined;
  }, [chapterSlug, chapters]);

  const toggleModal = () => setModalOpen((prev) => !prev);

  const navigateTo = (chapterSlug: string, type: 'new' | 'edit', topicSlug?: string) => {
    const query = new URLSearchParams();
    query.set('chapterSlug', chapterSlug);
    if (type === 'edit' && topicSlug) query.set('topicSlug', topicSlug);

    router.push(`${pathname}?${query.toString()}`);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-y-2">
        <div className="flex justify-between items-center">
          <p className="uppercase font-medium">Chapters</p>
          <Button size="icon" variant="outline" onClick={toggleModal}>
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

                  <Button
                    variant="outline"
                    size="sm"
                    className="uppercase"
                    onClick={() => navigateTo(chapter.slug, 'new')}
                  >
                    <Plus className="mr-1" />
                    Add topic
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <HandleChapterModal open={modalOpen} handleClose={toggleModal} tutorialSlug={tutorialSlug} />
    </>
  );
}
