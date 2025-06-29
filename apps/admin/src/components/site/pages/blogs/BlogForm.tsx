'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'nextjs-toploader/app';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@repo/ui/components/ui/sonner';
import { zodResolver } from '@repo/ui';
import { hookForm } from '@repo/ui';
import { z } from '@repo/ui';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { Button } from '@repo/ui/components/ui/button';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { CustomSelect } from '@repo/ui/components/ui/custom-select';
import RichTextEditor from '@/components/site/shared/editor/TextEditor';
import createBlog, { updateBlog } from '@/actions/blogs/blog';
import { blogFormSchema } from '@repo/shared/validations';
import uploadFileToCloud from '@/actions/common/upload-file';

type BlogFormProps = {
  isEdit: boolean;
  blog?: z.infer<typeof blogFormSchema>;
};

export default function BlogForm({ blog, isEdit }: BlogFormProps) {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const form = hookForm.useForm<z.infer<typeof blogFormSchema>>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: '',
      slug: '',
      categoryId: '',
      author: '',
      coverImage: '',
      description: '',
      content: '',
    },
  });

  const {
    data: categories = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const res = await fetch('/api/admin/blogs/category');
      const data = await res.json();
      return data.categories || [];
    },
  });

  // Prefill form when editing
  useEffect(() => {
    if (isEdit && blog) {
      form.reset(blog);
    }
  }, [isEdit, blog, form]);

  // Generate slug from title
  useEffect(() => {
    const sub = form.watch((value, { name }) => {
      if (name === 'title') {
        const slug = value.title?.toLowerCase().replace(/\s+/g, '-') || '';
        form.setValue('slug', slug);
      }
    });
    return () => sub.unsubscribe();
  }, [form]);

  //fix this later
  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await uploadFileToCloud(formData);
    setUploading(false);

    if (!res) {
      toast.error('Failed to upload image');
      return;
    }

    form.setValue('coverImage', res.secure_url);
  };

  const onSubmit = async (values: z.infer<typeof blogFormSchema>) => {
    const result = isEdit ? await updateBlog(blog?.slug || '', values) : await createBlog(values);

    if (!result.success) {
      toast.error(result.message || 'Something went wrong');
      return;
    }

    toast.success(isEdit ? 'Blog updated!' : 'Blog created!');
    router.push('/dashboard/blogs');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter blog title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Slug (readonly) */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} readOnly disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <CustomSelect
                  value={field.value}
                  onChange={field.onChange}
                  options={
                    error
                      ? []
                      : categories.map((cat: { name: string; id: string }) => ({
                          label: cat.name,
                          value: cat.id,
                        }))
                  }
                  isLoading={isPending}
                  placeholder="Select a category"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Author */}
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Enter author's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cover Image Upload */}
        <FormField
          control={form.control}
          name="coverImage"
          render={() => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-y-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                  />
                  {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
                  {form.watch('coverImage') !== '' && (
                    <div className="flex items-center gap-4">
                      <Image
                        src={form.watch('coverImage') || ''}
                        alt="Cover Preview"
                        width={500}
                        height={300}
                        className="h-32 w-auto object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          form.setValue('coverImage', '');
                        }}
                      >
                        Clear
                      </Button>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Short summary or teaser..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <RichTextEditor
                  content={field.value}
                  onChange={field.onChange}
                  className="min-h-[300px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{isEdit ? 'Update Blog' : 'Publish Blog'}</Button>
      </form>
    </Form>
  );
}
