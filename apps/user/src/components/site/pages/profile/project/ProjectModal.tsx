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
import { projectValidation } from '@repo/shared/validations';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { updateProjectData } from '@/actions/main/profile';
import { toast } from '@repo/ui/components/ui/sonner';
import { useSession } from 'next-auth/react';
import { useUserProfile } from '@/contexts/ProfileContext';
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

export default function ProjectModal({
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
            <ProjectForm handleClose={handleClose} />
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Add/Edit Project Details</DialogTitle>
          <DialogDescription>This modal helps you add or edit education data.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96 my-5">
          <ProjectForm handleClose={handleClose} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function ProjectForm({ handleClose }: { handleClose: () => void }) {
  const session = useSession();
  const { triggerRefetch } = useUserProfile();
  const { project } = useProfileStore();

  const form = hookForm.useForm<z.infer<typeof projectValidation>>({
    resolver: zodResolver(projectValidation),
    defaultValues: {
      projectName: '',
      description: '',
      startDate: undefined,
      endDate: undefined,
      githubLink: '',
      inProgress: false,
      projectLink: '',
    },
  });

  useEffect(() => {
    if (project) {
      form.reset({
        projectName: project.projectName,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate ?? undefined,
        githubLink: project.githubLink ?? undefined,
        inProgress: project.inProgress,
        projectLink: project.projectLink ?? undefined,
      });
    }
  }, [project, form]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof projectValidation>) {
    try {
      const { success, message } = await updateProjectData(
        values,
        session.data?.user?.profileId ?? '',
      );
      if (!success) {
        toast.error(message);
        return;
      }
      toast.success(message);
    } catch (error) {
      console.error(error instanceof Error ? error.message : error);
      toast.error('internal server error');
    } finally {
      triggerRefetch();
      handleClose();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4 px-2">
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="shadcn" {...field} />
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
                  disabled={form.watch('inProgress')}
                  minDate={form.watch('startDate')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="inProgress"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel></FormLabel>
                <FormDescription>Are you currently working in this project</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Link</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github Link</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="flex gap-2">
          <DialogClose asChild>
            <Button variant={'outline'} type="button">
              Close
            </Button>
          </DialogClose>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
