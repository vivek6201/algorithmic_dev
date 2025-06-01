'use client';
import { useSearchParams } from 'next/navigation';
import JobCard from './JobCard';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef, useCallback } from 'react';

const LIMIT = 10;

const JobListings = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const type = searchParams.get('type');
  const experience = searchParams.get('experience');

  const fetchJobs = async ({ pageParam = 1 }) => {
    const response = await axios.get('/api/jobs', {
      params: {
        category,
        type,
        experience,
        page: pageParam,
        limit: LIMIT,
      },
    });
    return {
      jobs: response.data?.data ?? [],
      nextPage: response.data?.data?.length === LIMIT ? pageParam + 1 : null,
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['jobs', category, type, experience],
      queryFn: fetchJobs,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 1,
    });

  const observer = useRef<IntersectionObserver | null>(null);

  const lastJobRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries?.[0]?.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  const jobs = data?.pages.flatMap((page) => page.jobs) ?? [];

  return (
    <main className="flex-1 w-full mx-auto space-y-6">
      {isLoading && <p>Loading jobs...</p>}
      {isError && <p>Failed to load jobs.</p>}
      {!isLoading && jobs.length <= 0 && <p>No jobs found</p>}
      {jobs.map((job: any, index: number) => {
        const isLast = index === jobs.length - 1;
        return (
          <div ref={isLast ? lastJobRef : null} key={job.id}>
            <JobCard categories={job.jobCategories} job={job} />
          </div>
        );
      })}
      {isFetchingNextPage && <p>Loading more jobs...</p>}
    </main>
  );
};

export default JobListings;
