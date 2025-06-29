'use client';
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
import { tutorialSchema } from '@repo/shared/validations';
import { hookForm, z, zodResolver } from '@repo/ui';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CustomSelect } from '@repo/ui/components/ui/custom-select';
import { TutorialDataType } from '@/types/tutorials';

export function CreateTutorialModal({
  open,
  handleClose,
  data,
  onSave,
}: {
  open: boolean;
  handleClose: (edit: boolean) => void;
  data?: TutorialDataType | null;
  onSave: (values: z.infer<typeof tutorialSchema>, tutorialId?: string) => void;
  isEdit?: boolean;
}) {
  const form = hookForm.useForm<z.infer<typeof tutorialSchema>>({
    resolver: zodResolver(tutorialSchema),
    defaultValues: {
      title: '',
      description: '',
      slug: '',
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        slug: data.slug,
        description: data.description,
        categoryId: data.categories.map((it) => it.categoryId),
      });
    } else {
      form.reset({
        title: '',
        slug: '',
        description: '',
      });
    }
  }, [data, form]);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'title') {
        const generatedSlug = value.title?.toLowerCase().replace(/\s+/g, '-');
        form.setValue('slug', generatedSlug || '');
      }
    });

    return () => subscription.unsubscribe();
  }, [form, data]);

  const {
    data: categories = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ['tutorial-categories'],
    queryFn: async () => {
      const response = await fetch('/api/admin/tutorials/category');
      const data = await response.json();
      return data.categories || [];
    },
  });

  function onSubmit(values: z.infer<typeof tutorialSchema>) {
    onSave(values, data?.id);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{!data ? 'Create Tutorial' : 'Edit Tutorial'}</DialogTitle>
          <DialogDescription>
            This modal helps you {data ? 'edit' : 'create'} tutorial
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-5 ">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
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
                      <Input placeholder="shadcn" {...field} readOnly />
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
                        placeholder="Write Meta description"
                        {...field}
                        className="min-h-[200px]"
                      />
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
                              categories.map((cat: { name: string; id: string }) => ({
                                label: cat.name,
                                value: cat.id,
                              }))
                        }
                        isMulti={true}
                        isLoading={isPending}
                        placeholder="Select multiple categories"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" id="create-btn" className="hidden">
                Submit
              </Button>
            </form>
          </Form>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'} id="close-btn">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={() => (document.querySelector('#create-btn') as HTMLButtonElement)?.click()}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
