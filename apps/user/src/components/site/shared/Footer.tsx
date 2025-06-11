import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-transparent border-t border-gray-200 dark:border-white/10">
      <div className="max-w-[1400px] w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 py-12">
        {/* Logo + Tagline */}
        <div className="space-y-4">
          <Link href="/" className="font-bold text-xl text-gray-800 dark:text-white">
            AlgorithmicDev
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
            Your complete tech career platform. Find jobs, build community, share knowledge, and
            learn new skills.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6 text-sm">
          <div className="space-y-2 flex flex-col gap-y-2">
            <Link href="/about-us" className="text-gray-600 dark:text-gray-300 hover:underline">
              About
            </Link>
            <Link href="/contact-us" className="text-gray-600 dark:text-gray-300 hover:underline">
              Contact
            </Link>
          </div>
          <div className="space-y-2 flex flex-col gap-y-2">
            <Link href="/tnc" className="text-gray-600 dark:text-gray-300 hover:underline">
              Terms of Services
            </Link>
            <Link href="/privacy" className="text-gray-600 dark:text-gray-300 hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4 flex flex-col md:items-end">
          <h4 className="font-semibold text-gray-800 dark:text-white text-base">Follow Us</h4>
          <div className="flex gap-5 items-center md:justify-end">
            <a href="https://x.com/_Vivek_930" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-gray-500 hover:text-black dark:hover:text-white w-7 h-7" />
            </a>
            <a
              href="https://www.linkedin.com/in/vivek-kumar-gupta-/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-gray-500 hover:text-black dark:hover:text-white w-7 h-7" />
            </a>
            <a href="https://github.com/vivek6201" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-gray-500 hover:text-black dark:hover:text-white w-7 h-7" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="py-8 border-t text-center text-sm text-gray-400 max-w-[1400px] w-11/12 mx-auto">
        &copy; {new Date().getFullYear()} AlgorithmicDev. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
