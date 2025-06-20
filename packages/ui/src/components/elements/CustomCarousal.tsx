'use client';

import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@repo/ui/components/ui/carousel';

export default function CustomCarousal({ children }: { children: ReactNode }) {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const update = useCallback(() => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, [api]);

  useEffect(() => {
    if (!api) return;

    update(); // Initial check
    api.on('select', update);
    api.on('reInit', update);
  }, [api, update]);

  return (
    <div className="z-20">
      <Carousel setApi={setApi} className="w-full group">
        {canScrollPrev && (
          <CarouselPrevious className="absolute left-0 top-1/2 z-10 h-full bg-gradient-to-l from-transparent to-white dark:to-black border-none rounded-none" />
        )}
        <CarouselContent>{children}</CarouselContent>
        {canScrollNext && (
          <CarouselNext className="absolute right-0 top-1/2 z-10 h-full bg-gradient-to-r from-transparent to-white dark:to-black border-none rounded-none" />
        )}
      </Carousel>
    </div>
  );
}
