'use client';
import { Button } from '@/components/ui/button';
import { headerLinks } from '@/lib/constants';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function BottomBar() {
  return (
    <div className="p-1 border-t lg:hidden fixed bottom-0 left-0 right-0 dark:bg-neutral-900 h-16 bg-white flex gap-2 justify-between items-center z-50">
      {headerLinks.map((item) => (
        <MobileItem title={item.name} icon={item.icon} link={item.link} key={item.link} />
      ))}
    </div>
  );
}

function MobileItem({
  title,
  link,
  icon: Icon,
}: {
  title: string;
  link: string;
  icon: LucideIcon;
}) {
  return (
    <Link href={link}>
      <Button variant={'ghost'} className="flex flex-col gap-y-1">
        <Icon />
        <p>{title}</p>
      </Button>
    </Link>
  );
}
