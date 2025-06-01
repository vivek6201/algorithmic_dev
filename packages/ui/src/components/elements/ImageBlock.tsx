'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@repo/ui/components/ui/button';

export default function ImageBlock({ src, alt }: { src: string; alt: string }) {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoom = () => setIsZoomed(true);
  const handleClose = () => setIsZoomed(false);

  return (
    <>
      {/* Thumbnail */}
      <div className="flex w-full items-center justify-center">
        <Image
          src={src}
          alt={alt}
          width={600}
          height={400}
          className="cursor-zoom-in rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
          onClick={handleZoom}
        />
      </div>

      {/* Modal with Zoom Effect */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="fixed select-none inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close button outside image area */}
            <Button
              onClick={handleClose}
              className="cursor-pointer absolute top-4 right-4 text-white text-2xl bg-black/60 rounded-full p-2 hover:bg-black/90 z-50"
              aria-label="Close"
              variant={'ghost'}
              size={'icon'}
            >
              ✕
            </Button>

            {/* Animated image container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()} // Prevent closing modal on image click
            >
              <Image
                src={src}
                alt={alt}
                width={1200}
                height={800}
                onClick={handleClose}
                className="object-contain w-full h-full rounded-md cursor-zoom-out"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
