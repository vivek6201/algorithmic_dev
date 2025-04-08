import React from "react";
import TutorialCard from "./TutorialCard";

export default function TutorialsList() {
  return (
    <div className="flex flex-col gap-y-6">
      <TutorialCard
        title="Mastering JavaScript: From Zero to Hero"
        description="Comprehensive JavaScript course covering everything from fundamentals to advanced topics."
        chapters={12}
        duration="8 hours"
        difficulty="Intermediate"
        language="JavaScript"
        author="John Doe"
        publishedAt="Mar 25, 2025"
        tags={["Frontend", "ES6", "DOM"]}
      />

      <TutorialCard
        title="C++ DSA Crash Course"
        description="Step-by-step data structures and algorithms explained using C++."
        chapters={20}
        duration="15 hours"
        difficulty="Advanced"
        language="C++"
        author="Alice Johnson"
        publishedAt="Feb 12, 2025"
        tags={["DSA", "Competitive Programming"]}
      />
    </div>
  );
}
