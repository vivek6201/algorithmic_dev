'use client';

import React, { useState, useEffect, useId, useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@repo/ui/lib/utils';

export interface ContainerTextFlipProps {
  words?: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
  animationDuration?: number;
  animateWidth?: boolean;
}

export default function ContainerTextFlip({
  words = ['better', 'modern', 'beautiful', 'awesome'],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
  animateWidth = true,
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState<number | 'auto'>('auto');
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animateWidth && textRef.current) {
      const textWidth = textRef.current.scrollWidth + 30;
      setWidth(textWidth);
    }
  }, [currentWordIndex, animateWidth]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <motion.span
      layout
      layoutId={`flip-container-${id}`}
      animate={animateWidth ? { width } : {}}
      transition={{ duration: animationDuration / 2000 }}
      className={cn(
        'inline-block rounded-md px-2 py-1 text-center align-middle',
        '[background:linear-gradient(to_bottom,#f3f4f6,#e5e7eb)]',
        'shadow-[inset_0_-1px_#d1d5db,inset_0_0_0_1px_#d1d5db,_0_4px_8px_#d1d5db]',
        'dark:[background:linear-gradient(to_bottom,#374151,#1f2937)]',
        'dark:shadow-[inset_0_-1px_#10171e,inset_0_0_0_1px_hsla(205,89%,46%,.24),_0_4px_8px_#00000052]',
        className,
      )}
    >
      <motion.div
        key={words[currentWordIndex]}
        transition={{ duration: animationDuration / 1000, ease: 'easeInOut' }}
        ref={textRef}
        className={cn('inline-block whitespace-nowrap', textClassName)}
        layoutId={`word-${words[currentWordIndex]}-${id}`}
      >
        <motion.p className="inline-block">
          {words[currentWordIndex]?.split('').map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: index * 0.02 }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.p>
      </motion.div>
    </motion.span>
  );
}
