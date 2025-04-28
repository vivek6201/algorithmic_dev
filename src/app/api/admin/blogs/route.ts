import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await prisma.blog.findMany({
      include: {
        category: true,
        _count: true,
      },
    });
    return NextResponse.json({ blogs: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs", details: error },
      { status: 500 },
    );
  }
}
