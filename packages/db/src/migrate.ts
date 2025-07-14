import { prisma } from '.';

async function addChapterSlugToTopics() {
  const topics = await prisma.topic.findMany();

  topics.forEach(async (topic) => {
    const chapter = await prisma.chapter.findUnique({
      where: {
        id: topic.chapterId,
      },
    });

    if (!chapter) return null;

    await prisma.topic.update({
      where: {
        id: topic.id,
      },
      data: {
        chapterSlug: chapter.slug,
      },
    });

    console.log(`topic: ${topic.title} has chapter slug: ${chapter.slug}`);
  });
}

addChapterSlugToTopics()
  .catch((e) => {
    console.error('Error updating slugs:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
