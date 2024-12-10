"use client";

import { useRef, useState, FormEvent, RefObject } from "react";
import { toast } from "react-toastify";
import { areValidHtmlInputRefs } from "@/app/shared/services/ref-validation.service";
import { generateContent } from "../services/generate-content.service";
import { postReply } from "../services/generate-content.service";

export const useGenerateContent = (userId: number, isChatDetail: boolean, chatId: string) => {
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const onSubmit = async (
    e: FormEvent<HTMLFormElement>,
    toneOption: string | null,
    selectedCard: string | null,
    onSuccess?: (chatId: string) => void
  ): Promise<{ chatId?: string; error?: string; response?: any }> => {
    e.preventDefault();

    if (
      !areValidHtmlInputRefs([
        promptRef as RefObject<HTMLInputElement | HTMLTextAreaElement>,
      ])
    ) {
      toast.error("Please enter a valid prompt.");
      return { error: "Invalid prompt" };
    }

    if (!toneOption) {
      toast.error("Please select a tone.");
      return { error: "No tone selected" };
    }

    if (!selectedCard) {
      toast.error("Please select a content type.");
      return { error: "No content type selected" };
    }

    const toastId = toast.loading("Generating content...");
    setIsGenerating(true);

    try {
      let response;
      if (isChatDetail) {
        response = await postReply(
          userId,
          promptRef.current!.value,
          toneOption,
          selectedCard,
          chatId
        );
      } else {
        response = await generateContent(
          userId,
          promptRef.current!.value,
          toneOption,
          selectedCard
        );
      }

      console.log("API response:", response);

      if (response.status === "success") {
        toast.update(toastId, {
          type: "success",
          render: response.message,
          isLoading: false,
          autoClose: 2000,
        });

        if (!isChatDetail) {

          if (onSuccess && response.payload.chat_id) {
            onSuccess(response.payload.chat_id);
          }

          return { chatId: response.payload.chat_id, response };
        }

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
      return { error: error.message };
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