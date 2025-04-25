import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  try {
    const blogs = await prisma.blog.findMany({
      where: {
        published: true,
        ...(category
          ? {
              category: {
                slug: category,
              },
            }
          : {}),
      },
      take: limit,
      skip: (page - 1) * limit,
      include: {
        category: true,
        reactions: true
      },
    });

    return NextResponse.json({ success: true, data: blogs }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
};
