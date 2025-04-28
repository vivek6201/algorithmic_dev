"use client";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Briefcase,
  GraduationCap,
  Menu,
  PackageSearch,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ProfileSheet from "../pages/profile/ProfileSheet";
import ThemeToggler from "./theme-toggler";

export default function Header() {
  const session = useSession();
  const router = useRouter();

  return (
    <div className="py-4 backdrop-blur-lg sticky top-0 left-0 right-0 z-50">
      <div className="w-11/12 max-w-[1400px] mx-auto flex justify-between items-center">
        <Link className="font-bold text-xl " href={"/"}>
          Algorithmic Dev
        </Link>
        <div className="lg:hidden">
          {session.status === "authenticated" ? (
            <ProfileSheet />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"}>
                  <Menu className="dark:text-white text-black" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/login")}>
                  Login
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/signup")}>
                  Signup
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div className="lg:flex gap-2 items-center hidden">
          <Button
            variant={"link"}
            className="cursor-pointer"
            onClick={() => router.push("/jobs")}
          >
            <Briefcase />
            <span>Jobs</span>
          </Button>
          <Button
            variant={"link"}
            className="cursor-pointer"
            onClick={() => router.push("/tutorials")}
          >
            <GraduationCap />
            <span>Tutorials</span>
          </Button>
          <Button
            variant={"link"}
            className="cursor-pointer"
            onClick={() => router.push("/blogs")}
          >
            <BookOpen />
            <span>Blogs</span>
          </Button>
          <Button
            variant={"link"}
            className="cursor-pointer"
            onClick={() => router.push("/products")}
          >
            <PackageSearch />
            <span>Products</span>
          </Button>
          <div className="flex gap-2 items-center ml-5">
            {session.status === "authenticated" ? (
              <ProfileSheet />
            ) : (
              <>
                <Button
                  variant={"outline"}
                  className="cursor-pointer"
                  onClick={() => router.push("/login")}
                >
                  Sign in
                </Button>
                <Button
                  className="cursor-pointer"
                  onClick={() => router.push("/signup")}
                >
                  Sign up
                </Button>
              </>
            )}

            <ThemeToggler />
          </div>
        </div>
      </div>
    </div>
  );
}
