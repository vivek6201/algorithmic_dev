'use client';
import { Pen } from '@repo/ui';
import { Button } from '@repo/ui/components/ui/button';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@repo/ui/components/ui/skeleton';
import { useUserProfile } from '@/contexts/ProfileContext';
import UserModal from './UserModal';

export default function UserBlock() {
  const session = useSession();
  const { profileData } = useUserProfile();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <div className="w-full border flex justify-between items-center gap-5 rounded-md min-h-20 p-5">
        {session.status === 'loading' && !profileData ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-32 w-32 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        ) : (
          <div className="flex gap-5 items-center">
            <Image
              loading="lazy"
              alt=""
              src={profileData?.image ?? '/placeholder.svg'}
              width={500}
              height={500}
              className="w-32 h-32 rounded-full"
            />
            <div className="flex flex-col items-start justify-center">
              <p className="font-semibold text-lg">{session.data?.user?.name}</p>
              <p className="opacity-60 text-sm">
                {session.data?.user?.email} | {session.data?.user?.role}
              </p>
            </div>
          </div>
        )}

        <Button className="text-white" onClick={handleOpen}>
          <Pen color="white" />
          Edit
        </Button>
      </div>
      <UserModal open={open} handleOpen={handleOpen} />
    </>
  );
}
