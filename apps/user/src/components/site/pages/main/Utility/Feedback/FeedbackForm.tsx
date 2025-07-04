import { FeedbackFormData, FeedbackStatus } from '@/types/main';
import { feedbackSchema } from '@repo/shared/validations';
import { Heart, hookForm, Send, Star, zodResolver } from '@repo/ui';
import React, { useCallback, useMemo, useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { AnimatePresence, motion } from 'motion/react';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { feedbackAction } from '@/actions/main/feedback';
import { toast } from '@repo/ui/components/ui/sonner';
import { useUtilityStore } from '@/store/utilityStore';
import { cn } from '@repo/ui/lib/utils';
import { useLocalStorage } from '@repo/ui/hooks';

export default function FeedbackForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { setOpenFeedbackModal } = useUtilityStore();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { setValue: setFeedbackStatus } = useLocalStorage<FeedbackStatus>('feedback-status', {
    action: 'later',
    timestamp: 0,
  });

  const form = hookForm.useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: undefined,
      message: '',
    },
  });

  const handleAskLater = () => {
    setFeedbackStatus({ action: 'later', timestamp: Date.now() });
    setOpenFeedbackModal(false);
  };

  async function onSubmit(values: FeedbackFormData) {
    setIsLoading(true);
    const res = await feedbackAction(values);

    if (res.success) {
      toast.message(res.data.message);
    } else {
      toast.error(res.error);
    }
    setIsLoading(false);
    setFeedbackStatus({ action: 'submitted', timestamp: Date.now() });
    setOpenFeedbackModal(false);
  }

  // Wrap handleRatingClick in useCallback to prevent unnecessary re-renders
  const handleRatingClick = useCallback(
    (value: number) => {
      setRating(value);
      form.setValue('rating', value);
    },
    [form],
  );

  // Add displayName to the component
  const StarComponent = useMemo(() => {
    const Component = () => (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleRatingClick(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Star
              className={cn(
                'w-8 h-8 transition-colors duration-200',
                star <= (hoverRating || rating) ? 'text-yellow-400 fill-current' : 'text-gray-300',
              )}
            />
          </motion.button>
        ))}
      </div>
    );

    // Add displayName to fix the warning
    Component.displayName = 'StarComponent';
    return Component;
  }, [handleRatingClick, hoverRating, rating]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-4 mx-auto">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white/80 ">
          Give your Valuable feedback
        </h2>
        <p className="text-gray-600">Help us improve by sharing your thoughts</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
          {/* Rating */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FormField
              control={form.control}
              name="rating"
              render={() => (
                <FormItem>
                  <FormLabel>How would you rate your experience?</FormLabel>
                  <FormControl>
                    <StarComponent />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your valuable feedback"
                      {...field}
                      className="text-sm md:text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col md:flex-row gap-2"
          >
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="submit"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Feedback</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
            <Button
              type="button"
              variant={'secondary'}
              onClick={handleAskLater}
              className="w-full "
            >
              Ask me later
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
}

FeedbackForm.displayName = 'FeedbackForm';
