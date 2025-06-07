import Link from 'next/link';
import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
  const footerLinks = {
    platform: [
      { name: 'Jobs', href: '/jobs' },
      { name: 'Blogs', href: '/blogs' },
      { name: 'Tutorials', href: '/tutorials' },
    ],
    company: [
      { name: 'About', href: '/about-us' },
      { name: 'Contact', href: '/contact-us' },
    ],
    resources: [
      { name: 'Terms', href: '#' },
      { name: 'Privacy', href: '#' },
    ],
    social: [
      { name: 'Twitter', href: 'https://x.com/_Vivek_930', icon: FaTwitter },
      {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/vivek-kumar-gupta-/',
        icon: FaLinkedin,
      },
      { name: 'GitHub', href: 'https://github.com/vivek6201', icon: FaGithub },
    ],
  };

  return (
    <footer className="bg-white dark:bg-transparent pb-6">
      <div className="max-w-[1400px] mx-auto py-12 w-11/12">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-500 text-transparent bg-clip-text">
                Algorithmic Dev
              </span>
            </Link>
            <p className="text-gray-500 text-base">
              Your complete tech career platform. Find jobs, build community, share knowledge, and
              learn new skills.
            </p>
            <div className="flex space-x-6">
              {footerLinks.social.map((item) => (
                <a
                  target="_blank"
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  <div className="h-6 w-6 flex items-center justify-center hover:bg-tech-purple/20 hover:text-purple-300 transition-colors">
                    <item.icon />
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Platform
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.platform.map((item) => (
                    <li key={item.name}>
                      <Link
                        target="_blank"
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.company.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Resources
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.resources.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Algorithmic Dev, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
