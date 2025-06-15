'use client';
import { Button } from '@repo/ui/components/ui/button';
import { cn } from '@repo/ui/lib/utils';
import React, { ButtonHTMLAttributes, ReactNode, useEffect, useState } from 'react';
import { toast } from '@repo/ui/components/ui/sonner';
import { FaWhatsapp, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { Bookmark, Share2 } from '@repo/ui';
import { useUserStore } from '@/store/userStore';
import { toggleJobBookmarkAction } from '@/actions/main/bookmark';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useUtilityStore } from '@/store/sidebarStore';
import { Jobs } from '@repo/db';
import { Badge } from './JobCard';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';

export default function JobHeaderBlock({ data, id }: { data: Jobs; id: string }) {
  const [fullUrl, setFullUrl] = useState('');
  const { isBookmarked, refetchBookmarks } = useUserStore();
  const { setAuthModel } = useUtilityStore();
  const session = useSession();

  useEffect(() => {
    // This ensures the code only runs on the client
    const url = `${window.location.origin}${window.location.pathname}`;
    setFullUrl(url);
  }, []);

  const { mutate: toggleBookmark } = useMutation({
    mutationFn: () => toggleJobBookmarkAction(id ?? ''),
    onSuccess: (res) => {
      if (res.success) {
        refetchBookmarks();
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    },
    onError: () => toast.error('Something went wrong!'),
  });

  const handleBookmark = () => {
    if (!id) return;

    //trigger auth modal is user is not logged in
    if (session.status === 'unauthenticated') {
      setAuthModel(true);
      return;
    }
    toggleBookmark();
  };

  const openSharePopup = (url: string) => {
    window.open(url, '_blank', 'width=600,height=600');
  };

  const jobUrl = encodeURIComponent(fullUrl);
  const message = encodeURIComponent('Check out this awesome job opportunity!');

  const shareOnLinkedIn = () => {
    openSharePopup(`https://www.linkedin.com/sharing/share-offsite/?url=${jobUrl}`);
  };

  const shareOnTwitter = () => {
    openSharePopup(`https://twitter.com/intent/tweet?url=${jobUrl}&text=${message}`);
  };

  const shareOnWhatsApp = () => {
    openSharePopup(`https://api.whatsapp.com/send?text=${message}%20${jobUrl}`);
  };

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(fullUrl);
      toast.success('copied to clipboard');
    } catch (error) {
      console.error(error);
      toast.error('failed to copy');
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="mb-5">
          <h1 className="text-2xl lg:text-4xl font-bold mb-2">
            {data.companyName} is hiring for {data.position} | {data.location}
          </h1>
          <div className="flex gap-x-2 items-center">
            <Badge title={data.type} />
            <Badge title={data.experienceLevel.toLowerCase().split('_').join(' ')} />
            <Badge title={data.salaryRange} />
          </div>
        </div>
        {isBookmarked('job', id) ? (
          <Button
            className="hidden md:flex mr-5 gap-2 items-center text-white"
            onClick={handleBookmark}
          >
            <Bookmark fill="white" /> Remove Job
          </Button>
        ) : (
          <Button
            className="hidden md:flex mr-5 gap-2 items-center text-white"
            onClick={handleBookmark}
          >
            <Bookmark /> Save Job
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <ActionButton onClick={shareOnWhatsApp}>
          <FaWhatsapp />
        </ActionButton>
        <ActionButton onClick={shareOnLinkedIn}>
          <FaLinkedinIn />
        </ActionButton>
        <ActionButton onClick={shareOnTwitter}>
          <FaTwitter />
        </ActionButton>
        <ActionButton onClick={copyToClipboard}>
          <Share2 />
        </ActionButton>
        <ActionButton className="md:hidden w-10 h-10 rounded-full" onClick={handleBookmark}>
          {isBookmarked('job', id ?? '') ? (
            <IoBookmark className="opacity-80 w-5 h-5" />
          ) : (
            <IoBookmarkOutline className="opacity-60 w-5 h-5" />
          )}
        </ActionButton>
      </div>
    </>
  );
}

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function ActionButton({ children, ...props }: ActionButtonProps) {
  return (
    <Button
      variant={'outline'}
      className={cn('rounded-full w-10 h-10', props.className)}
      {...props}
    >
      {children}
    </Button>
  );
}
