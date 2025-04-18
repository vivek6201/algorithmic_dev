"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX, useState } from "react";
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
  FolderOpen,
  ListFilter,
  Users,
  Settings,
  LineChart,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { signOut } from "next-auth/react";

interface SidebarChildItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: SidebarChildItem[];
}

// Define sidebar navigation data structure
const sidebarItems = [
  {
    name: "Jobs",
    href: "/admin/jobs",
    icon: Briefcase,
    children: [], // No children for Jobs section
  },
  {
    name: "Tutorials",
    href: "/admin/tutorials",
    icon: BookOpen,
    children: [
      {
        name: "Categories",
        href: "/admin/tutorials/categories",
        icon: FolderOpen,
      },
      {
        name: "All Tutorials",
        href: "/admin/tutorials",  // Fixed path - was missing '/all'
        icon: ListFilter,
      },
    ],
  },
  {
    name: "Blogs",
    href: "/admin/blogs",
    icon: Newspaper,
    children: [
      {
        name: "Categories",
        href: "/admin/blogs/categories",
        icon: FolderOpen,
      },
      {
        name: "All Blogs",
        href: "/admin/blogs",  // Fixed path - was missing '/all'
        icon: ListFilter,
      },
    ],
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Fixed isLinkActive function to properly handle parent/child relationships
  const isLinkActive = (href: string): boolean => {
    // Exact match
    if (pathname === href) return true;
    
    // Special handling for parent items
    if (href.endsWith('/blogs') || href.endsWith('/tutorials')) {
      // If this is a parent path (like /admin/blogs), then it should be active only if
      // we're on exactly that path, not when we're on a child path
      return pathname === href;
    }
    
    // For all other cases, use startsWith for checking prefix matches
    return pathname.startsWith(href);
  };

  // Check if any children are active
  const hasActiveChild = (item: SidebarItem): boolean => {
    return item.children.some(child => isLinkActive(child.href));
  };

  // Generate expanded accordion state
  const getDefaultAccordion = (): string[] => {
    const activeAccordions = sidebarItems
      .filter(item => item.children.length > 0 && hasActiveChild(item))
      .map(item => item.name.toLowerCase());
    
    return activeAccordions;
  };

  const renderMainLink = (item: SidebarItem, isMobile: boolean = false) => (
    <Link
      key={item.href}
      href={item.href}
      className={clsx(
        "flex items-center gap-3 px-4 py-2 rounded-md transition-all font-medium",
        isMobile ? "" : collapsed ? "justify-center" : "",
        isLinkActive(item.href) && !hasActiveChild(item)
          ? "bg-white text-gray-900 shadow-md"
          : "hover:bg-gray-700 hover:shadow-sm"
      )}
    >
      <item.icon className="w-5 h-5" />
      {(!collapsed || isMobile) && <span>{item.name}</span>}
    </Link>
  );

  // Generate accordion for items with children
  const renderAccordion = (
    item: SidebarItem,
    isMobile: boolean = false
  ): JSX.Element => (
    <Accordion
      type="single"
      collapsible
      defaultValue={hasActiveChild(item) ? item.name.toLowerCase() : undefined}
      className="border-none"
      key={item.href}
    >
      <AccordionItem value={item.name.toLowerCase()} className="border-none">
        <AccordionTrigger
          className={clsx(
            "flex items-center gap-3 px-4 py-2 rounded-md transition-all font-medium",
            isLinkActive(item.href) && !hasActiveChild(item)
              ? "bg-white text-gray-900 shadow-md"
              : "hover:bg-gray-700 hover:shadow-sm"
          )}
        >
          <div className="flex items-center gap-3">
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pl-10 space-y-1 mt-1">
          {item.children.map((child: SidebarChildItem) => (
            <Link
              key={child.href}
              href={child.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-2 rounded-md transition-all font-medium",
                isLinkActive(child.href)
                  ? "bg-white text-gray-900 shadow-md"
                  : "hover:bg-gray-700 hover:shadow-sm"
              )}
            >
              <child.icon className="w-4 h-4" />
              <span>{child.name}</span>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

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
          <SheetContent
            side="left"
            className="flex flex-col p-4 bg-neutral-900 text-white overflow-y-auto"
          >
            <SheetHeader>
              <SheetTitle className="text-white text-xl">Admin Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 space-y-2 flex-1">
              {sidebarItems.map((item) =>
                item.children.length === 0
                  ? renderMainLink(item, true)
                  : renderAccordion(item, true)
              )}
            </nav>

            {/* Mobile Footer */}
            <div className="mt-6 border-t border-gray-700 pt-4 space-y-2">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-2 rounded-md transition-all hover:bg-gray-700"
              >
                <Globe className="w-5 h-5" />
                <span>Go to Website</span>
              </Link>
              <Button
                onClick={() =>
                  signOut({
                    redirectTo: "/",
                  })
                }
                className="w-full"
              >
                <LogOut className="w-5 h-5 mr-2" />
                <span>Logout</span>
              </Button>
            </div>
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
              size="icon"
              variant="ghost"
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
            {collapsed
              ? // Collapsed view - just icons for all items
                sidebarItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      "flex items-center justify-center px-4 py-2 rounded-md transition-all",
                      isLinkActive(item.href) && !hasActiveChild(item)
                        ? "bg-white text-gray-900 shadow-md"
                        : "hover:bg-gray-700 hover:shadow-sm"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                  </Link>
                ))
              : // Expanded view with accordions
                sidebarItems.map((item) =>
                  item.children.length === 0
                    ? renderMainLink(item)
                    : renderAccordion(item)
                )}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 rounded-md transition-all hover:bg-gray-700 justify-center"
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
            className="w-full flex items-center justify-center"
            variant="default"
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;