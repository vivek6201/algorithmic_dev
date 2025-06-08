'use client';

import { Pen } from '@repo/ui';
import { Button } from '@repo/ui/components/ui/button';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { Skeleton } from '@repo/ui/components/ui/skeleton';
import { useUserProfile } from '@/contexts/ProfileContext';
import UserModal from './UserModal';

export default function UserBlock() {
  const session = useSession();
  const { profileData } = useUserProfile();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const isLoading = session.status === 'loading' && !profileData;

  return (
    <>
      <div className="flex w-full flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between dark:bg-muted/20">
        {isLoading ? (
          <div className="flex items-center gap-6">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-[180px]" />
              <Skeleton className="h-4 w-[220px]" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <Image
              alt={session.data?.user?.name ?? 'User Image'}
              src={profileData?.image ?? '/placeholder.svg'}
              width={96}
              height={96}
              className="h-24 w-24 rounded-full object-cover border border-muted"
            />
            <div className="space-y-1">
              <p className="text-lg font-semibold text-foreground">{session.data?.user?.name}</p>
              <p className="text-sm text-muted-foreground">
                {session.data?.user?.email} &middot; {session.data?.user?.role}
              </p>
            </div>
          </div>
        )}

        {!isLoading && (
          <Button variant="outline" size="sm" className="gap-1 px-3" onClick={handleOpen}>
            <Pen className="h-4 w-4" />
            Edit
          </Button>
        )}
      </div>

      <UserModal open={open} handleOpen={handleOpen} />
    </>
  );
}
