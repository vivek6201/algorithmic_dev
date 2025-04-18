"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

export default function ChapterList({ chapters }) {
  return (
    <div className="w-full h-full flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <p className="uppercase font-medium">Chapters</p>
        <Button size={"icon"} variant={"outline"}>
          <Plus />
        </Button>
      </div>
      <div className="flex-1 w-full">
        
      </div>
    </div>
  );
}
