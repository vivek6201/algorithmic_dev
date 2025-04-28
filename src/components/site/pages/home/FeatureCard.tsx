"use client";
import React from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "nextjs-toploader/app";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  buttonText: string;
  link: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  buttonText,
  link,
}) => {
  const router = useRouter();
  return (
    <div className="w-11/12 aspect-square hover:scale-105 transition-all duration-300 rounded-md border p-5 flex flex-col gap-y-5 justify-evenly items-center">
      <div className="rounded-full p-2 bg-gray-400 w-fit">
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-2xl md:text-3xl font-bold text-center">{title}</p>
      <p className="text-center">{description}</p>
      <Button onClick={() => router.push(link)} className="cursor-pointer">{buttonText}</Button>
    </div>
  );
};

export default FeatureCard;
