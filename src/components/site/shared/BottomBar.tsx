"use client";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Home, LucideIcon, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function BottomBar() {
  const session = useSession();
  return (
    <div className="p-1 border-t lg:hidden fixed bottom-0 left-0 right-0 dark:bg-neutral-900 h-16 bg-white flex gap-2 justify-between items-center z-50">
      <MobileItem title="Home" icon={Home} link="/" />
      <MobileItem title="Tutorials" icon={GraduationCap} link="/tutorials" />
      <MobileItem title="Blogs" icon={BookOpen} link="/blogs" />
      <MobileItem
        title="Profile"
        icon={User}
        link={session.status === "authenticated" ? "/profile" : "/login"}
      />
    </div>
  );
}

function MobileItem({
  title,
  link,
  icon: Icon,
}: {
  title: string;
  link: string;
  icon: LucideIcon;
}) {
  return (
    <Link href={link}>
      <Button variant={"ghost"} className="flex flex-col gap-y-1">
        <Icon />
        <p>{title}</p>
      </Button>
    </Link>
  );
}
