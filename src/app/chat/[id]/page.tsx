"use client";
import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatPrompt from "@/app/components/form/ChatPrompt";
import Sidebar from "@/app/components/ui/Sidebar";
import Header from "@/app/components/ui/Header";
import { useAuthStore } from "@/app/shared/stores/useAuthStore";
import { Chat } from "@/app/shared/models/Chat";
import Message from "@/app/components/ui/Message";
import withAuth from "@/app/shared/layouts/withAuth";

const ChatPage = () => {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot"; name: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (message: string) => {
    if (message.trim() === "") {
      toast.warning("Please enter a prompt before submitting!");
      return;
    }

    const newMessage: { text: string; sender: "user" | "bot"; name: string } = {
      text: message,
      sender: "user",
      name: user?.fullname || "User",
    };
    const newMessages = [...messages, newMessage];

    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: { text: string; sender: "user" | "bot"; name: string } =
        { text: "Bot response", sender: "bot", name: "Bot" };
      const updatedMessages = [...newMessages, botMessage];
      setMessages(updatedMessages);
      setIsTyping(false);
    }, 1500);
  };

  const handleChatSelect = (chat: Chat) => {
    setMessages(chat.messages);
  };

  return (
    <div className="flex flex-col  gap-4 h-screen bg-background px-6 py-4">
      <Header
        setSidebarVisible={setSidebarVisible}
        sidebarVisible={sidebarVisible}
      />
      <Sidebar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        handleChatSelect={handleChatSelect}
      />
      <ToastContainer />

      <div className="h-full gap-6 rounded-lg flex flex-col p-4 lg:ml-64">
        <div className="flex-grow p-4 h-80 sidebar-scroll w-full overflow-y-auto space-y-3">
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatPrompt onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default withAuth(ChatPage);
