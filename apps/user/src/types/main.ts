import { Blog, BlogCategory, BlogReaction, Prisma } from '@repo/db';
import { bugSchema, feedbackSchema } from '@repo/shared/validations';
import { z } from '@repo/ui';

export type CombinedProfile = Prisma.ProfileGetPayload<{
  include: {
    address: true;
    educationDetails: true;
    experienceDetails: true;
    projects: true;
  };
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
        reactions: true;
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
export type BugFormData = z.infer<typeof bugSchema>;

export type FeedbackStatus = {
  action: 'submitted' | 'later';
  timestamp: number;
};
