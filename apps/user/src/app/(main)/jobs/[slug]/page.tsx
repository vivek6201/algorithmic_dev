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
      <article className="prose lg:prose-lg dark:prose-invert max-w-none opacity-80 mb-5">
        {<HTMLRenderer content={data.description} />}
      </article>
      <div className="bg-blue-400/20 rounded-md p-5 leading-tight w-full border border-blue-400 text-black dark:text-white">
        <p>
          These opportunities were not posted on our platform and are from the official career page
          of their respective companies We have filtered these jobs for you so that you get
          everything at one place on our platform. Share these opportunities with your friends as
          well to let them know.
        </p>
        <p className="mt-2">
          Read our{' '}
          <Link href={'/tnc'} className="italic underline dark:text-blue-300 text-blue-800">
            Terms and Conditions
          </Link>
        </p>
        <p className="mt-5">- Team AlgorithmicDev</p>
      </div>

      <Link href={data.link} target="_blank">
        <Button size={'lg'} className="cursor-pointer mt-10">
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
