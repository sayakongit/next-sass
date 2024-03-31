'use client';

import Image from 'next/image';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import backgroundImage from '../../../public/assets/images/background.jpg';

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  password: z.string().min(1, { message: 'This field has to be filled.' }),
});

function Login() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    console.log(values);
  }

  return (
    <div className="flex h-screen flex-col items-center md:flex-row">
      <Image
        src={backgroundImage}
        alt="bg-image"
        className="h-[30%] object-cover md:h-full md:w-[50%]"
      ></Image>
      <div className="mx-auto flex w-full items-center justify-center">
        <div className="p-8 md:w-[60%]">
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="py-2">
            Don&apos;t have an account?{' '}
            <Link href="/" className="font-semibold underline">
              Create a new account now.
            </Link>
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" className="mt-4" {...field} />
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
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        className="mt-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Login Now
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
