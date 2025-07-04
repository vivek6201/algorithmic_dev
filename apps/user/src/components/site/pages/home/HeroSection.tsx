'use client';

import { Button } from '@repo/ui/components/ui/button';
import { Badge } from '@repo/ui/components/ui/badge';
import { ArrowRight } from '@repo/ui';
import { motion } from 'motion/react';
import { useRouter } from 'nextjs-toploader/app';
import ContainTextFlip from '@repo/ui/components/elements/TextFlip';

const categories = [
  { name: 'Tutorials', icon: '📘', href: '/tutorials' },
  { name: 'Jobs', icon: '💼', href: '/jobs' },
  { name: 'Blogs', icon: '📝', href: '/blogs' },
  { name: 'Hire', icon: '🧑‍💻', href: '/hire' },
];

const skills = ['React', 'Python', 'Machine Learning', 'Data Science', 'Node.js', 'Flutter'];

export default function HeroSection() {
  const router = useRouter();
  const words = ['Building', 'Learning', 'Applying'];

  return (
    <section className="relative w-full px-4 sm:px-8 pt-24 sm:pt-32 pb-20 bg-white dark:bg-background overflow-hidden">
      {/* Floating blurred background blobs */}
      <motion.div
        className="absolute top-10 left-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl z-0"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl z-0"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* LEFT: Main Content with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full lg:w-1/2 text-center lg:text-left"
        >
          <Badge className="bg-blue-100 text-blue-600 border-none text-xs sm:text-sm px-3 py-1 rounded-full mb-4">
            #1 Platform for Tech Careers
          </Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-2 text-zinc-900 dark:text-white">
            Master <span className="text-blue-600 dark:text-blue-400">Code</span> &{' '}
            <span className="text-purple-600 dark:text-purple-500">Career</span>
          </h1>

          <h2 className="text-base sm:text-xl md:text-2xl font-medium text-muted-foreground mb-4">
            Become Job-Ready by Actually{' '}
            <ContainTextFlip
              words={words}
              className="inline text-primary dark:text-blue-400 font-semibold"
            />
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
            Transform your passion into profession with our comprehensive learning ecosystem. From
            tutorials to dream jobs – we've got you covered.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 sm:mb-10">
            <Button size="lg" className="px-6 text-base" onClick={() => router.push('/blogs')}>
              Start Learning Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-6 text-base"
              onClick={() => router.push('/blogs')}
            >
              Explore Jobs
            </Button>
          </div>

          {/* Category Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center lg:justify-start">
            {categories.map(({ name, icon, href }) => (
              <Button
                key={name}
                variant="ghost"
                size="lg"
                className="w-full h-24 flex flex-col items-center justify-center border rounded-xl hover:bg-muted transition"
                onClick={() => router.push(href)}
              >
                <div className="text-2xl">{icon}</div>
                <span className="text-sm mt-1">{name}</span>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: Skills Card (Hidden on small screens) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="hidden lg:flex w-full sm:max-w-sm lg:w-[360px] bg-gradient-to-br from-white to-blue-50 dark:from-muted dark:to-muted/40 border dark:border-muted-foreground/10 shadow-xl rounded-2xl p-6 flex-col justify-between h-full"
        >
          <h3 className="text-md font-semibold mb-4 text-left">Popular Skills</h3>

          <div className="flex flex-col gap-2 mb-4">
            {skills.map((skill) => (
              <Button
                key={skill}
                variant="ghost"
                className="group justify-start text-left text-sm px-3 py-2 rounded-md hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
              >
                <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1 group-hover:scale-125 transition-transform" />
                {skill}
              </Button>
            ))}
          </div>

          <Button className="w-full text-sm" onClick={() => router.push('/tutorials')}>
            Explore All Tutorials <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
