'use client';
import { Button } from '@repo/ui/components/ui/button';
import { Badge } from '@repo/ui/components/ui/badge';
import { ArrowRight, Briefcase, Star } from '@repo/ui';
import { useRouter } from 'nextjs-toploader/app';
import { motion, useAnimation } from 'motion/react';
import { useEffect } from 'react';
import { cn } from '@repo/ui/lib/utils';
import ContainTextFlip from '@repo/ui/components/elements/TextFlip';

const technologies = [
  'Web Development',
  'Android Development',
  'iOS Development',
  'React',
  'Node.js',
  'Python',
  'Machine Learning',
  'Data Science',
];

const moreTechnologies = [
  'DevOps',
  'Cloud Computing',
  'UI/UX Design',
  'Blockchain',
  'Cybersecurity',
  'Game Development',
  'Full Stack Development',
  'Flutter',
];

export default function HeroSection() {
  const router = useRouter();
  const floatControls1 = useAnimation();
  const floatControls2 = useAnimation();
  const words = ['Building', 'Learning', 'Applying'];

  useEffect(() => {
    const floatLoop = async (controls: any, delay = 0) => {
      await new Promise((r) => setTimeout(r, delay));
      while (true) {
        await controls.start({ y: -20, transition: { duration: 2, ease: 'easeInOut' } });
        await controls.start({ y: 0, transition: { duration: 2, ease: 'easeInOut' } });
      }
    };

    floatLoop(floatControls1);
    floatLoop(floatControls2, 1000);
  }, []);

  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden w-full">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 w-full" />

      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        animate={floatControls1}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={floatControls2}
      />

      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            <p className="text-xs sm:text-sm">Trusted by 50,000+ learners worldwide</p>
          </div>

          <motion.h1
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn(
              'mx-auto relative mb-6 max-w-[70%] text-center text-4xl leading-normal font-bold tracking-tight text-zinc-700 md:text-7xl dark:text-zinc-100',
            )}
            layout
          >
            Become Job-Ready by Actually <ContainTextFlip words={words} />
            {/* <Blips /> */}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-sm md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Discover comprehensive tutorials, insightful blogs, and career opportunities all in one
            place. Learn at your own pace with our chapter-wise approach.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className="text-base md:text-lg px-8 py-6 text-white"
              onClick={() => router.push('/blogs')}
            >
              Start Learning Today
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base md:text-lg px-8 py-6"
              onClick={() => router.push('/jobs')}
            >
              <Briefcase className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Explore Jobs
            </Button>
          </motion.div>

          {/* Tech badges (looping) */}
          <div className="relative overflow-hidden mt-6 space-y-4">
            <InfiniteBadgeScroll items={technologies} direction="left" />
            <InfiniteBadgeScroll items={moreTechnologies} direction="right" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

type InfiniteBadgeScrollProps = {
  items: string[];
  direction?: 'left' | 'right';
};

export const InfiniteBadgeScroll = ({ items, direction = 'left' }: InfiniteBadgeScrollProps) => {
  const isLeft = direction === 'left';
  const animation = {
    x: isLeft ? ['0%', '-50%'] : ['-50%', '0%'],
  };

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex gap-4 w-max"
        animate={animation}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 20,
          ease: 'linear',
        }}
      >
        {/* Duplicate at least 2x to fill loop */}
        {[...items, ...items, ...items].map((tech, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20 flex-shrink-0"
          >
            {tech}
          </Badge>
        ))}
      </motion.div>
    </div>
  );
};
