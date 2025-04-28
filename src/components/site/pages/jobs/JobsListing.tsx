"use client";
import { useSearchParams } from "next/navigation";
import JobCard from "./JobCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const JobListings = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const type = searchParams.get("type");
  const experience = searchParams.get("experience");

  const fetchJobs = async (
    category: string | null,
    type: string | null,
    experience: string | null
  ) => {
    const response = await axios.get("/api/jobs", {
      params: {
        category: category,
        type: type,
        experience: experience,
      },
    });
    return response.data?.data ?? [];
  };

  const {
    data: jobs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["jobs", category, type, experience],
    queryFn: () => fetchJobs(category, type, experience),
  });

  return (
    <main className="flex-1 max-w-4xl mx-auto space-y-6">
      {isLoading && <p>Loading jobs...</p>}
      {isError && <p>Failed to load jobs.</p>}
      {!isLoading && jobs.length <= 0 && <p>No jobs found</p>}
      {jobs?.map((job: any) => {
        return <JobCard key={job.id} categories={job.jobCategories} job={job} />;
      })}
    </main>
  );
};

export default JobListings;
