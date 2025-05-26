'use client';
import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function ProfileSidebar() {
  return (
    <div className="flex h-full border-r px-2 w-full flex-col gap-y-2">
      <LinkButton text="My profile" link="/profile" />
      <LinkButton text="My Bookmarks" link="/profile/bookmarks" />
    </div>
  );
}

function LinkButton({ text, link }: { text: string; link: string }) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <Link
      href={link}
      className={cn(
        `rounded-md px-5 py-2 hover:bg-blue-800/50 group w-full duration-200 transition-colors`,
        isActive ? 'bg-blue-800/60' : '',
      )}
    >
      <p
        className={cn(
          isActive ? 'text-white' : 'group-hover:text-white',
          'duration-200 transition-colors',
        )}
      >
        {text}
      </p>
    </Link>
  );
}
