import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { logoutMutationFn } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

const LogoutDialog = (props: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isOpen, setIsOpen } = props;

  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: logoutMutationFn,
    onSuccess: () => {
      router.replace('/');
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        description: error.message,
      });
    },
  });

  const handleLogout = useCallback(() => {
    mutate();
  }, []);
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bạn có muốn đăng xuất không?</DialogTitle>
            <DialogDescription>
              Điều này sẽ kết thúc phiên hiện tại của bạn và bạn sẽ cần phải
              đăng nhập một lần nữa để truy cập vào tài khoản của bạn.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              disabled={isPending}
              type="button"
              className="!text-white"
              onClick={handleLogout}
            >
              {isPending && <Loader className="animate-spin" />}
              Có
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LogoutDialog;
