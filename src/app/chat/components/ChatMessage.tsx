import React, { useEffect,useState, useRef } from "react";
import Image from "next/image";
import Message from "./Message";
import { MessageModel } from "@/app/shared/models/MessageModel";

type ChatMessagesProps = {

  messages:  Array<MessageModel>;

  isTyping: boolean;
  error: string | null;
  loading: boolean;
};

const ChatMessages = ({ messages, isTyping, error, loading }: ChatMessagesProps) => {
  
  const [typingDots, setTypingDots] = useState("");


  useEffect(() => {
    if (isTyping) {
      const interval = setInterval(() => {
        setTypingDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isTyping]);


  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (loading) {
    return <div>Loading messages...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      {messages.map((message, index) => (
        <Message key={index} message={message} isLastMessage={index === messages.length - 1} />
      ))}
      {isTyping && (
        <div className="flex items-center justify-center mt-4">
          <div className="flex items-center gap-2">
            <Image src="/icons/Logo.svg" alt="Bot Logo" width={30} height={30} />
            <p className="text-foreground-secondary">AlliA is typing{typingDots}</p>
          </div>
        </div>
      )}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatMessages;