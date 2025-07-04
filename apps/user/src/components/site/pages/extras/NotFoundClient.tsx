'use client';

import { motion } from 'motion/react';
import LazyImage from '@repo/ui/components/elements/LazyImage';
import { Button } from '@repo/ui/components/ui/button';
import Link from 'next/link';

export default function NotFoundClient() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 bg-background relative overflow-hidden">
      {/* Floating background blob */}
      <motion.div
        className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center gap-8 max-w-xl">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-foreground"
        >
          404 — Page Not Found
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-muted-foreground text-base sm:text-lg"
        >
          Oops! Looks like you got lost in the code. Let’s get you back home.
        </motion.p>

        {/* Animated Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <LazyImage
            src="/not-found.svg"
            alt="Not Found"
            width={400}
            height={400}
            className="w-64 sm:w-72 md:w-80 h-auto"
          />
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link href="/?ref=not-found">
            <Button size="lg">Go Home</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
