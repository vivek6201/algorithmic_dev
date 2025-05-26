import React, { useEffect } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';
import { Button } from '@repo/ui/components/ui/button';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { CustomSelect } from '@repo/ui/components/ui/custom-select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { hookForm, z, zodResolver } from '@repo/ui';
import { personalValidation } from '@repo/shared/validations';
import { Input } from '@repo/ui/components/ui/input';
import { CustomCalendar } from '@repo/ui/components/ui/custom-calender';
import { PersonType } from '@repo/db';
import { useSession } from 'next-auth/react';
import { useUserProfile } from '@/contexts/ProfileContext';

export default function UserModal({ open, handleOpen }: { handleOpen: () => void; open: boolean }) {
  const { data: sessionData } = useSession();
  const { profileData } = useUserProfile();

  const form = hookForm.useForm<z.infer<typeof personalValidation>>({
    resolver: zodResolver(personalValidation),
    defaultValues: {
      name: '',
      bio: '',
      dob: undefined,
      personType: undefined,
      phoneNo: '',
    },
  });

  // Reset form values when data is available
  useEffect(() => {
    if (!sessionData || !profileData) return;

    form.reset({
      name: sessionData.user?.name ?? '',
      bio: profileData.bio ?? '',
      dob:
        profileData.dateOfBirth && !isNaN(new Date(profileData.dateOfBirth).getTime())
          ? new Date(profileData.dateOfBirth)
          : undefined,
      personType: profileData.personType ?? undefined,
      phoneNo: profileData.phoneNumber ?? '',
    });
  }, [sessionData, profileData, form]);

  function onSubmit(values: z.infer<typeof personalValidation>) {
    console.log(values);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Add/Edit Personal Details</DialogTitle>
          <DialogDescription>This modal helps you add or edit education data.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Who are you?</FormLabel>
                  <FormControl>
                    <CustomSelect
                      onChange={field.onChange}
                      value={field.value}
                      options={Object.values(PersonType).map((type) => ({
                        label: type.split('_').join(' '),
                        value: type,
                      }))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <CustomCalendar
                      value={field.value ?? null}
                      onChange={field.onChange}
                      maxDate={new Date()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Phone Number <span className="text-xs opacity-65">optional</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={'outline'}>Close</Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
