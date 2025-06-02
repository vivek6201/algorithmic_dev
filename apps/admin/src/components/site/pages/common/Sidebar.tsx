'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, JSX } from 'react';
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
  clsx,
  Workflow,
  User,
  ContactRound,
  LayoutDashboard,
} from '@repo/ui';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@repo/ui/components/ui/sheet';
import { Button } from '@repo/ui/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@repo/ui/components/ui/accordion';
import { signOut, useSession } from 'next-auth/react';

interface SidebarChildItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: SidebarChildItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Jobs',
    href: '/dashboard/jobs/all',
    icon: Briefcase,
    children: [
      { name: 'Categories', href: '/dashboard/jobs/categories', icon: FolderOpen },
      { name: 'All jobs', href: '/dashboard/jobs', icon: FolderOpen },
    ],
  },
  {
    name: 'Tutorials',
    href: '/dashboard/tutorials/all',
    icon: BookOpen,
    children: [
      { name: 'Categories', href: '/dashboard/tutorials/categories', icon: FolderOpen },
      { name: 'All Tutorials', href: '/dashboard/tutorials', icon: ListFilter },
    ],
  },
  {
    name: 'Blogs',
    href: '/dashboard/blogs/all',
    icon: Newspaper,
    children: [
      { name: 'Categories', href: '/dashboard/blogs/categories', icon: FolderOpen },
      { name: 'All Blogs', href: '/dashboard/blogs', icon: ListFilter },
    ],
  },
  {
    name: 'Actions',
    href: '/dashboard/actions',
    icon: Workflow,
    children: [
      { name: 'Profile', href: '/dashboard/actions/profile', icon: User },
      { name: 'List Admins', href: '/dashboard/actions/list-admins', icon: ContactRound },
    ],
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const session = useSession();
  const isLinkActive = (href: string): boolean => pathname === href;
  const isSuperAdmin = session?.data?.user?.role === 'SuperAdmin';

  const hasActiveChild = (item: SidebarItem) =>
    item.children?.some((child) => isLinkActive(child.href));

  const renderButtonLink = (
    item: SidebarItem | SidebarChildItem,
    isMobile: boolean = false,
    isChild: boolean = false,
  ) => (
    <Link key={item.href} href={item.href} passHref>
      <Button
        variant="ghost"
        className={clsx(
          'w-full flex items-center gap-3 justify-start px-4 py-2 rounded-md transition-all font-medium',
          isLinkActive(item.href)
            ? 'bg-white text-gray-900 shadow-md'
            : 'hover:bg-gray-700 hover:shadow-sm',
          collapsed && !isMobile ? 'justify-center px-0' : '',
          isChild ? 'text-sm pl-8' : '',
          'mt-2',
        )}
      >
        <item.icon className="w-5 h-5" />
        {(!collapsed || isMobile) && <span>{item.name}</span>}
      </Button>
    </Link>
  );

  const renderAccordion = (item: SidebarItem, isMobile: boolean = false): JSX.Element => (
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
            'flex items-center gap-3 px-4 py-2 rounded-md transition-all font-medium',
            isLinkActive(item.href)
              ? 'bg-white text-gray-900 shadow-md'
              : 'hover:bg-gray-700 hover:shadow-sm',
          )}
        >
          <div className="flex items-center gap-3">
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pl-4 mt-1 space-y-1">
          {item.children?.map((child) => renderButtonLink(child, isMobile, true))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden p-4 bg-neutral-800 text-white flex items-center justify-between shadow-md">
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
              {sidebarItems.map((item) => {
                if (item.children) {
                  const filteredChildren = item.children.filter((child) => {
                    if (child.name === 'List Admins' && !isSuperAdmin) return false;
                    return true;
                  });

                  if (filteredChildren.length === 0) return null;

                  return renderAccordion({ ...item, children: filteredChildren }, true);
                }

                return renderButtonLink(item, true);
              })}
            </nav>
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
                    redirectTo: '/',
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

      {/* Desktop */}
      <aside
        className={clsx(
          'hidden lg:flex flex-col justify-between bg-gradient-to-b from-neutral-900 to-neutral-800 text-white h-screen transition-all duration-300 ease-in-out shadow-lg',
          collapsed ? 'w-20' : 'w-64',
        )}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            {!collapsed && <h2 className="text-xl font-bold">Algorithmic Dev</h2>}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setCollapsed(!collapsed)}
              className="text-white"
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </Button>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              if (item.children) {
                const filteredChildren = item.children.filter((child) => {
                  // Hide "List Admins" if not superAdmin
                  if (child.name === 'List Admins' && !isSuperAdmin) return false;
                  return true;
                });

                // If no children left, skip rendering
                if (filteredChildren.length === 0) return null;

                return renderAccordion({ ...item, children: filteredChildren });
              }

              return renderButtonLink(item);
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700 space-y-2">
          <Button
            onClick={() =>
              signOut({
                redirectTo: '/',
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
