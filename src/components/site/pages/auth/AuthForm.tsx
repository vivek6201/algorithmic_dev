"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginValidation, signupValidation } from "@/validations/auth";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import signupAction from "@/actions/auth/signup";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

interface Proptype extends React.ComponentPropsWithoutRef<"div"> {
  isLogin: boolean;
}

export function AuthForm({ isLogin }: Proptype) {
  return (
    <Card className="w-11/12 max-w-[450px]">
      <CardHeader>
        <CardTitle className="text-2xl">
          {isLogin ? "Login" : "Signup"}
        </CardTitle>
        <CardDescription>
          {isLogin
            ? "Enter your email below to login to your account"
            : "Enter your details below to create an account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLogin ? <LoginForm /> : <SignupForm />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <Button type="button" variant={"outline"}>
            Login with Google
          </Button>
          <Button type="button" variant={"outline"}>
            Login with Github
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginValidation>>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginValidation>) {
    const timeout = toast.loading("Signing in, please wait!");
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    toast.dismiss(timeout);

    if (response?.error) {
      toast.error("Signin failed!");
      return;
    }

    toast.success("Signin successful!");
    router.push("/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-y-5 flex-col"
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
                  <Input
                    type={showPass ? "text" : "password"}
                    placeholder="......."
                    {...field}
                  />
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    type="button"
                    onClick={() => setShowPass((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm"
                  >
                    {showPass ? "Hide" : "Show"}
                  </Button>
                  <Button
                    variant={"link"}
                    type="button"
                    className="text-blue-400 cursor-pointer self-end"
                    onClick={() => router.push("/reset-pass")}
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
        <p className="text-center text-sm">
          Dont have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => router.push("/signup")}
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
  const [showConfPass, setConfShowPass] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signupValidation>>({
    resolver: zodResolver(signupValidation),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      role: "User",
    },
  });

  async function onSubmit(values: z.infer<typeof signupValidation>) {
    const signupTimeout = toast.loading("Creating Your Account, please wait!");
    const { success, message } = await signupAction(values);
    toast.dismiss(signupTimeout);

    if (!success) {
      toast.error(message);
      return;
    }

    toast.success(message);
    const timeout = toast.loading("Signing in, please wait");

    //signing in
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    toast.dismiss(timeout);

    if (response?.ok) {
      router.push("/");
      toast.success("login successful");
    } else {
      toast.error("Error while Signing in!");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-y-5 flex-col"
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
                  <Input
                    type={showPass ? "text" : "password"}
                    placeholder="......."
                    {...field}
                  />
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    type="button"
                    onClick={() => setShowPass((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm"
                  >
                    {showPass ? "Hide" : "Show"}
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
                    type={showConfPass ? "text" : "password"}
                    placeholder="......."
                    {...field}
                  />
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    type="button"
                    onClick={() => setConfShowPass((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm"
                  >
                    {showConfPass ? "Hide" : "Show"}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </Form>
  );
}
