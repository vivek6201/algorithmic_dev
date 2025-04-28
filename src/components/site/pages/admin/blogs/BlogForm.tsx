'use client';
import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { blogFormSchema } from '@/validations/blogValidations';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import RichTextEditor from '@/components/site/shared/editor/TextEditor';
import { useQuery } from '@tanstack/react-query';
import CustomSelect from '@/components/ui/custom-select';
import createBlog, { updateBlog } from '@/actions/admin/blogs/blog';
import { toast } from 'sonner';
import { useRouter } from 'nextjs-toploader/app';

function BlogForm({
  blog,
  isEdit = false,
}: {
  isEdit: boolean;
  blog?: z.infer<typeof blogFormSchema>;
}) {
  const form = useForm<z.infer<typeof blogFormSchema>>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      author: '',
      categoryId: '',
      content: '',
      coverImage: '',
      description: '',
      title: '',
      slug: '',
    },
  });
  const {
    data: categories = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const response = await fetch('/api/admin/blogs/category');
      const data = await response.json();
      return data.categories || [];
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (isEdit && blog) {
      form.reset(blog);
    }
  }, [isEdit, blog, form]);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'title') {
        const generatedSlug = value.title?.toLowerCase().replace(/\s+/g, '-');
        form.setValue('slug', generatedSlug || '');
      }
    });

    return () => subscription.unsubscribe();
  }, [form, isEdit]);

  async function onSubmit(values: z.infer<typeof blogFormSchema>) {
    if (isEdit) {
      if (!blog) {
        toast.error('Blog data is missing.');
        return;
      }
      const { success, message } = await updateBlog(blog.slug, values);

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success('Blog updated successfully!');
      router.push('/admin/blogs');
    } else {
      const { success, error, message } = await createBlog(values);

      if (!error && !success) {
        console.error(error);
        toast.error(message);
        return;
      }

      toast.success('Blog created successfully');
      router.push('/admin/blogs');
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Title of the blog.." {...field} />
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
                  <Input placeholder="Enter category Slug" {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                        : //@typescript-eslint/no-explicit-any
                          categories.map((cat: any) => ({
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
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Enter author of the blog.." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <Input placeholder="Enter cover image url of the blog.." {...field} />
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
                  <Input placeholder="Enter description url of the blog.." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default BlogForm;
