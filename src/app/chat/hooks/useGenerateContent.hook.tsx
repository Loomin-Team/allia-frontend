"use client";

import { useRef, useState, FormEvent, RefObject } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { areValidHtmlInputRefs } from "@/app/shared/services/ref-validation.service";
import { generateContent } from "../services/generate-content.service";

export const useGenerateContent = () => {
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

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

    const toastId = toast.loading("Generating content...");
    setIsGenerating(true);

    try {
      const response = await generateContent(
        promptRef.current!.value,
        toneOption,
        selectedCard,
        selectedCard
      );

      if (response.status === "success") {
        toast.update(toastId, {
          type: "success",
          render: response.message,
          isLoading: false,
          autoClose: 2000,
        });

        const chatId = response.payload.chat_id;
        router.push(`/chat/${chatId}`);
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      toast.update(toastId, {
        type: "error",
        render: error.message || "Failed to generate content.",
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
