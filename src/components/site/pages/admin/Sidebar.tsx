"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import {
  Briefcase,
  BookOpen,
  Newspaper,
  Menu,
  LogOut,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const links = [
  { name: "Jobs", href: "/admin/jobs", icon: Briefcase },
  { name: "Tutorials", href: "/admin/tutorials", icon: BookOpen },
  { name: "Blog", href: "/admin/blogs", icon: Newspaper },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Sheet */}
      <div className="md:hidden p-4 bg-neutral-800 text-white flex items-center justify-between shadow-md">
        <h2 className="text-xl font-bold tracking-tight">Algorithmic Dev</h2>
        <Sheet>
          <SheetTrigger asChild>
            <button aria-label="Toggle Mobile Menu">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-4 bg-neutral-900 text-white">
            <SheetHeader>
              <SheetTitle className="text-white text-xl">Admin Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 space-y-2">
              {links.map(({ name, href, icon: Icon }) => {
                const isActive = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={clsx(
                      "flex items-center gap-3 px-4 py-2 rounded-md transition-all font-medium",
                      isActive
                        ? "bg-white text-gray-900 shadow-md"
                        : "hover:bg-gray-700 hover:shadow-sm"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{name}</span>
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={clsx(
          "hidden md:flex flex-col justify-between bg-gradient-to-b from-neutral-900 to-neutral-800 text-white h-screen transition-all duration-300 ease-in-out shadow-lg",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="p-4">
          {/* Collapse Toggle */}
          <div className="flex justify-between items-center mb-6">
            {!collapsed && (
              <h2 className="text-xl font-bold">Algorithmic Dev</h2>
            )}
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => setCollapsed(!collapsed)}
              className="text-white"
            >
              {collapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {links.map(({ name, href, icon: Icon }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    "flex items-center gap-3 px-4 py-1 rounded-md transition-all font-medium",
                    isActive
                      ? "bg-white text-gray-900 shadow-md"
                      : "hover:bg-gray-700 hover:shadow-sm"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {!collapsed && <span>{name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 rounded-md transition-all hover:bg-gray-700"
          >
            <Globe className="w-5 h-5" />
            {!collapsed && <span>Go to Website</span>}
          </Link>
          <Button
            onClick={() =>
              signOut({
                redirectTo: "/",
              })
            }
            className="w-full"
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
