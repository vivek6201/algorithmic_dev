import { Button } from "@/components/ui/button";
import React from "react";

export default function HeroSection() {
  return (
    <div className="min-h-[800px] flex items-center justify-center flex-col gap-y-8">
      <h1 className="max-w-[90%] md:max-w-[70%] text-center font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
        Your <span className="text-blue-500">ultimate hub</span> for everything in
        tech career!
      </h1>
      <div className="flex items-center gap-4 mt-5 w-11/12 flex-wrap justify-center">
        <Button className="rounded-full shadow cursor-pointer" variant={"outline"} size={"lg"}>
          Find Jobs
        </Button>
        <Button className="bg-blue-500 shadow hover:bg-blue-400 dark:bg-neutral-800 dark:hover:bg-neutral-700 cursor-pointer rounded-full dark:text-white" size={"lg"}>
          Explore Platform
        </Button>
        <Button className="rounded-full shadow cursor-pointer" variant={"outline"} size={"lg"}>
          Explore Courses
        </Button>
      </div>
    </div>
  );
}
