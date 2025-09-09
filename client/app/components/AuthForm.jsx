"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/app/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/shadcn/ui/form";
import { Input } from "@/app/shadcn/ui/input";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const form = useForm({
    loginResolver: zodResolver(loginSchema),
    registerResolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {!isLogin && (
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
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
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
                <Input placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full cursor-pointer mt-2 text-white">
          {isLogin ? "Login" : "Register"}
        </Button>
      </form>
      <div className="flex items-center justify-center gap-2 text-text2 dark:text-text2-dark text-sm my-2.5 ">
        <span className="bg-text2 dark:bg-text2-dark  h-0.25 w-[33%]" />
        Or continue with
        <span className="bg-text2 dark:bg-text2-dark  h-0.25 w-[33%]" />
      </div>
      <div className="flex items-center justify-center gap-2 w-full ">
        <Button
          variant="outline"
          className="  cursor-pointer bg-surface text-text1 hover:bg-surface dark:bg-surface-dark dark:text-text1-dark   flex-1   hover:border-primary dark:hover:border-primary"
        >
          <FaGoogle size={20} />
          Google
        </Button>
        <Button
          variant="outline"
          className=" cursor-pointer bg-surface text-text1 hover:bg-surface dark:bg-surface-dark dark:text-text1-dark   flex-1   hover:border-primary dark:hover:border-primary"
        >
          <FaGithub size={20} />
          Github
        </Button>
      </div>
      {isLogin ? (
        <p className="text-xs text-center text-text2 dark:text-text2-dark mt-2">
          Don't have an account?{" "}
          <span
            className="text-primary  cursor-pointer hover:underline"
            onClick={() => setIsLogin(false)}
          >
            Register
          </span>
        </p>
      ) : (
        <p className="text-xs text-center text-text2 dark:text-text2-dark mt-2">
          Already have an account?{" "}
          <span
            className="text-primary  cursor-pointer hover:underline"
            onClick={() => setIsLogin(true)}
          >
            Login
          </span>
        </p>
      )}
    </Form>
  );
};

export default AuthForm;
