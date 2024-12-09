"use client";

import { useRef, useState, FormEvent, RefObject } from "react";
import { toast } from "react-toastify";
import { areValidHtmlInputRefs } from "@/app/shared/services/ref-validation.service";
import { createDemoChat } from "../services/generate-content.service";

export const useDemoChat = () => {
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const onSubmitDemoChat = async (
    e: FormEvent<HTMLFormElement>,
    toneOption: string | null,
    contentType: string | null
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

    if (!contentType) {
      toast.error("Please select a content type.");
      return { error: "No content type selected" };
    }

    const toastId = toast.loading("Creating demo chat...");
    setIsGenerating(true);

    try {
      const response = await createDemoChat(
        promptRef.current!.value,
        toneOption,
        contentType
      );

      console.log("Demo Chat API response:", response);

      if (response.status === "success") {
        toast.update(toastId, {
          type: "success",
          render: response.message,
          isLoading: false,
          autoClose: 2000,
        });

        return { chatId: response.payload.chat_id, response };
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      toast.update(toastId, {
        type: "error",
        render: error.message || "Failed to create demo chat.",
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
    onSubmitDemoChat,
  };
};
