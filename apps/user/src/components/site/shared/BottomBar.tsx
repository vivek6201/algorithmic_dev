'use client';

import { Button } from '@repo/ui/components/ui/button';
import { headerLinks } from '@/lib/constants';
import { LucideIcon } from '@repo/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function BottomBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-md md:hidden">
      <ul className="flex justify-around items-center h-16">
        {headerLinks.map((item) => (
          <MobileItem
            key={item.link}
            title={item.name}
            icon={item.icon}
            link={item.link}
            active={pathname === item.link}
          />
        ))}
      </ul>
    </nav>
  );
}

function MobileItem({
  title,
  link,
  icon: Icon,
  active,
}: {
  title: string;
  link: string;
  icon: LucideIcon;
  active?: boolean;
}) {
  return (
    <li>
      <Link href={link}>
        <div className="flex flex-col items-center justify-center gap-[2px] text-center text-xs">
          <Button
            variant="ghost"
            size="icon"
            className={`h-10 w-10 rounded-full transition-all ${
              active
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon className="h-5 w-5" />
          </Button>
          <span
            className={`text-[11px] font-medium leading-tight ${
              active ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {title}
          </span>
        </div>
      </Link>
    </li>
  );
}
