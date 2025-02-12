'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
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
import { Mail, Lock, Github, Loader, EyeOff, Eye } from 'lucide-react';
import Link from 'next/link';
// import { toast } from "sonner";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validations/auth.validator';
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
import { loginMutationFn } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { GoogleIcon } from '../register/page';

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: loginMutationFn,
  });

  const { toast } = useToast();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    mutate(values, {
      onSuccess: (response) => {
        if (response.data.mfaRequired) {
          router.replace(`/auth/verify-mfa?email=${values.email}`);
          return;
        }
        toast({
          variant: 'success',
          description: 'Đănh nhập thành công',
        });
        router.replace(`/`);
      },
      onError: (error) => {
        toast({
          variant: 'destructive',
          description: error.message,
        });
      },
    });
  };

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="py-20  px-4 sm:px-6 lg:px-8 flex items-center justify-center ">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Chào mừng trở lại
          </CardTitle>
          <CardDescription className="text-center">
            Đăng nhập tài khoản
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                          placeholder="Nhập email"
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
                    <FormLabel className="flex items-center justify-between">
                      <span>Mật khẩu</span>
                      <Link
                        href="/auth/forgot-password"
                        className="text-sm text-primary hover:underline"
                      >
                        Quên mật khẩu?
                      </Link>
                    </FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <FormControl>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Nhập mật khẩu"
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
                        onClick={()=>setShowPassword(!showPassword)}
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
                  <Loader className="animate-spin"> Đang đăng nhập... </Loader>
                ) : (
                  'Đăng nhập'
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
            onClick={handleGoogleLogin}
            disabled={isPending}
          >
            <GoogleIcon/>
            Tiếp tục với Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <Link
              href="/auth/register"
              className="text-primary hover:underline"
            >
              Đăng kí
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
