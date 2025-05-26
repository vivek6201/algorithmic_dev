'use server';

import { prisma } from '@repo/db';
import { blogCategorySchema } from '@repo/shared/validations';
import { z } from '@repo/ui';

const createBlogCategory = async (values: z.infer<typeof blogCategorySchema>) => {
  const { success, data, error } = await blogCategorySchema.safeParseAsync(values);

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
    const slugExists = await prisma.blogCategory.findUnique({
      where: { slug: values.slug },
    });

    if (slugExists) {
      return {
        success: false,
        message: 'Slug Already exists',
      };
    }

    const newCategory = await prisma.blogCategory.create({
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
      message: 'Failed to create category!',
    };
  }
};

export default createBlogCategory;

export const editBlogCategory = async (
  id: string,
  values: z.infer<ReturnType<(typeof blogCategorySchema)['partial']>>,
) => {
  const { success, error } = await blogCategorySchema.partial().safeParseAsync(values);

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
    let category = await prisma.blogCategory.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      return {
        success: false,
        message: 'Invalid Category Id',
      };
    }

    category = await prisma.$transaction(async (tx) => {
      const checkSlug = await tx.blogCategory.findUnique({
        where: {
          slug: values.slug,
        },
      });

      if (checkSlug) {
        throw new Error('New Category slug already exists!');
      }

      const updatedCategory = await tx.blogCategory.update({
        where: { id },
        data: {
          ...values,
        },
      });
      return updatedCategory;
    });

    return {
      success: true,
      message: 'Category updated successfully!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Error while editing category!',
    };
  }
};

export const deleteBlogCategory = async (id: string) => {
  try {
    await prisma.blogCategory.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      message: 'Blog Category Deleted Successfully!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to delete blog category!',
    };
  }
};
