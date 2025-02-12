'use client';
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { ArrowRight, Loader } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { verifyMFALoginMutationFn } from '@/lib/api';
import { toast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const VerifyMfa = () => {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get('email');

  const { mutate, isPending } = useMutation({
    mutationFn: verifyMFALoginMutationFn,
  });

  const FormSchema = z.object({
    pin: z.string().min(6, {
      message: 'Mật khẩu một lần của bạn phải có 6 ký tự.',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    if (!email) {
      router.replace('/');
      return;
    }
    const data = {
      code: values.pin,
      email: email,
    };
    mutate(data, {
      onSuccess: (response) => {
        router.replace('/');
        toast({
          variant: 'success',
          description: response?.data?.message,
        });
      },
      onError: (error) => {
        toast({
          variant: 'destructive',
          description: error.message,
        });
      },
    });
  };

  return (
      <div className="py-20 my-20 flex items-center justify-center ">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Xác thực đa yếu tố
            </CardTitle>
            <CardDescription className="text-center">
              Nhập mã từ ứng dụng xác thực của bạn.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full mt-6 flex flex-col gap-4 "
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm mb-1 font-normal">
                        Mã một lần
                      </FormLabel>
                      <FormControl>
                        <InputOTP
                          className="!text-lg flex items-center"
                          maxLength={6}
                          pattern={REGEXP_ONLY_DIGITS}
                          {...field}
                          style={{ justifyContent: 'center' }}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={0}
                              className="!w-14 !h-12 !text-lg"
                            />
                            <InputOTPSlot
                              index={1}
                              className="!w-14 !h-12 !text-lg"
                            />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={2}
                              className="!w-14 !h-12 !text-lg"
                            />
                            <InputOTPSlot
                              index={3}
                              className="!w-14 !h-12 !text-lg"
                            />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={4}
                              className="!w-14 !h-12 !text-lg"
                            />
                            <InputOTPSlot
                              index={5}
                              className="!w-14 !h-12 !text-lg"
                            />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isPending} className="w-full h-[40px] mt-2">
                  {isPending && <Loader className="animate-spin" />}
                  Tiếp tục
                  <ArrowRight />
                </Button>
              </form>
            </Form>
            <Button
              variant="ghost"
              className="w-full text-[15px] mt-2 h-[40px]"
            >
              Trở về trang đăng nhập
            </Button>
          </CardContent>
        </Card>
      </div>
  );
};

export default VerifyMfa;
