import { Prisma } from '@repo/db';

export type TutorialDataType = Prisma.TutorialGetPayload<{
  include: { chapters: true; categories: true; _count: true };
}>;
