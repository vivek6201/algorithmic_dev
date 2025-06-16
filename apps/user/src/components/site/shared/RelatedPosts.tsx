'use client';
import React, { ReactNode } from 'react';
import { Carousel, CarouselContent } from '@repo/ui/components/ui/carousel';

export default function RelatedPosts({ children }: { children: ReactNode }) {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      <CarouselContent>{children}</CarouselContent>
    </Carousel>
  );
}
