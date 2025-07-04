import { LetterType, prisma } from '@repo/db';
import { newsletterSchema } from '@repo/shared/validations';
import { NextRequest, NextResponse } from 'next/server';

function getLetterType(data: { isJobs: boolean; isTechnical: boolean }): LetterType {
  if (data.isJobs && data.isTechnical) return LetterType.All;
  if (data.isJobs) return LetterType.Jobs;
  return LetterType.Blogs;
}

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const { success, error, data } = newsletterSchema.safeParse(body);

  if (!success && error) {
    return NextResponse.json({
      success,
      error: error.issues.map((issue) => {
        return {
          message: issue.message,
          path: issue.path[0],
        };
      }),
    });
  }

  const letterType = getLetterType(data);

  try {
    await prisma.newsletterSubscription.upsert({
      where: {
        email: data.email,
      },
      create: {
        email: data.email,
        letterType,
        subscribed: true,
      },
      update: {
        subscribed: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully',
    });
  } catch (error) {
    console.log(error instanceof Error ? error.message : error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error',
      },
      { status: 400 },
    );
  }
};
