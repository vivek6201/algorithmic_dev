import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const categorySlugs = searchParams.get("category");

  try {
    const categories = categorySlugs ? categorySlugs.split(",") : null;

    const tutorials = await prisma.tutorial.findMany({
      where: {
        published: true,
        ...(categories
          ? {
              categories: {
                some: {
                  category: {
                    slug: {
                      in: categories,
                    },
                    published: true,
                  },
                },
              },
            }
          : {}),
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        chapters: {
          take: 1,
          include: {
            topics: {
              take: 1,
              orderBy: {
                order: "asc",
              },
            },
          },
        },
        _count: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ data: tutorials }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
