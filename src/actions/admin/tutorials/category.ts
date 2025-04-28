"use server";

import { prisma } from "@/lib/db";
import { tutorialCategorySchema } from "@/validations/tutorialValidation";
import { z } from "zod";

const createCategory = async (
  values: z.infer<typeof tutorialCategorySchema>,
) => {
  const { success, data, error } =
    await tutorialCategorySchema.safeParseAsync(values);

  if (!success) {
    return {
      success,
      error: error.issues.map((issue) => {
        return {
          path: issue.path[0],
          message: issue.message,
        };
      }),
    };
  }

  try {
    const slugExists = await prisma.tutorialCategory.findUnique({
      where: { slug: values.slug },
    });

    if (slugExists) {
      return {
        success: false,
        message: "Slug Already exists",
      };
    }

    const newCategory = await prisma.tutorialCategory.create({
      data: {
        name: data.name,
        slug: data.slug,
      },
    });

    return { success, newCategory };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to create category!",
    };
  }
};

export default createCategory;

export const editCategory = async (
  id: string,
  values: z.infer<ReturnType<(typeof tutorialCategorySchema)["partial"]>>,
) => {
  const { success, error } = await tutorialCategorySchema
    .partial()
    .safeParseAsync(values);

  if (!success) {
    return {
      success,
      error: error.issues.map((issue) => {
        return {
          path: issue.path[0],
          message: issue.message,
        };
      }),
    };
  }

  try {
    let category = await prisma.tutorialCategory.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      return {
        success: false,
        message: "Invalid Category Id",
      };
    }

    category = await prisma.tutorialCategory.update({
      where: { id },
      data: {
        ...values,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error while editing category!",
    };
  }
};
