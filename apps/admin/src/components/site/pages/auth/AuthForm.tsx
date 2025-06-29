'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { loginValidation } from '@repo/shared/validations';
import { useState } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { toast } from '@repo/ui/components/ui/sonner';
import { signIn } from 'next-auth/react';
import { hookForm, zodResolver } from '@repo/ui';
import { z } from '@repo/ui';

export function AuthForm() {
  return (
    <Card className="w-11/12 max-w-[450px]">
      <CardHeader>
        <CardTitle className="text-2xl"> Login </CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}

function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const form = hookForm.useForm<z.infer<typeof loginValidation>>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginValidation>) {
    const timeout = toast.loading('Signing in, please wait!');
    const response = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    toast.dismiss(timeout);

    if (response?.error) {
      toast.error('Signin failed!');
      return;
    }

    toast.success('Signin successful!');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-y-5 flex-col">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative flex flex-col">
                  <Input type={showPass ? 'text' : 'password'} placeholder="......." {...field} />
                  <Button
                    variant={'ghost'}
                    size={'icon'}
                    type="button"
                    onClick={() => setShowPass((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm"
                  >
                    {showPass ? 'Hide' : 'Show'}
                  </Button>
                  <Button
                    variant={'link'}
                    type="button"
                    className="text-blue-400 cursor-pointer self-end"
                    onClick={() => router.push('/reset-pass')}
                  >
                    Reset Password
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
