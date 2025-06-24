import { SidebarItem } from '@/types/main';
import {
  BookOpen,
  Briefcase,
  ContactRound,
  FolderOpen,
  GraduationCap,
  Home,
  LayoutDashboard,
  ListFilter,
  LucideIcon,
  MessagesSquare,
  Newspaper,
  User,
  Workflow,
} from '@repo/ui';

export const headerLinks: {
  name: string;
  link: string;
  icon: LucideIcon;
}[] = [
  {
    name: 'Home',
    link: '/',
    icon: Home,
  },
  {
    name: 'Jobs',
    icon: Briefcase,
    link: '/jobs',
  },
  {
    name: 'Tutorials',
    icon: GraduationCap,
    link: '/tutorials',
  },
  {
    name: 'Blogs',
    icon: BookOpen,
    link: '/blogs',
  },
];

export const sidebarItems: SidebarItem[] = [
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
  {
    name: 'Feedback',
    href: '/dashboard/feedbacks',
    icon: MessagesSquare,
  },
];
