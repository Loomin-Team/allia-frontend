"use client";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatPrompt from "@/app/components/form/ChatPrompt";
import Sidebar from "@/app/components/ui/Sidebar";
import Header from "@/app/components/ui/Header";
import withAuth from "@/app/shared/layouts/withAuth";
import ChatMessages from "../components/ChatMessage";

const ChatPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [chatId, setChatId] = useState<number | null>(null);

  React.useEffect(() => {
    (async () => {
      const unwrappedParams = await params;
      setChatId(parseInt(unwrappedParams.id, 10));
    })();
  }, [params]);

  if (chatId === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 h-screen bg-background px-6 py-4">
      <Header
        setSidebarVisible={setSidebarVisible}
        sidebarVisible={sidebarVisible}
      />
      <Sidebar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        handleChatSelect={() => {}}
      />
      <ToastContainer />

      <div className="h-full gap-6 rounded-lg flex flex-col p-4 lg:ml-64">
        <div className="flex-grow p-4 h-80 sidebar-scroll w-full overflow-y-auto space-y-3">
          <ChatMessages chatId={chatId} />
        </div>
        <ChatPrompt />
      </div>
    </div>
  );
};

export default withAuth(ChatPage);
