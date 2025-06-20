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
import { CarouselItem } from '@repo/ui/components/ui/carousel';
import CustomCarousal from '@repo/ui/components/elements/CustomCarousal';

export const revalidate = 3600;

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
    openGraph: {
      authors: 'Vivek kumar gupta',
      countryName: 'India',
      releaseDate: data.createdAt,
      type: 'article',
      tags: data.jobCategories.map((item) => item.name),
      siteName: 'AlgorithmicDev',
      title: `${data.companyName} is hiring for ${data.position} | Algorithmic Dev`,
      url: `https://algorithmicdev.in/jobs/${encodeURIComponent(data.slug)}`,
    },
    keywords: [data.companyName, data.jobCategories.map((item) => item.name)],
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
          <CustomCarousal>
            {relatedPosts.map((post) => (
              <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3 select-none">
                <JobCard categories={post.jobCategories} job={post} />
              </CarouselItem>
            ))}
          </CustomCarousal>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
