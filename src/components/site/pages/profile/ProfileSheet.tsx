"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Github, LogOut, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";

export default function ProfileSheet() {
  const session = useSession();
  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer" asChild>
        <div className="w-5 h-5 flex justify-center items-center p-5 rounded-full bg-blue-500">
          <p className="text-white">{session.data?.user?.name?.[0]}</p>
        </div>
      </SheetTrigger>
      <SheetContent className="[&>button:first-of-type]:hidden">
        <SheetHeader className="px-3 flex w-full justify-between items-center flex-row">
          <SheetTitle className="text-2xl">Profile</SheetTitle>
          <SheetClose>
            <X />
          </SheetClose>
        </SheetHeader>
        <Separator className="-translate-y-3.5" />

        <div className="rounded-xl shadow px-5">
          <div className="rounded-lg border p-4 md:p-5 grid grid-cols-1 gap-y-2 md:grid-cols-[40%_1fr] items-center">
            {session.data?.user?.image ? (
              <Image
                src={session.data.user.image}
                alt="profile image"
                width={500}
                height={500}
                className="w-32 h-32 rounded-full"
              />
            ) : (
              <div className="w-24 aspect-square flex justify-center items-center p-5 rounded-full bg-blue-500">
                <p className="text-white text-4xl">
                  {session.data?.user?.name?.[0]}
                </p>
              </div>
            )}
            <div className="">
              <h2 className="font-semibold text-lg">
                {session.data?.user?.name}
              </h2>
              <p className="text-sm opacity-70">{session.data?.user?.email}</p>
              <p className="text-sm opacity-70">{session.data?.user?.role}</p>
              <Button variant={"outline"} className="w-full mt-2">Dashboard</Button>
            </div>
          </div>
        </div>

        <SheetFooter className="px-0">
          <Separator />
          <div className="w-full px-3 pt-2 flex flex-col gap-y-2">
            <Button
              size={"lg"}
              variant={"secondary"}
              className="cursor-pointer"
              onClick={() => router.push("/admin")}
            >
              Admin Dashboard
            </Button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-row ">
              <Button variant={"outline"} size={"lg"} onClick={() => signOut()}>
                <LogOut />
                Logout
              </Button>
              <Button size={"lg"}>
                <Github />
                Contribute
              </Button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
