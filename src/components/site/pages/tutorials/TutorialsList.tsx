"use client";

import React from "react";
import TutorialCard from "./TutorialCard";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function TutorialsList() {
  const searchParams = useSearchParams();
  const categories = searchParams.get("category");

  const fetchTutorials = async (categories: string | null) => {
    const response = await axios.get("/api/tutorials", {
      params: { category: categories ?? undefined },
    });
    return response.data.data;
  };

  const {
    data: tutorials = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tutorials", categories],
    queryFn: () => fetchTutorials(categories),
  });

  return (
    <div className="flex flex-col gap-y-6">
      {isLoading && <p>Loading tutorials...</p>}
      {isError && <p>Failed to load tutorials.</p>}
      {tutorials?.map((tutorial: any) => {
        return (
          <TutorialCard
            key={tutorial.id}
            title={tutorial.title}
            description={tutorial.description}
            chapters={tutorial._count.chapters}
            slug={tutorial.slug}
            topicSlug={tutorial?.chapters?.[0].topics?.[0].slug}
            publishedAt={new Date(tutorial.createdAt).toDateString()}
            tags={tutorial.categories.map((c: any) => c.category.name)}
          />
        );
      })}
    </div>
  );
}
