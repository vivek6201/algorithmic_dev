'use client';

import { useUtilityStore } from '@/store/utilityStore';
import { motion } from 'motion/react';
import { ScrollArea } from '@repo/ui/components/ui/scroll-area';
import React, { useEffect } from 'react';
import { useIsMobile } from '@repo/ui/hooks/use-mobile';
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
import FeedbackForm from './FeedbackForm';

export default function FeedbackModal() {
  const { openFeedbackModal, setOpenFeedbackModal } = useUtilityStore();
  const delay = 60000;
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check if feedback has already been shown in this session
    const hasShownFeedback = Boolean(sessionStorage.getItem('feedback-shown'));

    if (hasShownFeedback) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem('feedback-shown', 'true');
      setOpenFeedbackModal(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, setOpenFeedbackModal]);

  if (isMobile) {
    return (
      <>
        <Drawer open={openFeedbackModal} onOpenChange={setOpenFeedbackModal}>
          <DrawerContent
            className="p-0 border-0 h-[60vh] overflow-hidden"
            onInteractOutside={(e) => e.preventDefault()}
          >
            <DrawerTitle className="sr-only">Feedback Form</DrawerTitle>
            <DrawerDescription className="sr-only">Give your valuable feedback</DrawerDescription>
            <ModalContent />
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <>
      <Dialog open={openFeedbackModal} onOpenChange={setOpenFeedbackModal}>
        <DialogContent
          className="sm:max-w-[500px] p-0 border-0 shadow-none max-h-[90vh] overflow-hidden"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogTitle className="sr-only">Feedback Form</DialogTitle>
          <DialogDescription className="sr-only">Give your valuable feedback</DialogDescription>
          <ModalContent />
        </DialogContent>
      </Dialog>
    </>
  );
}

function ModalContent() {
  const { openFeedbackModal } = useUtilityStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: openFeedbackModal ? 1 : 0.9, y: openFeedbackModal ? 20 : 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: openFeedbackModal ? 1 : 0.9, y: openFeedbackModal ? 20 : 20 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
      className={` ${openFeedbackModal ? 'rounded-t-2xl' : 'rounded-2xl'} shadow-2xl  overflow-hidden h-fit flex flex-col`}
    >
      {/* Content with ScrollArea */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-6">
            <FeedbackForm />
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  );
}
