import JobHeaderBlock from "@/components/site/pages/jobs/JobHeaderBlock";
import Breadcrumbs from "@/components/site/shared/Breadcrumb";
import HTMLRenderer from "@/components/site/shared/HTMLRenderer";
import { Button } from "@/components/ui/button";
import { getClientJobBySlug } from "@/helpers/main/jobsGetter";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { success, data } = await getClientJobBySlug(slug);

  if (!success || !data) {
    return {
      title: "Job not found",
      description: "This job does not exist.",
    };
  }

  return {
    title: `${data.title} | Algorithmic Dev`,
    description: data.shortDescription,
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { success, data } = await getClientJobBySlug(slug);

  if (!success || !data) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Data not available</p>
      </div>
    );
  }
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 mt-5 mb-16 text-gray-800 dark:text-gray-100 ">
      {/* Breadcrumb */}
      <Breadcrumbs />

      {/* Header */}
      <JobHeaderBlock title={data.title} slug={data.slug} />

      {/* Meta */}
      <div className="flex flex-wrap items-center text-sm gap-4 mb-6"></div>

      {/* Blog Content */}
      <article className="prose lg:prose-lg dark:prose-invert max-w-none opacity-80">
        {<HTMLRenderer content={data.description} />}
      </article>

      <Link href={data.link} target="_blank" className="my-10">
        <Button size={"lg"} className="cursor-pointer">
          Apply <ChevronRight />
        </Button>
      </Link>
    </div>
  );
}
