'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Github,
  Loader,
  MailCheckIcon,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/validations/auth.validator';
import type * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { registerMutationFn } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
export const GoogleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#4285F4"
      d="M23.49 12.26c3.36-.05 6.28 1.16 8.66 3.37l6.31-6.26C34.92 5.13 29.6 3 23.49 3 14.88 3 7.5 8.38 4.26 16.02l7.6 5.92c1.75-5.25 6.66-9.68 11.63-9.68z"
    />
    <path
      fill="#34A853"
      d="M46.12 24.52c0-1.56-.14-3.04-.41-4.49H23.49v8.52h12.9c-.65 3.18-2.56 5.84-5.4 7.59l7.6 5.92c4.46-4.13 7.53-10.3 7.53-17.54z"
    />
    <path
      fill="#FBBC05"
      d="M11.72 28.56a13.9 13.9 0 01-1.78-6.98c0-2.44.64-4.75 1.78-6.98l-7.6-5.92C1.61 13.01 0 17.02 0 21.52s1.61 8.51 4.12 12.34l7.6-5.92z"
    />
    <path
      fill="#EA4335"
      d="M23.49 46c6.07 0 11.19-2 14.96-5.42l-7.6-5.92c-2.15 1.44-4.87 2.29-7.36 2.29-4.97 0-9.88-3.63-11.63-8.88l-7.6 5.92C7.5 39.62 14.88 46 23.49 46z"
    />
  </svg>
);
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: registerMutationFn,
  });
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    mutate(values, {
      onSuccess: () => {
        setIsSubmitted(true);
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      },
    });
  };

  const handleGoogleRegister = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <>
      {!isSubmitted ? (
        <div className="py-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <Card className="w-full max-w-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Tạo tài khoản
              </CardTitle>
              <CardDescription className="text-center">
                Đăng nhập với tài khoản mới
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Họ</FormLabel>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <FormControl>
                              <Input
                                placeholder="Nguyễn"
                                className="pl-10"
                                disabled={isPending}
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên</FormLabel>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <FormControl>
                              <Input
                                placeholder="An"
                                className="pl-10"
                                disabled={isPending}
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="email@example.com"
                              className="pl-10"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                              type="password"
                              placeholder="••••••••"
                              className="pl-10"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
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
                              type="password"
                              placeholder="••••••••"
                              className="pl-10"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số điện thoại</FormLabel>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+84 000-000-000"
                              className="pl-10"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Địa chỉ</FormLabel>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <FormControl>
                            <Input
                              placeholder="Số nhà tên đường, phường/xã, Quận/Huyện, Tỉnh/Thành phố"
                              className="pl-10"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? (
                      <Loader className="animate-spin">
                        Đang tạo tài khoản...
                      </Loader>
                    ) : (
                      'Đăng kí'
                    )}
                  </Button>
                </form>
              </Form>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-gray-500">
                    Hoặc tiếp tục với
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleRegister}
                disabled={isPending}
              >
                <GoogleIcon/>
                Tiếp tục với Google
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-600">
                Đã có tài khoản?{' '}
                <Link
                  href="/auth/login"
                  className="text-primary hover:underline"
                >
                  Đăng nhập
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
          <div className="size-[48px]">
            <MailCheckIcon size="48px" className="animate-bounce" />
          </div>
          <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
            Kiểm tra email của bạn
          </h2>
          <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
            Chúng tôi đã gửi link xác nhận email tới {form.getValues().email}.
          </p>
          <Link href="/auth/login">
            <Button className="h-[40px]">
              Tiếp tục đăng nhập
              <ArrowRight />
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
