'use client';
import { Plus } from '@repo/ui';
import { Button } from '@repo/ui/components/ui/button';
import React, { useState } from 'react';
import EducationModal from './EducationModal';

export default function EducationBlock() {
  const [open, setOpen] = useState(false);
  const handleModal = () => setOpen(!open);

  return (
    <>
      <div className="flex flex-col gap-y-2 p-2 border rounded-md min-h-32">
        <div className="flex justify-between items-center">
          <p className="ml-4 font-medium text-lg">Education</p>
          <Button variant={'link'} className="flex items-center" onClick={handleModal}>
            <Plus className="font-medium" />
            Add Education
          </Button>
        </div>
      </div>
      <EducationModal open={open} handleClose={handleModal} />
    </>
  );
}
