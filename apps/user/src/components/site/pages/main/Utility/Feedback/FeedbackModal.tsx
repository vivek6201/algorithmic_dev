'use client';

import { useUtilityStore } from '@/store/utilityStore';
import { motion } from 'motion/react';
import { ScrollArea } from '@repo/ui/components/ui/scroll-area';
import React, { useEffect } from 'react';
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
import FeedbackForm from './FeedbackForm';
import { FEEDBACK_DELAY, ONE_DAY, ONE_WEEK } from '@/lib/constants';
import { useLocalStorage } from '@repo/ui/hooks';
import { FeedbackStatus } from '@/types/main';

export default function FeedbackModal() {
  const { openFeedbackModal, setOpenFeedbackModal } = useUtilityStore();

  const { value: feedbackStatus } = useLocalStorage<FeedbackStatus>('feedback-status', {
    action: 'later',
    timestamp: 0,
  });

  useEffect(() => {
    const now = Date.now();
    const { action, timestamp } = feedbackStatus;

    const timeSince = now - timestamp;
    const shouldShow =
      (action === 'submitted' && timeSince >= ONE_WEEK) ||
      (action === 'later' && timeSince >= ONE_DAY);

    if (!shouldShow) return;

    const timer = setTimeout(() => {
      setOpenFeedbackModal(true);
    }, FEEDBACK_DELAY); // wait 1 minute after eligible

    return () => clearTimeout(timer);
  }, [feedbackStatus, setOpenFeedbackModal]);

  return (
    <>
      <Dialog open={openFeedbackModal} onOpenChange={setOpenFeedbackModal}>
        <DialogContent
          className="w-11/12 rounded-md sm:max-w-[500px] p-0 border-0 shadow-none max-h-[90vh] overflow-hidden"
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
          <div className="p-4 md:p-6">
            <FeedbackForm />
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  );
}
