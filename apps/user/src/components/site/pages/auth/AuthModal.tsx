'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';
import { Button } from '@repo/ui/components/ui/button';
import { AuthModalForm } from './AuthForm'; // Assuming AuthForm is in the same directory
import { useState } from 'react';
import { useUtilityStore } from '@/store/utilityStore';
import { ScrollArea } from '@repo/ui/components/ui/scroll-area';
import { useIsMobile } from '@repo/ui/hooks/use-mobile';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@repo/ui/components/ui/drawer';

export default function AuthModal() {
  const { openAuthModal, setAuthModel, setIsLoginMode, isLoginMode } = useUtilityStore();
  const isMobile = useIsMobile(640);

  const content = (
    <>
      <AuthModalForm />
      <Button
        variant="link"
        className="text-xs text-muted-foreground mt-4 mx-auto block"
        onClick={() => setIsLoginMode(!isLoginMode)}
      >
        {isLoginMode ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
      </Button>
    </>
  );

  if (isMobile) {
    return (
      <Drawer open={openAuthModal} onOpenChange={setAuthModel}>
        <DrawerContent className="rounded-t-2xl h-[70vh]">
          <ScrollArea className="sm:h-auto w-full p-4">
            <DrawerHeader className="text-center">
              <DrawerTitle>{isLoginMode ? 'Login' : 'Signup'}</DrawerTitle>
              <DrawerDescription>
                {isLoginMode
                  ? 'Enter your email below to login to your account'
                  : 'Enter your details to create an account'}
              </DrawerDescription>
            </DrawerHeader>
            {content}
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={openAuthModal} onOpenChange={setAuthModel}>
      <DialogContent className="sm:max-w-[450px] rounded-2xl p-5">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">
            {isLoginMode ? 'Login' : 'Signup'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isLoginMode
              ? 'Enter your email below to login to your account'
              : 'Enter your details to create an account'}
          </DialogDescription>
        </DialogHeader>
        <div className="py-5">{content}</div>
      </DialogContent>
    </Dialog>
  );
}
