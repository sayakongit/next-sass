'use client';

import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

import backgroundImage from '../../../public/assets/images/background.jpg';

const OTPSchema = z.object({
  pin: z.string().min(4, {
    message: 'Your one-time password must be 4 characters.',
  }),
});

function Verify() {
  const form = useForm<z.infer<typeof OTPSchema>>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      pin: '',
    },
  });

  function onSubmit(data: z.infer<typeof OTPSchema>) {
    console.log(data.pin);
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
          <h1 className="mb-8 text-3xl font-bold">Verify your account!</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={4} {...field}>
                        <div className="flex w-full items-center gap-4">
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={0}
                              className="h-12 w-12 text-xl"
                            />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={1}
                              className="h-12 w-12 text-xl"
                            />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={2}
                              className="h-12 w-12 text-xl"
                            />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={3}
                              className="h-12 w-12 text-xl"
                            />
                          </InputOTPGroup>
                        </div>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Verify;
