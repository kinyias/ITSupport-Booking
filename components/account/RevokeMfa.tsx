"use client";
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { revokeMFAMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";

const RevokeMfa = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: revokeMFAMutationFn,
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });
      toast({
        variant: "success",
        description: response.data.message,
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        description: error.message,
      });
    },
  });

  const handleClick = useCallback(() => {
    mutate();
  }, []);

  return (
    <Button
      disabled={isPending}
      className="h-[35px] !text-[#c40006d3] !bg-red-100 shadow-none mr-1"
      onClick={handleClick}
    >
      {isPending && <Loader className="animate-spin" />}
      Thu hồi
    </Button>
  );
};

export default RevokeMfa;