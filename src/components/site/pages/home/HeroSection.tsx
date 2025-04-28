'use client';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import SearchModal from './SearchModal';

const titles = ['courses', 'tutorials', 'blogs', 'resources'];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [openModal, setOpenModal] = React.useState(false);

  const handleModalState = () => setOpenModal(!openModal);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade-out
      setFade(false);

      // Wait for fade-out to complete
      setTimeout(() => {
        // Change the title after fade-out
        setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);

        // Trigger fade-in shortly after changing the title
        setTimeout(() => {
          setFade(true);
        }, 150); // Tiny delay to allow new text to mount before fading in
      }, 300); // Match the duration of fade-out
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="min-h-[700px] flex items-center justify-center flex-col gap-y-8">
        <h1 className="max-w-[90%] md:max-w-[70%] text-center font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          The <span className="text-blue-500">Ultimate Destination</span> for Your Tech Career
          Journey
        </h1>
        <div className="flex items-center gap-4 mt-5 w-11/12 flex-wrap justify-center">
          <Button className="rounded-full shadow cursor-pointer" variant={'outline'} size={'lg'}>
            Find Jobs
          </Button>
          <Button
            className="bg-blue-500 shadow hover:bg-blue-400 dark:bg-neutral-800 dark:hover:bg-neutral-700 cursor-pointer rounded-full dark:text-white"
            size={'lg'}
          >
            Explore Platform
          </Button>
          <Button className="rounded-full shadow cursor-pointer" variant={'outline'} size={'lg'}>
            Explore Courses
          </Button>
        </div>

        <div
          onClick={handleModalState}
          className="rounded-full w-11/12 max-w-[800px] mx-auto border bg-transparent px-8 py-2 mt-8 hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors duration-200 cursor-pointer"
        >
          <p className="text-neutral-600 text-sm">
            Search for{' '}
            <span
              className={`inline-block transition-opacity duration-500 ${
                fade ? 'opacity-100' : 'opacity-0'
              }`}
              key={currentIndex}
            >
              {titles[currentIndex]}
            </span>
          </p>
        </div>
      </div>
      <SearchModal open={openModal} handleClose={handleModalState} />
    </>
  );
}
