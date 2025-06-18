import { FeedbackFormData } from '@/types/main';
import { feedbackSchema } from '@repo/shared/validations';
import { Heart, hookForm, Send, Star, zodResolver } from '@repo/ui';
import React, { useMemo, useState } from 'react';
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
import { Input } from '@repo/ui/components/ui/input';
import { cn } from '@repo/ui/lib/utils';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@repo/ui/components/ui/radio-group';
import { Label } from '@repo/ui/components/ui/label';
import { feedbackTypes } from '@/lib/constants';
import { feedbackAction } from '@/actions/main/feedback';
import { toast } from '@repo/ui/components/ui/sonner';
import { useUtilityStore } from '@/store/utilityStore';

export default function FeedbackForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { setOpenFeedbackModal } = useUtilityStore();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const form = hookForm.useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: '',
      email: undefined,
      message: '',
      rating: undefined,
      type: undefined,
    },
  });

  const selectedType = form.watch('type');

  async function onSubmit(values: FeedbackFormData) {
    setIsLoading(true);
    const res = await feedbackAction(values);

    if (res.success) {
      toast.message(res.data.message);
    } else {
      toast.error(res.error);
    }
    setIsLoading(false);
    setOpenFeedbackModal(false);
  }

  const handleRatingClick = (value: number) => {
    setRating(value);
    form.setValue('rating', value);
  };

  const StarComponent = useMemo(
    () => () => (
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
    ),
    [hoverRating, rating],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4 mx-auto">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white/80 mb-2">
          We'd love your feedback
        </h2>
        <p className="text-gray-600">Help us improve by sharing your thoughts</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </motion.div>

          {/* Feedback Type */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What type of feedback is this?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="space-y-2"
                    >
                      {feedbackTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <motion.div
                            key={type.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Label
                              htmlFor={type.id}
                              className={cn(
                                'flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200',
                                selectedType === type.id
                                  ? `${type.bgColor} ${type.color} border-current`
                                  : 'bg-gray-50 dark:bg-transparent border-gray-200 dark:border-border hover:bg-gray-100',
                              )}
                            >
                              <RadioGroupItem value={type.id} id={type.id} className="sr-only" />
                              <div
                                className={cn(
                                  'flex items-center justify-center w-8 h-8 rounded-full',
                                )}
                              >
                                <Icon
                                  className={cn(
                                    'w-4 h-4',
                                    selectedType === type.id ? type.color : 'text-gray-400',
                                  )}
                                />
                              </div>
                              <div>
                                <div className="font-medium ">{type.label}</div>
                                <div
                                  className={cn(
                                    'text-sm text-gray-500',
                                    selectedType === type.id && 'dark:text-gray-400',
                                  )}
                                >
                                  {type.description}
                                </div>
                              </div>
                            </Label>
                          </motion.div>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

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
                    <Textarea placeholder="Enter your valuable feedback" {...field} />
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
          >
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:opacity-50"
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
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
}
