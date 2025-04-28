import { ExperienceLevel, JobType } from '@/generated/prisma';
import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Get the query parameters
    const category = searchParams.get('category')?.split(',') ?? [];
    const jobType = searchParams.get('type')?.split(',') ?? [];
    const experience = searchParams.get('experience')?.split(',') ?? [];

    const jobs = await prisma.jobs.findMany({
      where: {
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
    // Return the jobs found
    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
