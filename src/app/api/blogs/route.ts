import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  // Read category from query params
  const rawCategory = searchParams.getAll("category"); // returns array

  // Handle both multiple category fields and comma separated
  const categories = rawCategory.flatMap((item) => item.split(",")).filter(Boolean);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  try {
    const blogs = await prisma.blog.findMany({
      where: {
        published: true,
        ...(categories.length > 0
          ? {
              category: {
                slug: {
                  in: categories, // match any category slug
                },
              },
            }
          : {}),
      },
      take: limit,
      skip: (page - 1) * limit,
      include: {
        category: true,
        reactions: true,
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
