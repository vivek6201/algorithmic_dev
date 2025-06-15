'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/ui/dialog';
import { Button } from '@repo/ui/components/ui/button';
import { AuthForm, AuthModalForm } from './AuthForm'; // Assuming AuthForm is in the same directory
import { useState } from 'react';
import { useUtilityStore } from '@/store/sidebarStore';

export default function AuthModal() {
  const { openAuthModal, setAuthModel } = useUtilityStore();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Dialog open={openAuthModal} onOpenChange={setAuthModel}>
      <DialogContent className="sm:max-w-[95vw] md:max-w-[450px] w-[90vw] rounded-2xl px-4 py-6">
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col items-center justify-between gap-4">
          <AuthModalForm />
          <Button
            variant="link"
            className="text-xs text-muted-foreground"
            onClick={() => setIsLogin((prev) => !prev)}
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
