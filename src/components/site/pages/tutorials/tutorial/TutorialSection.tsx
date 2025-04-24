"use client";
import HTMLRenderer from "@/components/site/shared/HTMLRenderer";
import { Menu } from "lucide-react";
import React from "react";

export default function TutorialSection({
  data,
}: {
  data: {
    id: string;
    order: number;
    title: string;
    slug: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    chapterId: string;
  };
}) {
  console.log({ data });
  return (
    <div className="w-full h-full min-h-[800px]">
      <div className="flex w-full items-center gap-5 lg:hidden border-b py-2">
        <Menu size={18} className="opacity-70" />
      </div>
      <div className="w-full px-10">
        <HTMLRenderer content={data.content} />
      </div>
    </div>
  );
}
