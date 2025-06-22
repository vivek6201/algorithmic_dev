'use client';

import LazyImage from '@repo/ui/components/elements/LazyImage';
import { Button } from '@repo/ui/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function NotFoundClient() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-10">
      <p className="font-bold text-xl">Oops! Looks like you are got lost…</p>
      <LazyImage
        src={'/not-found.svg'}
        alt="not found"
        width={500}
        height={500}
        className="w-72 h-72"
      />
      <Link href={'/?ref=not-found'}>
        <Button className="dark:text-white">Go Home</Button>
      </Link>
    </div>
  );
}
