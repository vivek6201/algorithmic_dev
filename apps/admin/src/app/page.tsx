import { AuthForm } from '@/components/site/pages/auth/AuthForm';
import { auth } from '@/lib/auth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
  title: 'Admin | AlgorithmicDev',
  description:
    'A One-Stop Solution for all your tech related queries. Be it Jobs, tutorials, courses, blogs, helper mini apps',
};

export default async function page() {
  const session = await auth();

  if (session?.user) redirect('/dashboard');

  return (
    <div className="min-h-screen flex flex-col gap-y-10 justify-center items-center">
      <h2 className="text-4xl font-extrabold text-center">
        Welcome Back, to{' '}
        <span className="bg-gradient-to-r from-blue-300 to-purple-500 text-transparent bg-clip-text">
          Algorithmic Dev
        </span>
      </h2>
      <AuthForm isLogin={true} />
    </div>
  );
}
