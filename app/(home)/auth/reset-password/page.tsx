'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Frown,
  Loader,
  Lock,
  Mail,
  MailCheckIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/lib/validations/auth.validator';
import type * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { forgotPasswordMutationFn, resetPasswordMutationFn } from '@/lib/api';
import { useRouter, useSearchParams } from 'next/navigation';

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const params = useSearchParams();
  const code = params.get('code');
  const exp = Number(params.get('exp'));
  const now = Date.now();
  const isValid = code && exp && exp > now;
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: resetPasswordMutationFn,
  });
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    if (!code) {
      router.replace('/auth/forgot-password?email=');
      return;
    }
    const data = {
      password: values.password,
      verificationCode: code,
    };
    mutate(data, {
      onSuccess: () => {
        toast({
          variant: 'success',
          description: 'Password reset successfully',
        });
        router.replace('/');
      },
      onError: (error) => {
        console.log(error);
        toast({
          variant: 'destructive',
          description: error.message,
        });
      },
    });
  };

  return (
    <>
      {isValid ? (
        <div className="py-20 flex items-center justify-center ">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Đặt lại mật khẩu mới
              </CardTitle>
              <CardDescription className="text-center">
                Mật khẩu của bạn phải khác mật khẩu cũ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mật khẩu</FormLabel>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <FormControl>
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="••••••••"
                              className="pl-10"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isPending}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                            <span className="sr-only">
                              {showPassword ? 'Hide password' : 'Show password'}
                            </span>
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Xác nhận nhận mật khẩu</FormLabel>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <FormControl>
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="••••••••"
                              className="pl-10"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isPending}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                            <span className="sr-only">
                              {showPassword ? 'Hide password' : 'Show password'}
                            </span>
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? (
                      <Loader className="animate-spin"> Đang gửi... </Loader>
                    ) : (
                      'Cập nhật mật khẩu'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
          <div className="size-[48px]">
            <Frown size="48px" className="animate-bounce text-red-500" />
          </div>
          <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
            Link đã hết hạn hoặc không hợp lệ
          </h2>
          <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
            Bạn có thể gửi yêu cầu mới
          </p>
          <Link href="forgot-password?email=">
            <Button className="h-[40px]">
              <ArrowLeft />
              Quên mật khẩu
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
