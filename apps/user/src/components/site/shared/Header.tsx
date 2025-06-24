'use client';
import { useState, useEffect } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/ui/avatar';
import ThemeToggler from './theme-toggler';
import UserProfileSheet from '../pages/profile/ProfileSheet';
import { useSession } from 'next-auth/react';
import { headerLinks } from '@/lib/constants';
import Link from 'next/link';
import { useRouter } from 'nextjs-toploader/app';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (session.status === 'authenticated') setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [session]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={'/'} className="flex items-center space-x-2 animate-slide-in-left">
            <span className="text-2xl font-bold gradient-text">AlgorithmicDev</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {headerLinks
              .filter((it) => it.name !== 'User')
              .map((link) => (
                <Link
                  href={link.link}
                  className="flex gap-2 items-center opacity-60 hover:opacity-90 transition-opacity duration-200"
                  key={link.name}
                >
                  {link.name}
                </Link>
              ))}
          </div>

          <div className="hidden md:flex items-center space-x-4 animate-slide-in-right">
            <ThemeToggler />
            {isLoggedIn ? (
              <UserProfileSheet>
                <Avatar className="h-9 w-9 cursor-pointer hover:scale-105 transition-transform">
                  <AvatarImage src={session.data?.user?.image as string} alt="User" />
                  <AvatarFallback>{session.data?.user?.name?.[0]}</AvatarFallback>
                </Avatar>
              </UserProfileSheet>
            ) : (
              <>
                <Button variant="outline" onClick={() => router.push('/login')}>
                  Login
                </Button>
                <Button onClick={() => router.push('/signup')}>Get Started</Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggler />
            {isLoggedIn && (
              <UserProfileSheet>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src={session.data?.user?.image ?? ''} alt="User" />
                  <AvatarFallback>{session.data?.user?.image}</AvatarFallback>
                </Avatar>
              </UserProfileSheet>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
