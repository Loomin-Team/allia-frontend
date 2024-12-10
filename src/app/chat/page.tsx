"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/app/components/ui/Sidebar";
import Header from "@/app/components/ui/Header";
import Generator from "../components/content/Generator";
import { useAuthStore } from "@/app/shared/stores/useAuthStore";
import withAuth from "../shared/layouts/withAuth";
import { useGenerateContent } from "./hooks/useGenerateContent.hook";

const ChatPage = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const userId = Number(user?.id);
  const { promptRef, onSubmit, isGenerating } = useGenerateContent(userId, false, ""); 
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  const handleSuccess = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  return (
    <div className="mx-auto max-w-[1320px] scroll-smooth flex flex-col gap-4 h-screen bg-background px-6 py-4 ">
      <Header
        setSidebarVisible={setSidebarVisible}
        sidebarVisible={sidebarVisible}
      />
      <Sidebar sidebarVisible={sidebarVisible} />
      <div className="flex h-full">
        <div className="flex-grow rounded-lg flex flex-col p-4 md:ml-64">
          <h1>Hi there, {user?.fullname ? user.fullname : "Guest"}!</h1>
          <p className="text-foreground-secondary text-xl text-center">
            Let’s transform today’s top stories into engaging content.
          </p>
          <div className="mt-6">
            <Generator
              onSubmit={(e, toneOption, selectedCard) =>
                onSubmit(e, toneOption, selectedCard, handleSuccess)
              }
              promptRef={promptRef}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(ChatPage);
