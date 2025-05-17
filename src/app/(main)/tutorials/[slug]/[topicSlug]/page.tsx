import TutorialSection from '@/components/site/pages/tutorials/tutorial/TutorialSection';
import { getClientTutorialTopicBySlug } from '@/helpers/main/tutorialGetter';
import React from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; topicSlug: string }>;
}) {
  const { topicSlug } = await params;
  const { success, data } = await getClientTutorialTopicBySlug(topicSlug);

  if (!success || !data) {
    return {
      title: 'Tutorial not found',
      description: 'This Tutorial does not exist.',
    };
  }

  return {
    title: `${data.title} | Algorithmic Dev`,
    // description: data.,
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string; topicSlug: string }>;
}) {
  const { topicSlug } = await params;
  const { success, data, nextTopic, prevTopic } = await getClientTutorialTopicBySlug(topicSlug);

  if (!success || !data) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Data not available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <TutorialSection data={data} nextSlug={nextTopic?.slug} prevSlug={prevTopic?.slug} />
    </div>
  );
}
