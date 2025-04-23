import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    try {
        const category = await prisma.blogCategory.findUnique({
            where: {
                id
            }
        })

        if (!category) {
            return NextResponse.json({ category: null, message: "Category not found" }, { status: 200 })
        }

        return NextResponse.json({ category }, { status: 200 })

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to fetch blog category', details: err }, { status: 500 });
    }
}