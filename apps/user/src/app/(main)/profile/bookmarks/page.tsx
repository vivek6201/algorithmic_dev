import ClientBookmark from '@/components/site/pages/profile/bookmarks/ClientBookmark';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'My Bookmarks | Profile - Algorithmic Dev',
  description:
    'A One-Stop Solution for all your tech related queries. Be it Jobs, tutorials, courses, blogs, helper mini apps',
};

export default function page() {
  return <ClientBookmark />;
}
