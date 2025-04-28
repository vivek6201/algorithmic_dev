'use client';
import React from 'react';
import FeatureCard from './FeatureCard';
import { BookOpen, Briefcase, GraduationCap } from 'lucide-react';

export default function FeatureSection() {
  return (
    <div className="min-h-[500px] flex items-center justify-center flex-col gap-y-8 my-5">
      <div className="">
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white sm:text-4xl relative inline-block text-center">
          Everything you need to succeed in tech
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-gray-500 mx-auto text-center">
          Our platform combines the essential tools and resources for your tech career journey
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center">
        <FeatureCard
          title="Find Your Next Tech Role"
          description="Browse thousands of tech jobs from top companies. Filter by your skills, experience level, or location to find the perfect match."
          icon={Briefcase}
          buttonText="Explore Jobs"
          link="/jobs"
        />
        <FeatureCard
          title="Learn new concepts from in-depth tutorials"
          description="Tutorials are made with keeping in mind that beginners will learn and grow."
          icon={GraduationCap}
          buttonText="Explore Tutorials"
          link="/tutorials"
        />
        <FeatureCard
          title="Read and learn from Technical Blogs"
          description="Stay informed with the latest tech news and insights. Share your own knowledge by publishing articles and building your professional brand."
          icon={BookOpen}
          buttonText="Explore Blogs"
          link="/blogs"
        />
      </div>
    </div>
  );
}
