import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const res = await prisma.tutorialCategory.findMany();
        return NextResponse.json({ categories: res }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch blog categories', details: error }, { status: 500 });
    }
}