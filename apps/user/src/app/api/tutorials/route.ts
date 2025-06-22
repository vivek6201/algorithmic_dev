import cache from '@repo/shared/cache';
import { prisma } from '@repo/db';
import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@repo/db';

// Define the type for tutorials with related data
type TutorialWithRelations = Prisma.TutorialGetPayload<{
  include: {
    categories: {
      include: {
        category: true;
      };
    };
    chapters: {
      take: 1;
      include: {
        topics: {
          take: 1;
          orderBy: {
            order: 'asc';
          };
          select: {
            slug: true;
            id: true;
          };
        };
      };
    };
    _count: true;
  };
}>;

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
  const categorySlugs = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  try {
    const categories = categorySlugs ? categorySlugs.split(',') : null;

    // Create cache key arguments
    const cachePrefix = categories ? 'filtered' : 'all';
    const cacheArgs = [
      cachePrefix,
      `page=${page}`,
      `limit=${limit}`,
      ...(categories ? categories.map((c) => `category=${c}`) : []),
    ];

    // Attempt to retrieve tutorials from cache
    let tutorials = await cache.get<TutorialWithRelations[]>('tutorials', cacheArgs);

    if (!tutorials) {
      // Fetch tutorials from the database if not in cache
      tutorials = await prisma.tutorial.findMany({
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
                  order: 'asc',
                },
                select: {
                  slug: true,
                  id: true,
                },
              },
            },
          },
          _count: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      });

      // Cache the fetched tutorials
      cache.set('tutorials', cacheArgs, tutorials, 3600); // Cache for 1 hour (3600 seconds)
    }

    // Fetch the total count of tutorials for pagination

    let totalTutorials = await cache.get<number>('tut-count', cacheArgs);

    if (!totalTutorials) {
      totalTutorials = await prisma.tutorial.count({
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
      });
      cache.set('tut-count', cacheArgs, totalTutorials);
    }

    // Return the response with pagination data
    return NextResponse.json(
      {
        data: tutorials,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalTutorials / limit),
          totalCount: totalTutorials,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
