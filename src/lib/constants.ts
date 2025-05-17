import { BookOpen, Briefcase, GraduationCap, Home, LucideIcon } from 'lucide-react';

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
