"use client";

import { ExperienceLevel, JobType } from "@/generated/prisma";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

interface CategoryType {
  name: string;
  id: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const types = [
  { name: "Full-Time", value: JobType.FullTime },
  { name: "Internship", value: JobType.Internship },
];

const experience = [
  { name: "Entry Level (Freshers)", value: ExperienceLevel.ENTRY_LEVEL },
  { name: "Mid Level (1 - 3 Years)", value: ExperienceLevel.MID_LEVEL },
  { name: "Senior Level (3+ Years)", value: ExperienceLevel.SENIOR_LEVEL },
];

const JobFilters = ({ data }: { data: CategoryType[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategories = searchParams.get("category")?.split(",") ?? [];
  const selectedJobTypes = searchParams.get("type")?.split(",") ?? [];
  const selectedExperience = searchParams.get("experience")?.split(",") ?? [];

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get(key)?.split(",") ?? [];

    let updated: string[];
    if (current.includes(value)) {
      updated = current.filter((item) => item !== value);
    } else {
      updated = [...current, value];
    }

    if (updated.length > 0) {
      params.set(key, updated.join(","));
    } else {
      params.delete(key);
    }

    router.replace(`?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("type");
    params.delete("experience");
    router.replace(`?${params.toString()}`);
  };

  return (
    <aside className="space-y-6 text-sm">
      {/* Category */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Category</h3>
        <div className="flex flex-wrap gap-2">
          {data.map((category) => {
            const isSelected = selectedCategories.includes(category.slug);
            return (
              <button
                key={category.id}
                onClick={() => updateParams("category", category.slug)}
                className={`px-3 py-1 rounded-full border cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-blue-500 text-white dark:bg-blue-600 border-blue-500"
                    : "hover:bg-blue-100 dark:hover:bg-blue-700 dark:text-gray-300 border dark:border-gray-600"
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Job Type */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Job Type</h3>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => {
            const isSelected = selectedJobTypes.includes(t.value);
            return (
              <button
                key={t.value}
                onClick={() => updateParams("type", t.value)}
                className={`px-3 py-1 rounded-full border cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-blue-500 text-white dark:bg-blue-600 border-blue-500"
                    : "hover:bg-blue-100 dark:hover:bg-blue-700 dark:text-gray-300 border dark:border-gray-600"
                }`}
              >
                {t.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Experience */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Experience</h3>
        <div className="flex flex-wrap gap-2">
          {experience.map((e) => {
            const isSelected = selectedExperience.includes(e.value);
            return (
              <button
                key={e.value}
                onClick={() => updateParams("experience", e.value)}
                className={`px-3 py-1 rounded-full border cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-blue-500 text-white dark:bg-blue-600 border-blue-500"
                    : "hover:bg-blue-100 dark:hover:bg-blue-700 dark:text-gray-300 border dark:border-gray-600"
                }`}
              >
                {e.name}
              </button>
            );
          })}
        </div>
      </div>

      {(selectedCategories.length > 0 ||
        selectedJobTypes.length > 0 ||
        selectedExperience.length > 0) && (
        <button
          onClick={clearFilters}
          className="mt-4 text-sm px-4 py-1 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
        >
          Clear Filters
        </button>
      )}
    </aside>
  );
};

export default JobFilters;
