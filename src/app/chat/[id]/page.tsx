"use client";
import React, { use, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatPrompt from "@/app/components/form/ChatPrompt";
import Sidebar from "@/app/components/ui/Sidebar";
import Header from "@/app/components/ui/Header";
import withAuth from "@/app/shared/layouts/withAuth";
import FullPageLoader from "@/app/components/ui/FullPageLoader";
import ChatMessages from "../components/ChatMessage";
import { MessageModel } from "@/app/shared/models/MessageModel";
import { getMessagesByChatId } from "../services/generate-content.service";

const ChatPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [isChatDetail, setisChatDetail] = useState(true);
  const [messages, setMessages] = useState<Array<MessageModel>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const unwrappedParams = use(params);

  useEffect(() => {
    if (unwrappedParams.id) {
      setChatId(unwrappedParams.id);
      setisChatDetail(true);
    }
  }, [unwrappedParams]);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const response = await getMessagesByChatId(chatId);
      console.log("response desde chat",response);

      if (response.status === "success") {
        setMessages(response.messages);
      } else {
        setError(response.message);
      }

      setLoading(false);
    };

    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  const handleNewMessage = (message: MessageModel) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  if (loading) {
    return (
      <div>
        <FullPageLoader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (chatId === null) {
    return (
      <div>
        <FullPageLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-screen bg-background px-6 py-4">
      <Header
        setSidebarVisible={setSidebarVisible}
        sidebarVisible={sidebarVisible}
      />
      <Sidebar sidebarVisible={sidebarVisible} />
      <ToastContainer />

      <div className="h-full gap-6 rounded-lg flex flex-col p-4 lg:ml-64">
        <div className="flex-grow p-4 h-80 sidebar-scroll w-full overflow-y-auto space-y-3">
          <ChatMessages chatId={chatId}  messages={messages} isTyping={isTyping} loading={false} error={error} />
        </div>
        <ChatPrompt chatId={chatId} isChatDetail={isChatDetail} onNewMessage={handleNewMessage} onTyping={setIsTyping} />
      </div>
    </div>
  );
};

export default withAuth(ChatPage);