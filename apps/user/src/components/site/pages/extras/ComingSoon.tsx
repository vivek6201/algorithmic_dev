'use client';

import { motion } from 'motion/react';
import { Button } from '@repo/ui/components/ui/button';
import { useRouter } from 'nextjs-toploader/app';

export default function ComingSoon() {
  const router = useRouter();

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-tr from-background via-muted/40 to-background text-center overflow-hidden">
      {/* Animated Background Blobs */}
      <motion.div
        className="absolute top-10 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl">
        {/* Emoji + Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-7xl mb-4">🚀</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
            We’re Launching Something Epic
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-muted-foreground text-base sm:text-lg mt-6 mb-10 max-w-xl mx-auto"
        >
          Our team is cooking up something exciting just for you. Stay in the loop for early access,
          updates, and sneak peeks!
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" onClick={() => router.push('/')}>
            Back to Home
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
