"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { blogCategorySchema } from "@/validations/blogValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogCategory } from "@prisma/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CategoryModal({
  open,
  handleClose,
  onSave,
  editData,
}: {
  open: boolean;
  handleClose: () => void;
  onSave: (data: z.infer<typeof blogCategorySchema>) => void;
  editData?: BlogCategory | null;
}) {
  const form = useForm<z.infer<typeof blogCategorySchema>>({
    resolver: zodResolver(blogCategorySchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  // Reset form when edit data changes
  useEffect(() => {
    if (editData) {
      form.reset({
        name: editData.name,
        slug: editData.slug,
      });
    } else {
      form.reset({
        name: "",
        slug: "",
      });
    }
  }, [editData, form]);

  // Watch for name changes to auto-generate slug
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "name") {
        const generatedSlug = value.name
          ?.toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
        form.setValue("slug", generatedSlug || "");
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  function onSubmit(values: z.infer<typeof blogCategorySchema>) {
    onSave(values);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editData ? "Edit Category" : "Create Category"}
          </DialogTitle>
          <DialogDescription>
            {editData
              ? "Update an existing blog category"
              : "Add a new blog category to your site"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Slug{" "}
                    <span className="text-black/50 dark:text-white/30">
                      (auto-generated)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="category-slug" {...field} />
                  </FormControl>
                  <FormDescription>
                    Used in URLs for this category
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">
                {editData ? "Update" : "Create"} Category
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
