import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const data = await prisma.jobCategory.findMany();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: 'Internal Server error',
    });
  }
};
