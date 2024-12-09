"use client";

import { useRef, useState, FormEvent, RefObject } from "react";
import { toast } from "react-toastify";
import { areValidHtmlInputRefs } from "@/app/shared/services/ref-validation.service";
import { generateContent } from "../services/generate-content.service";
import { useAuthStore } from "@/app/shared/stores/useAuthStore";

export const useGenerateContent = () => {
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const user = useAuthStore((state) => state.user);

  const onSubmit = async (
    e: FormEvent<HTMLFormElement>,
    toneOption: string | null,
    selectedCard: string | null
  ) => {
    e.preventDefault();

    if (
      !areValidHtmlInputRefs([
        promptRef as RefObject<HTMLInputElement | HTMLTextAreaElement>,
      ])
    ) {
      toast.error("Please enter a valid prompt.");
      return;
    }

    if (!toneOption) {
      toast.error("Please select a tone.");
      return;
    }

    if (!selectedCard) {
      toast.error("Please select a content type.");
      return;
    }

    const toastId = toast.loading("Generating chat response...");
    setIsGenerating(true);

    try {
      const response = await generateContent(
        user?.id || "guest",
        promptRef.current!.value,
        toneOption,
        selectedCard
      );

      if (response.status === "success") {
        toast.update(toastId, {
          type: "success",
          render: response.message,
          isLoading: false,
          autoClose: 2000,
        });
        console.log("Generated Chat Response:", response.payload);
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      toast.update(toastId, {
        type: "error",
        render: error.message || "Failed to generate chat response.",
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    promptRef,
    isGenerating,
    onSubmit,
  };
};
