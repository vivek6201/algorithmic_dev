"use client";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { tutorialChapterSchema } from "@/validations/tutorialValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { createChapter } from "@/actions/admin/tutorials/chapters";
import { toast } from "sonner";

export default function HandleChapterModal({
  isEdit = false,
  tutorialSlug,
  open,
  handleClose,
  data,
}: {
  isEdit?: boolean;
  tutorialSlug: string;
  open: boolean;
  handleClose: () => void;
  data?: any;
}) {
  const router = useRouter();

  console.log({ data });

  const form = useForm<z.infer<typeof tutorialChapterSchema>>({
    resolver: zodResolver(tutorialChapterSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "title") {
        const generatedSlug = value.title?.toLowerCase().replace(/\s+/g, "-");
        form.setValue("slug", generatedSlug || "");
      }
    });

    return () => subscription.unsubscribe();
  }, [form, isEdit]);

  async function onSubmit(values: z.infer<typeof tutorialChapterSchema>) {
    const { success, message } = await createChapter(tutorialSlug, values);
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
    (document.querySelector("#close-btn") as HTMLButtonElement).click();
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogClose id="close-btn" />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit" : "Create"} Chapter</DialogTitle>
          <DialogDescription>
            This Modal allows you to {isEdit ? "edit" : "create"} chapter
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-5"
          >
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
                    <Input
                      placeholder="Slug is auto-generated"
                      {...field}
                      readOnly
                    />
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
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => form.reset()}
                >
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
