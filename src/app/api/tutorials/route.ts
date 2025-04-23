import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')

    try {
        const tutorials = await prisma.tutorial.findMany({
            where: {
                published: true,
                ...(category
                    ? {
                        categories: {
                            some: {
                                category: {
                                    name: category,
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
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({ data: tutorials }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 })
    }
}