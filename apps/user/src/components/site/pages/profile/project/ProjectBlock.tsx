'use client';

import { Plus } from '@repo/ui';
import { Button } from '@repo/ui/components/ui/button';
import React, { useState } from 'react';
import ProjectModal from './ProjectModal';
import ProjectCard from './ProjectCard';
import { useProfileStore } from '@/store/profileStore';
import { useUserStore } from '@/store/userStore';

export default function ProjectBlock() {
  const [open, setOpen] = useState(false);
  const { profileData } = useUserStore();
  const { setProjectForm } = useProfileStore();

  const handleAddAction = () => {
    setProjectForm(null);
    setOpen(true);
  };

  const handleEditAction = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setProjectForm(null);
    setOpen(false);
  };

  return (
    <>
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-6 shadow-sm dark:bg-muted/20">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Projects</h2>
          <Button variant="ghost" size="sm" onClick={handleAddAction} className="gap-1">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profileData?.projects?.length ? (
            profileData.projects.map((data) => (
              <ProjectCard key={data.id} project={data} handleEditAction={handleEditAction} />
            ))
          ) : (
            <div className="col-span-full text-muted-foreground text-sm">
              No projects added yet. Click "Add" to get started.
            </div>
          )}
        </div>
      </div>

      <ProjectModal open={open} handleClose={handleClose} />
    </>
  );
}
