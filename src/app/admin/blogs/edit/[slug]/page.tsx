import BlogForm from "@/components/site/pages/admin/blogs/BlogForm";
import { getBlogBySlug } from "@/helpers/admin/getter";
import React, { Suspense } from "react";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export default async function page({ params }: BlogPageProps) {
  const { slug } = await params;
  const { success, blog } = await getBlogBySlug(slug);

  if (!success || !blog) return;

  const modifiedData = {
    author: blog.authorName,
    categoryId: blog.categoryId,
    content: blog.content,
    description: blog.description,
    slug: blog.slug,
    title: blog.title,
    coverImage: blog.coverImage,
  };

  return (
    <Suspense>
      <div className="flex flex-col gap-y-5">
        <p className="font-bold text-2xl">Edit Blog</p>
        <BlogForm isEdit={true} blog={modifiedData} />
      </div>
    </Suspense>
  );
}
