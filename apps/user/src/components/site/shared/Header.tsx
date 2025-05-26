'use client';
import { useState, useEffect } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/ui/avatar';
import { Menu, X } from '@repo/ui';
import ThemeToggler from './theme-toggler';
import UserProfileSheet from '../pages/profile/ProfileSheet';
import { useSession } from 'next-auth/react';
import { headerLinks } from '@/lib/constants';
import Link from 'next/link';
import { useRouter } from 'nextjs-toploader/app';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            {headerLinks.map((link) => (
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
                  <AvatarImage src={session.data?.user?.image ?? ''} alt="User" />
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Features
              </a>
              <a
                href="#tutorials"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Tutorials
              </a>
              <a href="#blogs" className="text-foreground/80 hover:text-primary transition-colors">
                Blogs
              </a>
              <a href="#jobs" className="text-foreground/80 hover:text-primary transition-colors">
                Jobs
              </a>
              {!isLoggedIn && (
                <div className="flex space-x-2 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => router.push('/login')}
                  >
                    Login
                  </Button>
                  <Button className="flex-1" onClick={() => router.push('/signup')}>
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
