'use client';
import React, { useState } from 'react';
import { cn } from '@repo/ui/lib/utils';
import { useIsMobile } from '@repo/ui/hooks/use-mobile';
import { Button } from '@repo/ui/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@repo/ui/components/ui/drawer';
import { Loader2, z, zodResolver } from '@repo/ui';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { PasswordInput } from '@repo/ui/components/ui/password-input';
import { hookForm } from '@repo/ui';
import { resetPassValidation } from '@repo/shared/validations';
import { resetPass } from '@/actions/user/reset-pass';
import { useSession } from 'next-auth/react';
import { toast } from '@repo/ui/components/ui/sonner';

export default function ResetPass() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <div className="flex justify-between items-center p-5 rounded-md dark:bg-neutral-800 bg-gray-200">
        <div>
          <p className="font-bold text-xl">Change Password</p>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            Here you can change your password
          </p>
        </div>
        <Button variant={'destructive'} onClick={handleOpen}>
          Change Password
        </Button>
      </div>
      <ResetModal open={open} handleOpen={handleOpen} />
    </>
  );
}

function ResetModal({ open, handleOpen }: { open: boolean; handleOpen: () => void }) {
  const isDesktop = useIsMobile();

  if (!isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>This dialog Allows you to change your password</DialogDescription>
          </DialogHeader>
          <PasswordForm />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={handleOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Change Password</DrawerTitle>
          <DrawerDescription>This dialog Allows you to change your password</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <PasswordForm className="px-4" />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
function PasswordForm({ className }: React.ComponentProps<'form'>) {
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const form = hookForm.useForm<z.infer<typeof resetPassValidation>>({
    resolver: zodResolver(resetPassValidation),
    defaultValues: {
      oldPassword: '',
      confirmPassword: '',
      newPassword: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof resetPassValidation>) {
    try {
      setLoading(true);
      const { success, message } = await resetPass(session.data?.user?.email ?? '', values);
      if (success) toast.success(message);
      else toast.error(message);
    } catch (error) {
      console.error(error);
      toast.error('Something Went Wrong!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter your pass" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter your new pass" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Confirm your new pass" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={loading}
          variant={'destructive'}
          className="w-full text-white"
        >
          {loading ? <Loader2 className="animate-spin" /> : ''}
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
