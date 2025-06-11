import BottomBar from '@/components/site/shared/BottomBar';
import Footer from '@/components/site/shared/Footer';
import Header from '@/components/site/shared/Header';
import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Algorithmic Dev',
  description:
    'A One-Stop Solution for all your tech related queries. Be it Jobs, tutorials, courses, blogs, helper mini apps',
};

export default async function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <BottomBar />
      <Footer />
    </>
  );
}
