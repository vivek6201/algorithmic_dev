'use client';
import { Plus } from '@repo/ui';
import { Button } from '@repo/ui/components/ui/button';
import React, { useState } from 'react';
import EducationModal from './EducationModal';
import { Skeleton } from '@repo/ui/components/ui/skeleton';
import { useUserProfile } from '@/contexts/ProfileContext';
import EducationCard from './EducationCard';
import { useProfileStore } from '@/store/profileStore';
import { Education } from '@repo/db';

export default function EducationBlock() {
  const [open, setOpen] = useState(false);
  const { setEducationForm } = useProfileStore();
  const { profileData, isLoading } = useUserProfile();

  const handleAddAction = () => {
    setEducationForm(null);
    setOpen(true);
  };

  const handleEditAction = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEducationForm(null);
    setOpen(false);
  };

  return (
    <>
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-6 shadow-sm dark:bg-muted/20">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Education</h2>
          <Button variant="ghost" size="sm" onClick={handleAddAction} className="gap-1">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-4">
          {isLoading ? (
            <div className="flex gap-5">
              <Skeleton className="h-24 w-full rounded-md" />
              <Skeleton className="h-24 w-full rounded-md" />
            </div>
          ) : profileData?.educationDetails && profileData.educationDetails.length > 0 ? (
            profileData?.educationDetails.map((data) => (
              <div key={data.id} className="w-full md:w-[calc(50%-0.5rem)]">
                <EducationCard data={data} handleModal={handleEditAction} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-muted-foreground text-sm">
              No education added yet. Click "Add" to get started.
            </div>
          )}
        </div>
      </div>
      <EducationModal open={open} handleClose={handleClose} />
    </>
  );
}
