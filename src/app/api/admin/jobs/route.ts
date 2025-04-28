import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data = await prisma.jobs.findMany({
      include: {
        jobCategories: true,
      },
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
};
