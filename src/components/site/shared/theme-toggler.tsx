'use client';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      onClick={() => (theme === 'light' ? setTheme('dark') : setTheme('light'))}
      variant={'outline'}
      className="cursor-pointer"
      size={'icon'}
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
}
