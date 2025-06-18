import { ExperienceLevel, FeedbackType, JobType } from '@repo/db';
import {
  BookOpen,
  Briefcase,
  Bug,
  GraduationCap,
  Home,
  Lightbulb,
  LucideIcon,
  MessageCircle,
  User,
} from '@repo/ui';
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

export const feedbackTypes = [
  {
    id: FeedbackType.Bug,
    label: 'Bug Report',
    description: 'Report a bug or issue',
    icon: Bug,
    color: 'text-red-600 dark:text-red-300',
    bgColor: 'bg-red-50 border-red-200 dark:bg-red-400/40',
  },
  {
    id: FeedbackType.Suggestions,
    label: 'Feature Request',
    description: 'Suggest a new feature',
    icon: Lightbulb,
    color: 'text-yellow-600 dark:text-yellow-300',
    bgColor: 'bg-yellow-50 dark:bg-yellow-400/40 border-yellow-200',
  },
  {
    id: FeedbackType.General,
    label: 'General Feedback',
    description: 'Share your thoughts',
    icon: MessageCircle,
    color: 'text-blue-600 dark:text-blue-300',
    bgColor: 'bg-blue-50 dark:bg-blue-400/40 border-blue-200',
  },
] as const;
