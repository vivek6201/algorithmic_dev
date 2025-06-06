'use client';
import { $Enums, JobType } from '@repo/db';
import React, { useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { hookForm, zodResolver, z } from '@repo/ui';
import { jobSchema } from '@repo/shared/validations';
import { useRouter } from 'nextjs-toploader/app';
import { createJob, updateJob } from '@/actions/jobs/job';
import { toast } from '@repo/ui/components/ui/sonner';
import { Input } from '@repo/ui/components/ui/input';
import { Button } from '@repo/ui/components/ui/button';
import RichTextEditor from '@/components/site/shared/editor/TextEditor';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { CustomSelect } from '@repo/ui/components/ui/custom-select';
import { useQuery } from '@tanstack/react-query';

type JobProps = {
  jobCategories: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
  }[];
  description: string;
  link: string;
  salaryRange: string;
  slug: string;
  shortDescription: string;
  title: string;
};

const experienceLevel = Object.values($Enums.ExperienceLevel).map((value) => ({
  label: value.split('_').join(' '),
  value: value,
}));

export default function JobsForm({ job, isEdit = false }: { isEdit?: boolean; job?: JobProps }) {
  const form = hookForm.useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      categories: [],
      description: '',
      link: '',
      salaryRange: '',
      slug: '',
      shortDescription: '',
      title: '',
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (isEdit && job) {
      form.reset({
        ...job,
        categories: job.jobCategories.map((category) => category.id),
      });
    }
  }, [isEdit, job, form]);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'title') {
        const generatedSlug = value.title?.toLowerCase().replace(/\s+/g, '-');
        form.setValue('slug', generatedSlug || '');
      }
    });

    return () => subscription.unsubscribe();
  }, [form, isEdit]);

  const {
    data: categories = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const response = await fetch('/api/admin/jobs/category');
      const { data } = await response.json();
      return data;
    },
  });

  async function onSubmit(values: z.infer<typeof jobSchema>) {
    if (isEdit) {
      if (!job) {
        toast.error('Job data is missing.');
        return;
      }
      const { success, message } = await updateJob(job.slug, values);

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success('Job updated successfully!');
      router.push('/dashboard/jobs');
    } else {
      const { success, error, message } = await createJob(values);

      if (!error && !success) {
        console.error(error);
        toast.error(message);
        return;
      }

      toast.success('Job created successfully');
      router.push('/dashboard/jobs');
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job type</FormLabel>
                <FormControl>
                  <CustomSelect
                    options={[
                      { label: 'Internship', value: JobType.Internship },
                      { label: 'Full-Time', value: JobType.FullTime },
                    ]}
                    onChange={field.onChange}
                    value={field.value}
                    placeholder="Enter Experience Level"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experienceLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Level</FormLabel>
                <FormControl>
                  <CustomSelect
                    options={experienceLevel}
                    onChange={field.onChange}
                    value={field.value}
                    placeholder="Enter Experience Level"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categories"
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
                    isMulti={true}
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
            name="shortDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter short description of the job.." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apply Link</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Apply link of the job" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salaryRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary Range</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Salary Range of the job" {...field} />
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
