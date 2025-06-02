'use client';

import { createAdmin } from '@/actions/user/createAdmin';
import { useAdminStore } from '@/store/adminStore';
import { Admin } from '@repo/db';
import { adminValidation } from '@repo/shared/validations';
import { hookForm, Loader2, TanstackTable, z, zodResolver } from '@repo/ui';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { PasswordInput } from '@repo/ui/components/ui/password-input';
import { toast } from '@repo/ui/components/ui/sonner';
import { useIsMobile } from '@repo/ui/hooks/use-mobile';
import { useState } from 'react';

export const adminColumns: TanstackTable.ColumnDef<Admin>[] = [
  {
    id: 'index',
    header: '#',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'createdAt',
    header: 'Creation Date',
    cell: ({ row }) => {
      const createdAt: string = row.getValue('createdAt');
      const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      return formattedDate;
    },
  },
];

export const AdminClient = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <div className="flex justify-between items-center mt-2">
        <p className="font-bold text-2xl">Admins List</p>
        <Button onClick={handleOpen}>Add Admin</Button>
      </div>
      <CreateAdminModal open={open} handleOpen={handleOpen} />
    </>
  );
};

function CreateAdminModal({ open, handleOpen }: { open: boolean; handleOpen: () => void }) {
  const isDesktop = useIsMobile();

  if (!isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Admin</DialogTitle>
            <DialogDescription>This dialog Allows you to create admin</DialogDescription>
          </DialogHeader>
          <CreateAdminForm handleOpen={handleOpen} />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={handleOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Create Admin</DrawerTitle>
          <DrawerDescription>This dialog Allows you to create admin</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <CreateAdminForm handleOpen={handleOpen} />
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
function CreateAdminForm({ handleOpen }: { handleOpen: () => void }) {
  const [loading, setLoading] = useState(false);
  const form = hookForm.useForm<z.infer<typeof adminValidation>>({
    resolver: zodResolver(adminValidation),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'Admin',
    },
  });
  const { fetchUsers } = useAdminStore();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof adminValidation>) {
    try {
      setLoading(true);
      const { success, message } = await createAdmin(values);
      if (success) {
        toast.success(message);
        fetchUsers();
      } else toast.error(message);
    } catch (error) {
      console.error(error);
      toast.error('Something Went Wrong!');
    } finally {
      setLoading(false);
      handleOpen();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Admin Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter password" {...field} />
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
