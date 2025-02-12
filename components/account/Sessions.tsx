'use client';
import React, { useCallback } from 'react';
import SessionItem from './SessionItem';
import { useMutation, useQuery } from '@tanstack/react-query';
import { sessionDelMutationFn, sessionsQueryFn } from '@/lib/api';
import { Loader } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Sessions = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['sessions'],
    queryFn: sessionsQueryFn,
    staleTime: Infinity,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: sessionDelMutationFn,
  });

  const sessions = data?.sessions || [];

  const currentSession = sessions?.find((session) => session.isCurrent);
  const otherSessions = sessions?.filter(
    (session) => session.isCurrent !== true
  );

  const handleDelete = useCallback((id: string) => {
    mutate(id, {
      onSuccess: () => {
        refetch();
        toast({
          variant: 'success',
          description: 'Xoá phiên đăng nhập thành công',
        });
      },
      onError: (error) => {
        toast({
          variant: 'destructive',
          description: error.message,
        });
      },
    });
  }, []);

  return (
    <div className="via-root to-root rounded-xl bg-gradient-to-r p-0.5">
      <div className="rounded-[10px] p-6">
        <h3 className="text-xl tracking-[-0.16px] text-slate-12 font-bold mb-1">
          Phiên đăng nhập
        </h3>
        <p className="mb-6 max-w-xl text-sm text-[#0007149f] dark:text-gray-100 font-normal">
          Các phiên đăng nhập là các thiết bị mà bạn đang sử dụng hoặc đã từng
          sử dụng It Support Booking. Đây là những phiên đăng nhập mà tài khoản của bạn
          hiện đang được sử dụng. Bạn có thể đăng xuất khỏi từng phiên.
        </p>
        {isLoading ? (
          <Loader size="35px" className="animate-spin" />
        ) : (
          <div className="rounded-t-xl max-w-xl">
            <div>
              <h5 className="text-base font-semibold">
                Phiên đăng nhập hiện tại
              </h5>
              <p className="mb-6 text-sm text-[#0007149f] dark:text-gray-100">
                Bạn đang đăng nhập vào tài khoản It Support Booking trên thiết bị này và
                hiện đang sử dụng nó.
              </p>
            </div>
            <div className="w-full">
              {currentSession && (
                <div className="w-full py-2 border-b pb-5">
                  <SessionItem
                    userAgent={currentSession.userAgent}
                    date={currentSession.createdAt}
                    expiresAt={currentSession.expiresAt}
                    isCurrent={currentSession.isCurrent}
                  />
                </div>
              )}
              <div className="mt-4">
                <h5 className="text-base font-semibold">Các phiên khác</h5>
                <ul className="mt-4 w-full space-y-3 max-h-[400px] overflow-y-auto">
                  {otherSessions?.map((session) => (
                    <li key={session._id}>
                      <SessionItem
                        loading={isPending}
                        userAgent={session.userAgent}
                        date={session.createdAt}
                        expiresAt={session.expiresAt}
                        onRemove={() => handleDelete(session._id)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sessions;
