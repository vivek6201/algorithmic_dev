'use client';
import { tutorialTopicSchema } from '@/validations/tutorialValidation';
import React, { useEffect } from 'react';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'nextjs-toploader/app';
import { createTopic, updateTopic } from '@/actions/admin/tutorials/topics';
import { toast } from 'sonner';

export default function TopicForm({
  slug,
  topic,
  isEdit = false,
}: {
  slug: string;
  topic?: z.infer<typeof tutorialTopicSchema> | null;
  isEdit: boolean;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof tutorialTopicSchema>>({
    resolver: zodResolver(tutorialTopicSchema),
    defaultValues: {
      content: '',
      order: 0,
      slug: '',
      title: '',
    },
  });

  useEffect(() => {
    if (isEdit && topic) {
      form.reset(topic);
    } else {
      form.reset({
        content: '',
        order: 0,
        slug: '',
        title: '',
      });
    }
  }, [isEdit, topic, form]);

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
  }, [form, isEdit]);

  async function onSubmit(values: z.infer<typeof tutorialTopicSchema>) {
    if (isEdit) {
      if (!topic) {
        toast.error('Topic data is missing.');
        return;
      }

      const timeout = toast.loading('Creating Topic, please wait...');
      const { success, message } = await updateTopic(topic.slug, values);
      toast.dismiss(timeout);

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success(message);
    } else {
      const timeout = toast.loading('Creating Topic, please wait...');
      const { success, message } = await createTopic(slug, values);
      toast.dismiss(timeout);

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success(message);
    }
    router.refresh();
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Title of the Topic.." {...field} />
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
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Topic Order" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
                    className="min-h-[500px]"
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
