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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { CustomCalendar } from '@repo/ui/components/ui/custom-calender';
import { Input } from '@repo/ui/components/ui/input';
import { Switch } from '@repo/ui/components/ui/switch';
import { hookForm, z, zodResolver } from '@repo/ui';
import { educationValidation } from '@repo/shared/validations';
import { updateEducationData } from '@/actions/main/profile';
import { useSession } from 'next-auth/react';
import { toast } from '@repo/ui/components/ui/sonner';
import { useIsMobile } from '@repo/ui/hooks/use-mobile';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@repo/ui/components/ui/drawer';
import { ScrollArea } from '@repo/ui/components/ui/scroll-area';
import { useProfileStore } from '@/store/profileStore';
import { useUserStore } from '@/store/userStore';

export default function EducationModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={handleClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add / Edit Project</DrawerTitle>
            <DrawerDescription>Manage your project details here.</DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="h-72 my-5">
            <EducationForm handleClose={handleClose} />
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Add/Edit Education Details</DialogTitle>
          <DialogDescription>This modal helps you add or edit education data.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96 my-5">
          <EducationForm handleClose={handleClose} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function EducationForm({ handleClose }: { handleClose: () => void }) {
  const session = useSession();
  const { refetchProfile } = useUserStore();
  const { education } = useProfileStore();

  const form = hookForm.useForm<z.infer<typeof educationValidation>>({
    resolver: zodResolver(educationValidation),
    defaultValues: {
      schoolName: '',
      currentlyEnrolled: false,
      degree: '',
      endDate: undefined,
      fieldOfStudy: '',
      grade: '',
      startDate: undefined,
    },
  });

  useEffect(() => {
    if (education) {
      form.reset({
        currentlyEnrolled: education.currentlyEnrolled,
        degree: education.degree,
        startDate: education.startDate ? new Date(education.startDate) : undefined,
        endDate: education.endDate ? new Date(education.endDate) : undefined,
        fieldOfStudy: education.fieldOfStudy,
        grade: education.grade ?? undefined,
        schoolName: education.schoolName,
      });
    } else {
      form.reset();
    }
  }, [education, form]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof educationValidation>) {
    try {
      if (education) {
        const { success, message } = await updateEducationData(
          values,
          session.data?.user?.profileId ?? '',
          education.id,
        );
        if (!success) {
          toast.error(message);
          return;
        }
        toast.success(message);
      } else {
        const { success, message } = await updateEducationData(
          values,
          session.data?.user?.profileId ?? '',
        );
        if (!success) {
          toast.error(message);
          return;
        }
        toast.success(message);
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : error);
      toast.error('internal server error');
    } finally {
      handleClose();
      refetchProfile();
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4 p-2">
        <FormField
          control={form.control}
          name="schoolName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institute Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="degree"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Degree</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fieldOfStudy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field Of Study</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <CustomCalendar value={field.value ?? null} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <CustomCalendar
                  value={field.value ?? null}
                  onChange={field.onChange}
                  disabled={form.watch('currentlyEnrolled')}
                  minDate={form.watch('startDate')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currentlyEnrolled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel></FormLabel>
                <FormDescription>Are you currently enrolled in a degree</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="flex gap-2">
          <DialogClose asChild>
            <Button variant={'outline'}>Close</Button>
          </DialogClose>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
