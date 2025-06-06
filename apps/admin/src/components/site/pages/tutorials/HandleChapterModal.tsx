'use client';
import { useRouter } from 'nextjs-toploader/app';
import React, { useEffect } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { hookForm, z, zodResolver } from '@repo/ui';
import { tutorialChapterSchema } from '@repo/shared/validations';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { createChapter, editTutorialChapter } from '@/actions/tutorials/chapters';
import { toast } from '@repo/ui/components/ui/sonner';
import { ChapterListProps } from './ChapterList';

export default function HandleChapterModal({
  tutorialSlug,
  open,
  handleClose,
  data,
}: {
  tutorialSlug: string;
  open: boolean;
  handleClose: (edit: boolean) => void;
  data?: ChapterListProps['chapters'][number] | null;
}) {
  const router = useRouter();

  const form = hookForm.useForm<z.infer<typeof tutorialChapterSchema>>({
    resolver: zodResolver(tutorialChapterSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      order: 0,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        slug: data.slug,
        description: data.description || undefined,
        order: data.order,
      });
    } else {
      form.reset({
        title: '',
        slug: '',
        description: '',
        order: 0,
      });
    }
  }, [data, form]);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'title') {
        const generatedSlug = value.title?.toLowerCase().replace(/\s+/g, '-');
        form.setValue('slug', generatedSlug || '');
      }
      if (name === 'order') {
        const orderValue = value.order ? parseInt(value.order.toString(), 10) : undefined;
        if (orderValue !== undefined && !isNaN(orderValue) && orderValue !== value.order) {
          form.setValue('order', orderValue);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form, data]);

  async function onSubmit(values: z.infer<typeof tutorialChapterSchema>) {
    if (data && data.id) {
      const { success, message } = await editTutorialChapter(values, data.id);
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
      router.refresh();
    } else {
      const { success, message } = await createChapter(tutorialSlug, values);
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
      router.refresh();
    }
    (document.querySelector('#close-btn') as HTMLButtonElement).click();
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogClose id="close-btn" />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{data ? 'Edit' : 'Create'} Chapter</DialogTitle>
          <DialogDescription>
            This Modal allows you to {data ? 'edit' : 'create'} chapter
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Slug is auto-generated" {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Chapter Order" type="number" {...field} />
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
                    <Textarea
                      placeholder="Enter Description"
                      className="min-h-[300px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant={'outline'} onClick={() => form.reset()}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
