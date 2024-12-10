"use client";
import { useRef, useState, FormEvent, RefObject } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { login } from "../services/login.service";
import { useAuthStore } from "@/app/shared/stores/useAuthStore";
import { areValidHtmlInputRefs } from "@/app/shared/services/ref-validation.service";

export const useLoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLogging, setIsLogging] = useState(false);
  const updateLogin = useAuthStore((state) => state.login);

  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !areValidHtmlInputRefs([
        emailRef as RefObject<HTMLInputElement>,
        passwordRef as RefObject<HTMLInputElement>,
      ])
    ) {
      toast.error("Please enter your email and password.");
      return;
    }

    const toastId = toast.loading("Logging in...");
    setIsLogging(true);

    login(emailRef.current!.value, passwordRef.current!.value)
      .then((res) => {
        toast.update(toastId, {
          type: res.status === "success" ? "success" : "error",
          render: res.message,
          isLoading: false,
          autoClose: 1500,
        });
        if (res.status === "success") {
          updateLogin(res.payload.token, res.payload.user);
          router.push("/chat");
        }
      })
      .catch(() => {
        toast.error("An unexpected error occurred. Please try again.");
      })
      .finally(() => {
        setIsLogging(false);
      });
  };

  return {
    emailRef,
    passwordRef,
    isLogging,
    onSubmit,
  };
};
