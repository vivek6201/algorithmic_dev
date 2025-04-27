import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data = await prisma.jobs.findMany({
      where: {
        published: true,
      },
    });
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch data",
    });
  }
};
