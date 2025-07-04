'use client';
import { newsletterSchema } from '@repo/shared/validations';
import { hookForm, Loader, z, zodResolver } from '@repo/ui';
import React, { useState } from 'react';
import { IoPeople } from 'react-icons/io5';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { Button } from '@repo/ui/components/ui/button';
import { Checkbox } from '@repo/ui/components/ui/checkbox';
import { motion } from 'motion/react';
import { toast } from '@repo/ui/components/ui/sonner';
import axios from 'axios';

export default function NewsletterSection() {
  const [loading, setLoading] = useState(false);
  const form = hookForm.useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
      isJobs: true,
      isTechnical: true,
    },
  });

  async function onSubmit(values: z.infer<typeof newsletterSchema>) {
    try {
      setLoading(true);

      const { data } = await axios.post('/api/utility/newsletter', values);

      toast.success(data.message, {
        description: 'You’ll now receive updates in your inbox.',
      });

      form.reset();
    } catch (err) {
      toast.error('Something went wrong.', {
        description: 'Please try again later.',
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full py-16 bg-muted/50 dark:bg-muted/30 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto flex flex-col items-center text-center gap-6 px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          viewport={{ once: true }}
          className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
        >
          <IoPeople className="w-4 h-4 mr-2" />
          <p className="text-xs sm:text-sm">Join smart devs army💡</p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight"
        >
          Code Smarter. Build Better.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-muted-foreground max-w-md text-base sm:text-lg"
        >
          Get dev tips, tutorials, and job updates — straight to your inbox. No fluff. Just value.
        </motion.p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-2 items-center"
          >
            <div className="w-full flex flex-col sm:flex-row items-center gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormControl>
                      <Input
                        placeholder="Your email address ✨"
                        {...field}
                        className="w-full sm:min-w-[300px]"
                        type="email"
                        required={true}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full sm:w-auto text-white mt-4 sm:mt-0"
                disabled={loading}
              >
                {loading && <Loader className="animate-spin" />}
                {loading ? 'Subscribing...' : 'Subscribe Now'}
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-5">
              <FormField
                control={form.control}
                name="isTechnical"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      Get technical content (tips, tutorials)
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isJobs"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      Get job & opportunity alerts
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>

        <p className="text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
      </motion.div>
    </div>
  );
}
