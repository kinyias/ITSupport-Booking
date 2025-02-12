'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { verifyEmailMutationFn } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ConfirmAccount() {
  const router = useRouter();

  const params = useSearchParams();
  const code = params.get('code');

  const { mutate, isPending } = useMutation({
    mutationFn: verifyEmailMutationFn,
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!code) {
      toast({
        variant: 'destructive',
        description: 'Mã xác minh tài khoản không hợp lệ',
      });
      return;
    }
    mutate(
      { code },
      {
        onSuccess: () => {
          toast({
            variant: 'success',
            description: 'Xác minh tài khoản thành công',
          });
          router.replace('/');
        },
        onError: (error) => {
          toast({
            variant: 'destructive',
            description: error.message || 'Có lỗi xảy ra',
          });
        },
      }
    );
  };

  return (
    <div className="py-20 flex items-center justify-center ">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Xác minh tài khoản
          </CardTitle>
          <CardDescription className="text-center">
            Để xác minh tài khoản, vui lòng nhấn nút bên dưới
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Button
              disabled={isPending}
              type="submit"
              className="w-full text-[15px] h-[40px] text-white font-semibold"
            >
              {isPending && <Loader className="animate-spin" />}
              Xác minh tài khoản
            </Button>
          </form>
          <p className="mt-6 text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
            Nếu bạn có bất cứ vấn đề gì về tài khoản của bạn, vui lòng liên hệ{' '}
            <a
              className="outline-none transition duration-150 ease-in-out 
            focus-visible:ring-2 text-primary hover:underline focus-visible:ring-primary"
              href="#"
            >
              support@itbooking.com
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
