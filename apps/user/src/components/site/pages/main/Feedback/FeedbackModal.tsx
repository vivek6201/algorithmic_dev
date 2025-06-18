'use client';

import { useUtilityStore } from '@/store/utilityStore';
import { MessageSquare, X } from '@repo/ui';
import { Button } from '@repo/ui/components/ui/button';
import { motion } from 'motion/react';
import { ScrollArea } from '@repo/ui/components/ui/scroll-area';
import React from 'react';
import { useIsMobile } from '@repo/ui/hooks/use-mobile';
import FeedbackForm from './FeedbackForm';
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

export default function FeedbackModal() {
  const { openFeedbackModal, setOpenFeedbackModal } = useUtilityStore();
  const isMobile = useIsMobile();

  const TriggerButton = () => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-20 md:bottom-6 right-6 z-50"
    >
      <Button
        size="lg"
        onClick={() => setOpenFeedbackModal(true)}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-4 group"
      >
        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
          <MessageSquare className="w-6 h-6" />
        </motion.div>
        <span className="ml-2 hidden sm:inline">Feedback</span>
      </Button>
    </motion.div>
  );

  if (isMobile) {
    return (
      <>
        <TriggerButton />

        <Drawer open={openFeedbackModal} onOpenChange={setOpenFeedbackModal}>
          <DrawerContent className="p-0 border-0 h-[85vh] overflow-hidden">
            <DrawerTitle className="sr-only">Feedback Form</DrawerTitle>
            <DrawerDescription className="sr-only">
              Provide your feedback to help us improve.
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
      <Dialog open={openFeedbackModal} onOpenChange={setOpenFeedbackModal}>
        <DialogContent className="sm:max-w-[500px] p-0 border-0 shadow-none max-h-[90vh] overflow-hidden">
          <DialogTitle className="sr-only">Feedback Form</DialogTitle>
          <DialogDescription className="sr-only">
            Provide your feedback to help us improve.
          </DialogDescription>

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
      className={` ${openFeedbackModal ? 'rounded-t-2xl' : 'rounded-2xl'} shadow-2xl  overflow-hidden ${openFeedbackModal ? 'h-[85vh]' : 'max-h-[90vh]'} flex flex-col`}
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
