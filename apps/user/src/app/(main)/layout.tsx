import AuthModal from '@/components/site/pages/auth/AuthModal';
import BugModal from '@/components/site/pages/main/Utility/Bug/BugModal';
import FeedbackModal from '@/components/site/pages/main/Utility/Feedback/FeedbackModal';
import BottomBar from '@/components/site/shared/BottomBar';
import Footer from '@/components/site/shared/Footer';
import Header from '@/components/site/shared/Header';
import React, { ReactNode } from 'react';

export default async function layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <Header />
      <main>{children}</main>
      <Footer />
      <BottomBar />
      <AuthModal />
      <BugModal />
      <FeedbackModal />
    </div>
  );
}
