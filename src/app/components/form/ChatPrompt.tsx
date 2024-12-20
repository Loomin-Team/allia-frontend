import React, { useState, FormEvent } from "react";
import CircleButton from "@/app/components/ui/CircleButton";
import Image from "next/image";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGenerateContent } from "@/app/chat/hooks/useGenerateContent.hook";
import { MessageModel } from "@/app/shared/models/MessageModel";
import { useAuthStore } from "@/app/shared/stores/useAuthStore";

type ChatPromptProps = {
  chatId: string;
  isChatDetail: boolean;
  onTyping: (isTyping: boolean) => void;
  onNewMessage?: (message: MessageModel) => void;
};

const ChatPrompt = ({ chatId, isChatDetail, onNewMessage, onTyping }: ChatPromptProps) => {
  const [userMessage, setUserMessage] = useState("");
  const [selectedTone, setSelectedTone] = useState<string>("Professional");
  const [selectedContentType, setSelectedContentType] = useState<string>("Text");
  const user = useAuthStore((state) => state.user);
  const userId = Number(user?.id);
  const { promptRef, onSubmit, isGenerating } = useGenerateContent(userId, isChatDetail, chatId);

  const tones = [
    { label: "Professional", value: "Professional" },
    { label: "Casual", value: "Casual" },
    { label: "Formal", value: "Formal" },
    { label: "Friendly", value: "Friendly" },
    { label: "Persuasive", value: "Persuasive" },
  ];

  const contentTypes = [
    { label: "Text", value: "Text", icon: "/icons/Text.svg" },
    { label: "X Thread", value: "X Thread", icon: "/icons/Social.svg" },
    { label: "Video", value: "Video", icon: "/icons/Video.svg" },
    { label: "Meme", value: "Meme", icon: "/icons/Ghost.svg" },
  ];


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
   
    if (!userMessage.trim()) return;


    const userMessageObject: MessageModel = {
      text: userMessage,
      sender: "user",
      name: user?.fullname || "Guest",
      answer_type: selectedContentType as "Text" | "Post" | "Meme" | "Video",
    };
    onNewMessage(userMessageObject);

    setUserMessage("");
    onTyping(true);

    const result = await onSubmit(e, selectedTone, selectedContentType);

    console.log("result", result);
    onTyping(false);
    console.log("answer", result.response.reply.answer);
    console.log("answer_type", result.response.reply.answer_type);

    if (result.response) {
      const botReplyMessage: MessageModel = {
        text: result.response.reply.answer,
        sender: "bot",
        name: "AlliA",
        answer_type: result.response.reply.answer_type,
      };
      onNewMessage(botReplyMessage);
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-md">
      <ToastContainer />
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Tone Selector */}
        <div className="flex space-x-4">
          <span className="">
            <p className="text-foreground-secondary mb-2">Tone</p>
            <select
              className="bg-secondary py-2 px-4 border border-input-border rounded-full h-12"
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
            >
              {tones.map((tone) => (
                <option key={tone.value} value={tone.value}>
                  {tone.label}
                </option>
              ))}
            </select>
          </span>
          {/* Content Type Selector */}
          <span className="w-full">
            <p className="text-foreground-secondary mb-2">Content Type</p>
            <div className="flex items-center w-full space-x-4">
              {contentTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  className={`flex items-center justify-center w-full h-12 rounded-xl ${
                    selectedContentType === type.value ? "bg-primary" : "bg-secondary"
                  }`}
                  onClick={() => setSelectedContentType(type.value)}
                >
                  <Image src={type.icon} alt={type.label} width={24} height={24} />
                </button>
              ))}
            </div>
          </span>
        </div>

        {/* Prompt Input */}
        <div className="flex gap-3 md:gap-6 items-start">
          <span className="w-full">
            <textarea
              ref={promptRef}
              id="prompt"
              className="w-full bg-secondary py-2 px-6 border border-input-border rounded-lg min-h-[48px] h-[48px]"
              placeholder="Enter your prompt here..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
          </span>

          <div>
            <CircleButton
              type="submit"
              disabled={isGenerating}
              image={<Image src="/icons/Send.svg" width={20} height={20} alt="Send icon" />}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatPrompt;