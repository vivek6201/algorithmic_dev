import { ExperienceLevel, JobType } from '@repo/db';
import { BookOpen, Briefcase, GraduationCap, Home, LucideIcon, User } from '@repo/ui';
import { v4 as uuid } from 'uuid';

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
  {
    name: 'User',
    icon: User,
    link: '/profile',
  },
];

export const jobTypes = [
  { name: 'Full-Time', value: JobType.FullTime },
  { name: 'Internship', value: JobType.Internship },
];

export const jobExperience = [
  { name: 'Entry Level (Freshers)', value: ExperienceLevel.ENTRY_LEVEL },
  { name: 'Mid Level (1 - 3 Years)', value: ExperienceLevel.MID_LEVEL },
  { name: 'Senior Level (3+ Years)', value: ExperienceLevel.SENIOR_LEVEL },
];

export const jobTabs = [
  { id: uuid(), label: 'category' },
  { id: uuid(), label: 'type' },
  { id: uuid(), label: 'experience' },
];

export const blogTabs = [
  { id: uuid(), label: 'category' },
  // { id: uuid(), label: 'sort' },
];

export const tutorialFilterTabs = [
  { id: uuid(), label: 'category' },
  // { id: uuid(), label: '' },
];
