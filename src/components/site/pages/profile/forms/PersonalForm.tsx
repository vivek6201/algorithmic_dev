import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import personalValidation from '@/validations/profile/personal';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PersonType } from '@/generated/prisma';
import { UserDataType } from '@/helpers/main/userDataGetter';

export default function PersonalForm({
  closeEdit,
  userData,
}: {
  closeEdit: () => void;
  userData: UserDataType;
}) {
  const form = useForm<z.infer<typeof personalValidation>>({
    resolver: zodResolver(personalValidation),
    defaultValues: {
      name: '',
      bio: '',
      dob: undefined,
      personType: undefined,
      phoneNo: '',
    },
  });

  useEffect(() => {
    form.reset({
      name: userData?.name ?? '',
      bio: userData?.profile?.bio,
      dob: userData?.profile?.dateOfBirth,
      personType: userData?.profile?.personType,
      phoneNo: userData?.profile?.phoneNumber ?? '',
    });
  }, [form, userData]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof personalValidation>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
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
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Write a bio" {...field} className="resize-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="center">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Who are you?</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Who are you?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Who Are You?</SelectLabel>
                      <SelectItem value={PersonType.SCHOOL_STUDENT}>School Student</SelectItem>
                      <SelectItem value={PersonType.SELF_EMPLOYED}>Self Employed</SelectItem>
                      <SelectItem value={PersonType.WORKING_PROFESSIONAL}>
                        Working Professional
                      </SelectItem>
                      <SelectItem value={PersonType.OTHER}>Others</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Phone Number <span className="opacity-60 text-xs">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your Phone number" {...field} className="resize-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 items-center">
          <Button
            type="submit"
            className="select-none bg-green-700 text-white hover:bg-green-800"
            size={'sm'}
          >
            Submit
          </Button>
          <Button type="button" onClick={closeEdit} size={'sm'} className="select-none">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
