'use client';
import { JobCategory } from '@repo/db';
import { jobCategorySchema } from '@repo/shared/validations';
import React from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { useEffect } from 'react';
import { hookForm, zodResolver, z } from '@repo/ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';
import { Input } from '@repo/ui/components/ui/input';
import { Button } from '@repo/ui/components/ui/button';
import { Textarea } from '@repo/ui/components/ui/textarea';

export default function ManageJobCategoryModal({
  open,
  handleClose,
  onSave,
  editData,
}: {
  open: boolean;
  handleClose: () => void;
  onSave: (values: z.infer<typeof jobCategorySchema>, categoryId?: string) => Promise<void>;
  editData?: JobCategory | null;
}) {
  const form = hookForm.useForm<z.infer<typeof jobCategorySchema>>({
    resolver: zodResolver(jobCategorySchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
    },
  });

  // Reset form when edit data changes
  useEffect(() => {
    if (editData) {
      form.reset({
        name: editData.name,
        slug: editData.slug,
        description: editData.description ?? '',
      });
    } else {
      form.reset({
        name: '',
        slug: '',
        description: '',
      });
    }
  }, [editData, form]);

  // Watch for name changes to auto-generate slug
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'name') {
        const generatedSlug = value.name
          ?.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
        form.setValue('slug', generatedSlug || '');
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  function onSubmit(values: z.infer<typeof jobCategorySchema>) {
    onSave(values, editData?.id);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editData ? 'Edit Category' : 'Create Category'}</DialogTitle>
          <DialogDescription>
            {editData ? 'Update an existing blog category' : 'Add a new blog category to your site'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
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
                  <FormLabel>Category Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter category Description" {...field} />
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
                  <FormLabel>
                    Slug <span className="text-black/50 dark:text-white/30">(auto-generated)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="category-slug" {...field} />
                  </FormControl>
                  <FormDescription>Used in URLs for this category</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">{editData ? 'Update' : 'Create'} Category</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
