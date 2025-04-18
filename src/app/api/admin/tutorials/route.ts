import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const tutorials = await prisma.tutorial.findMany({
            include: {
                chapters: true,
                _count: true
            }
        })
        return NextResponse.json({ tutorials }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 })
    }
} 