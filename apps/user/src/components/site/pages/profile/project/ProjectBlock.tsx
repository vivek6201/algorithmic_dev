'use client';
import { useUserProfile } from '@/contexts/ProfileContext';
import { Plus } from '@repo/ui';
import { Button } from '@repo/ui/components/ui/button';
import React, { useState } from 'react';
import ProjectModal from './ProjectModal';

export default function ProjectBlock() {
  const [open, setOpen] = useState(false);
  const { profileData } = useUserProfile();

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <div className="flex flex-col gap-y-2 p-2 border rounded-md min-h-32">
        <div className="flex justify-between items-center">
          <p className="ml-4 font-medium text-lg">Projects</p>
          <Button variant={'link'} className="flex items-center" onClick={handleOpen}>
            <Plus className="font-medium" />
            Add Project
          </Button>
        </div>
      </div>
      <ProjectModal open={open} handleClose={handleOpen} />
    </>
  );
}
