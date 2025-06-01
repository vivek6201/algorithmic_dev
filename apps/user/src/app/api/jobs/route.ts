import { ExperienceLevel, JobType } from '@repo/db';
import { prisma } from '@repo/db';
import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@repo/db';
import cache from '@repo/shared/cache';

type JobWithCategories = Prisma.JobsGetPayload<{
  include: {
    jobCategories: true;
  };
}>;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get('category')?.split(',') ?? [];
    const jobType = searchParams.get('type')?.split(',') ?? [];
    const experience = searchParams.get('experience')?.split(',') ?? [];

    const page = parseInt(searchParams.get('page') ?? '1', 10);
    const limit = parseInt(searchParams.get('limit') ?? '10', 10);
    const skip = (page - 1) * limit;

    const cacheArgs = [
      `page=${page}`,
      `limit=${limit}`,
      ...category.map((c) => `category=${c}`),
      ...jobType.map((t) => `type=${t}`),
      ...experience.map((e) => `experience=${e}`),
    ];

    let jobs = await cache.get<JobWithCategories[]>('jobs', cacheArgs);

    if (!jobs) {
      jobs = await prisma.jobs.findMany({
        where: {
          published: true,
          ...(category.length > 0 && {
            jobCategories: {
              some: {
                slug: {
                  in: category,
                },
              },
            },
          }),
          ...(jobType.length > 0 && {
            type: {
              in: jobType as JobType[],
            },
          }),
          ...(experience.length > 0 && {
            experienceLevel: {
              in: experience as ExperienceLevel[],
            },
          }),
        },
        include: {
          jobCategories: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      });

      if (jobs) cache.set('jobs', cacheArgs, jobs);
    }

    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
