import JobHeaderBlock from '@/components/site/pages/jobs/JobHeaderBlock';
import Breadcrumbs from '@/components/site/shared/Breadcrumb';
import { Button } from '@repo/ui/components/ui/button';
import { getClientJobBySlug } from '@/helpers/main/jobsGetter';
import { ChevronRight } from '@repo/ui';
import Link from 'next/link';
import React from 'react';
import HTMLRenderer from '@repo/ui/components/elements/HTMLRenderer';
import { Metadata } from 'next';
import JobCard from '@/components/site/pages/jobs/JobCard';

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
    title: `${data.companyName} is hiring for ${data.position} | Algorithmic Dev`,
    description: data.shortDescription,
  } as Metadata;
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
      <JobHeaderBlock data={data} id={data.id} />

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
              <div key={post.id} className="w-full md:max-w-fit flex-shrink-0">
                <JobCard categories={post.jobCategories} job={post} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
