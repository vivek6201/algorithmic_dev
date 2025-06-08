import cache from '@repo/shared/cache';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/db';
import { CombinedProfile } from '@/types/main';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ profileId: string }> },
) {
  const { profileId } = await params;

  let data = await cache.get<CombinedProfile>('user-profile', [profileId]);

  console.log({ data });

  if (!data) {
    data = await prisma.profile.findUnique({
      where: {
        id: profileId,
      },
      include: {
        address: true,
        educationDetails: true,
        experienceDetails: true,
        projects: true,
      },
    });

    await cache.set('user-profile', [profileId], data);
  }

  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status: 200 },
  );
}
