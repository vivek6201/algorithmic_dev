'use server';

import { prisma } from '@repo/db';
import { jobSchema } from '@repo/shared/validations';
import { z } from '@repo/ui';

export const createJob = async (values: z.infer<typeof jobSchema>) => {
  const parsed = await jobSchema.safeParseAsync(values);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues.map(({ path, message }) => ({
        path: path[0],
        message,
      })),
    };
  }

  const data = parsed.data;

  try {
    const slugExists = await prisma.jobs.findUnique({
      where: { slug: data.slug },
      select: { id: true }, // Optimization: only fetch necessary field
    });

    if (slugExists) {
      return {
        success: false,
        message: 'Slug already exists',
      };
    }

    const { categories, ...rest } = data;
    const newJob = await prisma.jobs.create({
      data: {
        ...rest,
        jobCategories: {
          connect: categories.map((id) => ({ id })),
        },
      },
    });

    return {
      success: true,
      message: 'Job created successfully!',
      data: newJob,
    };
  } catch (error) {
    console.error('Create Job Error:', error);
    return {
      success: false,
      message: 'Failed to create job!',
    };
  }
};

export const updateJob = async (slug: string, values: Partial<z.infer<typeof jobSchema>>) => {
  try {
    const data = await prisma.jobs.findUnique({
      where: { slug },
      include: {
        jobCategories: true, // include current categories
      },
    });

    if (!data) {
      return { success: false, message: 'Job not found' };
    }

    // Prepare disconnect array (disconnect all current categories)
    const disconnectCategories = data.jobCategories.map((category) => ({
      id: category.id,
    }));

    // Prepare connect array (connect new categories if provided)
    const connectCategories =
      values.categories?.map((category) => ({
        id: category,
      })) || [];

    const { categories, ...rest } = values;
    console.log(categories);

    await prisma.jobs.update({
      where: { slug },
      data: {
        ...rest,
        jobCategories: {
          disconnect: disconnectCategories,
          connect: connectCategories,
        },
      },
    });

    return {
      success: true,
      message: 'Job updated successfully',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to update data',
    };
  }
};

export const deleteJob = async (id: string) => {
  try {
    const existingJob = await prisma.jobs.findUnique({
      where: { id },
      select: { id: true }, // Optimization: only fetch necessary field
    });

    if (!existingJob) {
      return {
        success: false,
        message: 'Job not found',
      };
    }

    await prisma.jobs.delete({ where: { id } });

    return {
      success: true,
      message: 'Job deleted successfully!',
    };
  } catch (error) {
    console.error('Delete Job Error:', error);
    return {
      success: false,
      message: 'Internal Server Error',
    };
  }
};
