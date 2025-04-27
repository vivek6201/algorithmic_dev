"use client"
import { useSearchParams } from "next/navigation";
import JobCard from "./JobCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const JobListings = () => {
  const searchParams = useSearchParams();
  const categories = searchParams.get("category");

  const fetchBlogs = async (categories: string | null) => {
    const response = await axios.get("/api/jobs", {
      params: { category: categories ?? undefined },
    });
    return response.data.data;
  };

  const {
    data: jobs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["jobs", categories],
    queryFn: () => fetchBlogs(categories),
  });

  return (
    <main className="flex-1 max-w-4xl mx-auto space-y-6">
      {isLoading && <p>Loading tutorials...</p>}
      {isError && <p>Failed to load tutorials.</p>}
      {jobs?.map((job: any) => {
        return <JobCard key={job.id} {...job} />;
      })}
    </main>
  );
};

export default JobListings;
