'use client';

import { useUtilityStore } from '@/store/utilityStore';
import { Bug } from '@repo/ui';
import { Button } from '@repo/ui/components/ui/button';
import { motion } from 'motion/react';
import { ScrollArea } from '@repo/ui/components/ui/scroll-area';
import React from 'react';
import { useIsMobile } from '@repo/ui/hooks';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@repo/ui/components/ui/drawer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';
import BugForm from './BugForm';

export default function BugModal() {
  const { openBugModal, setOpenBugModal } = useUtilityStore();
  const isMobile = useIsMobile();

  const TriggerButton = () => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-20 md:bottom-6 right-6 z-50"
    >
      <Button
        size={isMobile ? 'icon' : 'lg'}
        onClick={() => setOpenBugModal(true)}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-4 group"
      >
        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
          <Bug className="w-6 h-6" />
        </motion.div>
        <span className="hidden md:inline">Found a bug?</span>
      </Button>
    </motion.div>
  );

  if (isMobile) {
    return (
      <>
        <TriggerButton />

        <Drawer open={openBugModal} onOpenChange={setOpenBugModal}>
          <DrawerContent className="p-0 border-0 h-[60vh] overflow-hidden">
            <DrawerTitle className="sr-only">Bug Form</DrawerTitle>
            <DrawerDescription className="sr-only">
              Report your bug which help us to fix.
            </DrawerDescription>

            <ModalContent />
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <>
      <TriggerButton />
      <Dialog open={openBugModal} onOpenChange={setOpenBugModal}>
        <DialogContent className="sm:max-w-[500px] p-0 border-0 shadow-none max-h-[90vh] overflow-hidden">
          <DialogTitle className="sr-only">Bug Form</DialogTitle>
          <DialogDescription className="sr-only">
            Report your bug which help us to fix.
          </DialogDescription>

          <ModalContent />
        </DialogContent>
      </Dialog>
    </>
  );
}

function ModalContent() {
  const { openBugModal } = useUtilityStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: openBugModal ? 1 : 0.9, y: openBugModal ? 20 : 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: openBugModal ? 1 : 0.9, y: openBugModal ? 20 : 20 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
      className={` ${openBugModal ? 'rounded-t-2xl' : 'rounded-2xl'} shadow-2xl  overflow-hidden h-fit flex flex-col`}
    >
      {/* Content with ScrollArea */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-6">
            <BugForm />
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  );
}
