import { Blog, BlogCategory, BlogReaction, Prisma } from '@repo/db';

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
