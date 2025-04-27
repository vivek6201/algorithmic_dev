"use server";

import { prisma } from "@/lib/db";

export const updateJobStatus = async (id: string, status: boolean) => {
  try {
    const data = await prisma.jobs.findUnique({
      where: { id },
    });

    if (!data) {
      return {
        success: false,
        message: "Job not found",
      };
    }

    await prisma.jobs.update({
      where: {
        id,
      },
      data: { published: status },
    });

    return {
      success: true,
      message: "Status updated successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      message: "Internal Server error",
    };
  }
};
