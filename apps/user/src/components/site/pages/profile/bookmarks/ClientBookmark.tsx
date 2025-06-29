'use client';

import { useUserStore } from '@/store/userStore';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/components/ui/tabs';
import { BookmarkType } from '@repo/db';
import BlogCard from '../../blogs/BlogCard';
import JobCard from '../../jobs/JobCard';
import { BookText, Briefcase, BookmarkX } from '@repo/ui';

export default function ClientBookmark() {
  const { bookmarks } = useUserStore();

  const hasJobs = bookmarks.some((b) => b.type === BookmarkType.Jobs);
  const hasBlogs = bookmarks.some((b) => b.type === BookmarkType.Blogs);

  return (
    <div className="w-full h-full p-4 md:p-6">
      <Tabs defaultValue={BookmarkType.Jobs} className="w-full space-y-6">
        <TabsList className="w-full grid grid-cols-2 gap-2 bg-muted p-1 rounded-xl">
          <TabsTrigger value={BookmarkType.Jobs} className="flex items-center justify-center gap-2">
            <Briefcase className="w-4 h-4" />
            Jobs
          </TabsTrigger>
          <TabsTrigger
            value={BookmarkType.Blogs}
            className="flex items-center justify-center gap-2"
          >
            <BookText className="w-4 h-4" />
            Blogs
          </TabsTrigger>
        </TabsList>

        <TabsContent value={BookmarkType.Jobs} className="mt-6 space-y-4">
          {hasJobs ? (
            bookmarks
              .filter(({ type }) => type === BookmarkType.Jobs)
              .map(
                ({ job, id }) =>
                  job && <JobCard job={job} categories={job.jobCategories} key={id} />,
              )
          ) : (
            <EmptyState
              title="No Job Bookmarks"
              description="You haven’t saved any job openings yet."
            />
          )}
        </TabsContent>

        <TabsContent value={BookmarkType.Blogs} className="mt-6 space-y-4">
          {hasBlogs ? (
            bookmarks
              .filter(({ type }) => type === BookmarkType.Blogs)
              .map(
                ({ blog, id }) =>
                  blog && <BlogCard {...blog} categoryName={blog.category.name ?? ''} key={id} />,
              )
          ) : (
            <EmptyState
              title="No Blog Bookmarks"
              description="You haven't bookmarked any blogs yet."
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

const EmptyState = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground space-y-4">
      <BookmarkX className="w-10 h-10 text-muted" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};
