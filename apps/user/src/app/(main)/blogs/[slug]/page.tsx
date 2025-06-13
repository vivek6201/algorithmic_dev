import BlogClientActions from '@/components/site/pages/blogs/BlogClientActions';
import Breadcrumbs from '@/components/site/shared/Breadcrumb';
import { getClientBlogBySlug } from '@/helpers/main/blogGetter';
import { nextAuthResult } from '@/lib/auth';
import { calculateReadTime } from '@/lib/clientUtils';
import HTMLRenderer from '@repo/ui/components/elements/HTMLRenderer';
import Link from 'next/link';
import React from 'react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { success, data } = await getClientBlogBySlug(slug);

  if (!success || !data) {
    return {
      title: 'Blog not found',
      description: 'This blog does not exist.',
    };
  }

  return {
    title: `${data.title} | Algorithmic Dev`,
    description: data.description,
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { success, data, relatedPosts } = await getClientBlogBySlug(slug);
  const readTime = calculateReadTime(data?.content ?? '');

  if (!success || !data) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Data not available</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 mt-24 mb-16 text-gray-800 dark:text-gray-100 ">
      {/* Breadcrumb */}
      <Breadcrumbs />

      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-10">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 capitalize ">
            {data.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center text-sm gap-x-2 gap-y-2 mb-4">
            <span>
              By <strong className="text-blue-500">{data.authorName}</strong>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>{new Date(data.createdAt).toDateString()}</span>
            <span className="hidden sm:inline">•</span>
            <span>{readTime} min read</span>
            <span className="hidden sm:inline">•</span>
            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">
              {data.category.name}
            </span>
          </div>
        </div>

        <BlogClientActions data={data} />
      </div>

      {/* Blog Content */}
      <article className="prose lg:prose-lg dark:prose-invert max-w-none">
        {<HTMLRenderer content={data.content} />}
      </article>

      {/* Author Box */}
      {/* <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl flex gap-4 items-center">
        <img
          src="https://i.pravatar.cc/100"
          alt="Author"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">John Doe</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            DevOps Engineer at CloudCorp. Loves writing about infrastructure and
            open-source tools.
          </p>
        </div>
      </div> */}

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 ? (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
          <div className="flex items-center overflow-x-auto scrollbar-none gap-4">
            {/* Example related post card */}
            {relatedPosts.map((post) => (
              <Link
                href={encodeURIComponent(post.slug)}
                className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition cursor-pointer w-full md:min-w-[24rem] h-[10rem] max-w-lg"
                key={post.id}
              >
                <h4 className="font-semibold mb-2">{post.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{post.description}</p>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
