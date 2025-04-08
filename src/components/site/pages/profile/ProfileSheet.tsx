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

export default function ProfileSheet() {
  const session = useSession();
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer">
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

        <div className="rounded-xl shadow p-5"></div>

        <SheetFooter className="px-0">
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-row w-full px-3 pt-2">
            <Button variant={"outline"} size={"lg"} onClick={() => signOut()}>
              <LogOut />
              Logout
            </Button>
            <Button size={"lg"}>
              <Github />
              Contribute
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
