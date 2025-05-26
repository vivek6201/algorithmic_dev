import TutorialSidebar from '@/components/site/pages/tutorials/tutorial/TutorialSidebar';
import { getClientTutorialChapters } from '@/helpers/main/tutorialGetter';
import React, { ReactNode } from 'react';

export default async function TutorialLayout({
  params,
  children,
}: {
  children: ReactNode;
  params: Promise<{ slug: string; topicSlug: string }>;
}) {
  const { slug, topicSlug } = await params;
  const { data } = await getClientTutorialChapters(slug);

  return (
    <div className="w-11/12 flex max-w-[1400px] mx-auto mt-24">
      <div className="hidden lg:block h-full">
        <TutorialSidebar data={data} topicSlug={topicSlug} />
      </div>
      {children}
    </div>
  );
}
