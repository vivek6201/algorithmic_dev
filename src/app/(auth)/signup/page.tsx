import { AuthForm } from "@/components/site/pages/auth/AuthForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Become an AlgoDev",
  description:
    "A One-Stop Solution for all your tech related queries. Be it Jobs, tutorials, courses, blogs, helper mini apps",
};

export default function page() {
  return (
    <div className="min-h-[900px] flex flex-col gap-y-10 justify-center items-center">
      <h2 className="text-4xl font-extrabold">
        Welcome, to{" "}
        <span className="bg-gradient-to-r from-blue-300 to-purple-500 text-transparent bg-clip-text">
          Algorithmic Dev
        </span>
      </h2>
      <AuthForm isLogin={false} />
    </div>
  );
}
