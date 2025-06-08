'use server';

import { nextAuthResult } from '@/lib/auth';
import { CombinedProfile } from '@/types/main';
import { prisma } from '@repo/db';
import cache from '@repo/shared/cache';
import {
  educationValidation,
  experienceValidation,
  personalValidation,
  projectValidation,
} from '@repo/shared/validations';
import { z } from '@repo/ui';

export const updatePersonalData = async (
  values: z.infer<typeof personalValidation>,
  email: string,
) => {
  try {
    const { success, data, error } = await personalValidation.safeParseAsync(values);
    const session = await nextAuthResult.auth();

    if (!success) {
      return {
        success,
        error: error.issues.map((issue) => ({
          path: issue.path[0],
          message: issue.message,
        })),
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        name: data.name,
        profile: {
          update: {
            bio: data.bio,
            dateOfBirth: data.dob,
            personType: data.personType,
            phoneNumber: data.phoneNo,
          },
        },
      },
    });

    await cache.evict<CombinedProfile>('user-profile', [session?.user?.profileId ?? '']);

    return {
      success: true,
      message: 'personal data updated successfully',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Internal Server Error',
    };
  }
};

export const updateEducationData = async (
  values: z.infer<typeof educationValidation>,
  profileId: string,
  id?: string,
) => {
  try {
    const { success, data, error } = await educationValidation.safeParseAsync(values);
    const session = await nextAuthResult.auth();

    if (!success) {
      return {
        success,
        error: error.issues.map((issue) => ({
          path: issue.path[0],
          message: issue.message,
        })),
      };
    }

    const educationData = {
      schoolName: data.schoolName,
      fieldOfStudy: data.fieldOfStudy,
      degree: data.degree,
      startDate: data.startDate,
      endDate: data.endDate,
      currentlyEnrolled: data.currentlyEnrolled,
      grade: data.grade,
      profileId,
    };

    const updatedData = await prisma.$transaction(async (tx) => {
      await tx.profile.findUniqueOrThrow({
        where: {
          id: profileId,
        },
      });
      const data = await tx.education.upsert({
        where: {
          id: id || '',
        },
        create: educationData,
        update: educationData,
      });

      return data;
    });

    await cache.evict<CombinedProfile>('user-profile', [session?.user?.profileId ?? '']);

    return {
      success: true,
      message: 'Education data updated successfully',
      data: updatedData,
    };
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Unknown error');
    return {
      success: false,
      message: 'Failed to update education data',
    };
  }
};

export const updateProjectData = async (
  values: z.infer<typeof projectValidation>,
  profileId: string,
  id?: string,
) => {
  try {
    const { success, data, error } = await projectValidation.safeParseAsync(values);
    const session = await nextAuthResult.auth();

    if (!success) {
      return {
        success,
        error: error.issues.map((issue) => ({
          path: issue.path[0],
          message: issue.message,
        })),
      };
    }

    const projectData = {
      projectName: data.projectName,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      projectLink: data.projectLink,
      githubLink: data.githubLink,
      inProgress: data.inProgress,
      profileId: profileId,
    };

    await prisma.$transaction(async (tx) => {
      await tx.profile.findUniqueOrThrow({
        where: {
          id: profileId,
        },
      });
      await tx.project.upsert({
        where: {
          id: id || '',
        },
        create: projectData,
        update: projectData,
      });
    });

    await cache.evict<CombinedProfile>('user-profile', [session?.user?.profileId ?? '']);

    return {
      success: true,
      message: 'Project data updated successfully',
    };
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Unknown error');
    return {
      success: false,
      message: 'Failed to update project data',
    };
  }
};

export const updateExperienceData = async (
  values: z.infer<typeof experienceValidation>,
  profileId: string,
  id?: string,
) => {
  try {
    const { success, data, error } = await experienceValidation.safeParseAsync(values);
    const session = await nextAuthResult.auth();

    if (!success) {
      return {
        success,
        error: error.issues.map((issue) => ({
          path: issue.path[0],
          message: issue.message,
        })),
      };
    }

    const experienceData = {
      companyName: data.companyName,
      jobDescription: data.jobDescription,
      endDate: data.endDate,
      jobTitle: data.jobTitle,
      startDate: data.startDate,
      currentlyWorking: data.currentlyWorking,
      profileId: profileId,
    };

    await prisma.$transaction(async (tx) => {
      await tx.experience.findUniqueOrThrow({
        where: {
          id: profileId,
        },
      });
      await tx.experience.upsert({
        where: {
          id: id || '',
        },
        create: experienceData,
        update: experienceData,
      });
    });

    await cache.evict<CombinedProfile>('user-profile', [session?.user?.profileId ?? '']);

    return {
      success: true,
      message: 'Experience data updated successfully',
    };
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Unknown error');
    return {
      success: false,
      message: 'Failed to update experience data',
    };
  }
};

export const deleteEducationData = async (id: string) => {
  const session = await nextAuthResult.auth();
  try {
    await prisma.$transaction(async (tx) => {
      await tx.education.findUniqueOrThrow({
        where: {
          id,
        },
      });

      await tx.education.delete({
        where: {
          id,
        },
      });
    });

    await cache.evict<CombinedProfile>('user-profile', [session?.user?.profileId ?? '']);

    return {
      success: true,
      message: 'Data deleted successfully!',
    };
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return {
      success: false,
      message: 'failed to delete data!',
    };
  }
};
export const deleteProjectData = async (id: string) => {
  const session = await nextAuthResult.auth();
  try {
    await prisma.$transaction(async (tx) => {
      await tx.project.findUniqueOrThrow({
        where: {
          id,
        },
      });

      await tx.project.delete({
        where: {
          id,
        },
      });
    });

    await cache.evict<CombinedProfile>('user-profile', [session?.user?.profileId ?? '']);

    return {
      success: true,
      message: 'Data deleted successfully!',
    };
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return {
      success: false,
      message: 'failed to delete data!',
    };
  }
};
export const deleteExperienceData = async (id: string) => {
  const session = await nextAuthResult.auth();
  try {
    await prisma.$transaction(async (tx) => {
      await tx.experience.findUniqueOrThrow({
        where: {
          id,
        },
      });

      await tx.experience.delete({
        where: {
          id,
        },
      });
    });

    await cache.evict<CombinedProfile>('user-profile', [session?.user?.profileId ?? '']);

    return {
      success: true,
      message: 'Data deleted successfully!',
    };
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return {
      success: false,
      message: 'failed to delete data!',
    };
  }
};
