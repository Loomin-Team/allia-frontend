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

const ChatPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);

  const unwrappedParams = use(params);

  useEffect(() => {
    if (unwrappedParams.id) {
      setChatId(unwrappedParams.id);
    }
  }, [unwrappedParams]);

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
          <ChatMessages chatId={chatId} />
        </div>
        <ChatPrompt />
      </div>
    </div>
  );
};

export default withAuth(ChatPage);
