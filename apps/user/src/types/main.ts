import { Blog, BlogCategory, BlogReaction, Prisma } from '@repo/db';
import { feedbackSchema } from '@repo/shared/validations';
import { z } from '@repo/ui';

const profileWithAllDetails = Prisma.validator<Prisma.ProfileInclude>()({
  address: true,
  educationDetails: true,
  experienceDetails: true,
  projects: true,
});

export type CombinedProfile = Prisma.ProfileGetPayload<{
  include: typeof profileWithAllDetails;
}>;

export type JobWithCategories = Prisma.JobsGetPayload<{
  include: {
    jobCategories: true;
  };
}>;

export type BlogWithCategoryAndReactions = Blog & {
  category: BlogCategory;
  reactions: BlogReaction[];
};

export type BookmarkWithRelations = Prisma.BookmarkGetPayload<{
  include: {
    blog: {
      include: {
        category: true;
      };
    };
    job: {
      include: {
        jobCategories: true;
      };
    };
  };
}>;

export type FeedbackFormData = z.infer<typeof feedbackSchema>;
