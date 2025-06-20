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
import { loginValidation, signupValidation } from '@repo/shared/validations';
import { useState } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import signupAction from '@/actions/auth/signup';
import { toast } from '@repo/ui/components/ui/sonner';
import { signIn } from 'next-auth/react';
import { CheckCircle, hookForm, zodResolver, z } from '@repo/ui';
import { useUtilityStore } from '@/store/utilityStore';

interface Proptype extends React.ComponentPropsWithoutRef<'div'> {
  isLogin: boolean;
}

export function AuthForm({ isLogin }: Proptype) {
  const handleLogin = async (type: 'github' | 'google') => {
    await signIn(type, { redirectTo: '/' });
  };

  return (
    <Card className="w-11/12 max-w-sm sm:max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">{isLogin ? 'Login' : 'Signup'}</CardTitle>
        <CardDescription className="text-center text-sm">
          {isLogin
            ? 'Enter your email below to login to your account'
            : 'Enter your details below to create an account'}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {isLogin ? <LoginForm /> : <SignupForm />}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Button type="button" variant={'outline'} onClick={() => handleLogin('google')}>
            Google
          </Button>
          <Button type="button" variant={'outline'} onClick={() => handleLogin('github')}>
            GitHub
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function AuthModalForm() {
  const { setAuthModel, isLoginMode } = useUtilityStore();
  const handleLogin = async (type: 'github' | 'google') => {
    await signIn(type, { redirectTo: '/' });
    setAuthModel(false);
  };

  return (
    <div className="w-full sm:min-w-[320px] space-y-2 md:space-y-4">
      {isLoginMode ? <LoginForm /> : <SignupForm />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <Button
          type="button"
          variant={'outline'}
          onClick={() => handleLogin('google')}
          className="w-full"
        >
          Google
        </Button>
        <Button
          type="button"
          variant={'outline'}
          onClick={() => handleLogin('github')}
          className="w-full"
        >
          GitHub
        </Button>
      </div>
    </div>
  );
}

function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const { openAuthModal, setAuthModel, setIsLoginMode } = useUtilityStore();
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

    if (openAuthModal) {
      setAuthModel(false);
      return;
    }

    router.push('/');
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-3 sm:gap-y-4 px-1 sm:px-2"
      >
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
                  {/* <Button
                    variant={'link'}
                    type="button"
                    className="text-blue-400 cursor-pointer self-end"
                    onClick={() => router.push('/reset-pass')}
                  >
                    Reset Password
                  </Button> */}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <p className="text-center text-sm">
          Dont have an account?{' '}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => (openAuthModal ? setIsLoginMode(false) : router.push('/signup'))}
          >
            Create an account
          </span>
        </p>
      </form>
    </Form>
  );
}

function SignupForm() {
  const [showPass, setShowPass] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showConfPass, setConfShowPass] = useState(false);
  const { openAuthModal, setAuthModel, setIsLoginMode } = useUtilityStore();
  const router = useRouter();

  const form = hookForm.useForm<z.infer<typeof signupValidation>>({
    resolver: zodResolver(signupValidation),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      role: 'User',
    },
  });

  async function onSubmit(values: z.infer<typeof signupValidation>) {
    const signupTimeout = toast.loading('Creating Your Account, please wait!');
    const { success, message } = await signupAction(values);
    toast.dismiss(signupTimeout);

    if (!success) {
      toast.error(message);
      setIsSuccess(false);
      return;
    }

    toast.success(message);
    setIsSuccess(true);

    if (openAuthModal) {
      setAuthModel(false);
      return;
    }
  }

  return (
    <>
      {isSuccess && (
        <div className="bg-green-700 px-5 py-2 rounded-md border flex gap-2 items-center">
          <CheckCircle color="white" size={18} />
          <p className="text-white">Check your email and verify it.</p>
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-3 sm:gap-y-4 px-1 sm:px-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
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
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative flex flex-col">
                    <Input
                      type={showConfPass ? 'text' : 'password'}
                      placeholder="......."
                      {...field}
                    />
                    <Button
                      variant={'ghost'}
                      size={'icon'}
                      type="button"
                      onClick={() => setConfShowPass((prev) => !prev)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm"
                    >
                      {showConfPass ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
          <p className="text-center text-sm">
            Already have an account?{' '}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => (openAuthModal ? setIsLoginMode(true) : router.push('/login'))}
            >
              Login
            </span>
          </p>
        </form>
      </Form>
    </>
  );
}
