import JobHeaderBlock from '@/components/site/pages/jobs/JobHeaderBlock';
import Breadcrumbs from '@/components/site/shared/Breadcrumb';
import { Button } from '@repo/ui/components/ui/button';
import { getClientJobBySlug } from '@/helpers/main/jobsGetter';
import { ChevronRight } from '@repo/ui';
import Link from 'next/link';
import React from 'react';
import HTMLRenderer from '@repo/ui/components/elements/HTMLRenderer';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { success, data } = await getClientJobBySlug(slug);

  if (!success || !data) {
    return {
      title: 'Job not found',
      description: 'This job does not exist.',
    };
  }

  return {
    title: `${data.title} | Algorithmic Dev`,
    description: data.shortDescription,
  };
}

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { success, data, relatedPosts } = await getClientJobBySlug(slug);

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

      {/* Header */}
      <JobHeaderBlock title={data.title} id={data.id} />

      {/* Meta */}
      <div className="flex flex-wrap items-center text-sm gap-4 mb-6"></div>

      {/* Blog Content */}
      <article className="prose lg:prose-lg dark:prose-invert max-w-none opacity-80">
        {<HTMLRenderer content={data.description} />}
      </article>

      <Link href={data.link} target="_blank" className="my-10">
        <Button size={'lg'} className="cursor-pointer">
          Apply <ChevronRight />
        </Button>
      </Link>

      {relatedPosts && relatedPosts.length > 0 ? (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Related Openings</h2>
          <div className="flex items-center overflow-x-auto scrollbar-none gap-4">
            {/* Example related post card */}
            {relatedPosts.map((post) => (
              <Link
                href={encodeURIComponent(post.slug)}
                className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition cursor-pointer w-full md:min-w-[24rem] h-[10rem] max-w-lg"
                key={post.id}
              >
                <h4 className="font-semibold mb-2">{post.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {post.shortDescription.split(' ').length > 30
                    ? post.shortDescription.split(' ').slice(0, 30).join(' ') + '...'
                    : post.shortDescription}
                </p>
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
