import { Input } from "@/components/ui/input";
import React from "react";
import BlogCard from "./BlogCard";

function BlogsList() {
  return (
    <div className="flex flex-col gap-y-5">
      <BlogCard
        author="Vivek"
        category="Web Dev"
        date="10 jan"
        description="vnsiovsvls mvopsmv sdmvps fsfo mwsfpws fnsco wnfpsm jmpafm"
        title="Intro to Web Dev"
      />
      <BlogCard
        author="Vivek"
        category="Web Dev"
        date="10 jan"
        description="vnsiovsvls mvopsmv sdmvps fsfo mwsfpws fnsco wnfpsm jmpafm"
        title="Intro to Web Dev"
      />
      <BlogCard
        author="Vivek"
        category="Web Dev"
        date="10 jan"
        description="vnsiovsvls mvopsmv sdmvps fsfo mwsfpws fnsco wnfpsm jmpafm"
        title="Intro to Web Dev"
      />
      <BlogCard
        author="Vivek"
        category="Web Dev"
        date="10 jan"
        description="vnsiovsvls mvopsmv sdmvps fsfo mwsfpws fnsco wnfpsm jmpafm"
        title="Intro to Web Dev"
      />
      <BlogCard
        author="Vivek"
        category="Web Dev"
        date="10 jan"
        description="vnsiovsvls mvopsmv sdmvps fsfo mwsfpws fnsco wnfpsm jmpafm"
        title="Intro to Web Dev"
      />
    </div>
  );
}

export default BlogsList;
