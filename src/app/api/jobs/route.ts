import { ExperienceLevel, JobType } from '@/generated/prisma';
import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@/generated/prisma';
import cache from '@/lib/cache';

type JobWithCategories = Prisma.JobsGetPayload<{
  include: {
    jobCategories: true;
  };
}>;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Get the query parameters
    const category = searchParams.get('category')?.split(',') ?? [];
    const jobType = searchParams.get('type')?.split(',') ?? [];
    const experience = searchParams.get('experience')?.split(',') ?? [];

    const cacheArgs = [
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

          // Job Type filter
          ...(jobType.length > 0 && {
            type: {
              in: jobType as JobType[],
            },
          }),

          // Experience Level filter
          ...(experience.length > 0 && {
            experienceLevel: {
              in: experience as ExperienceLevel[],
            },
          }),
        },
        include: {
          jobCategories: true, // Include job categories if you need
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (jobs) cache.set('jobs', cacheArgs, jobs);
    }
    // Return the jobs found
    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
