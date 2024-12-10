import React, { useEffect, useRef, useState } from "react";

import Message from "./Message";
import { getMessagesByChatId } from "../services/generate-content.service";

type ChatMessagesProps = {
  chatId: string;
};

const ChatMessages = ({ chatId }: ChatMessagesProps) => {
  const [messages, setMessages] = useState<
    Array<{ text: string; sender: "user" | "bot"; name: string }>
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const response = await getMessagesByChatId(chatId);
     

      if (response.status === "success") {
        setMessages(response.messages);
      } else {
        setError(response.message);
      }

      setLoading(false);
    };

    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (loading) {
    return <div>Loading messages...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}

      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatMessages;
