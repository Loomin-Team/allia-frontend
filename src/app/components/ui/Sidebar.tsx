import React, { useEffect, useState } from "react";
import Button from "@/app/components/ui/Button";
import Image from "next/image";
import { useAuthStore } from "@/app/shared/stores/useAuthStore";
import { getChatsByUserId } from "@/app/chat/services/generate-content.service";
import { useRouter } from "next/navigation";

interface SidebarProps {
  sidebarVisible: boolean;
}

interface Chat {
  id: number;
  title: string;
  created_at: string;
}

interface GroupedChats {
  [key: string]: Chat[];
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarVisible }) => {
  const userId = useAuthStore((state) => Number(state.user?.id));

  const [groupedChats, setGroupedChats] = useState<GroupedChats>({});
  const router = useRouter();

  useEffect(() => {
    if (userId > 0) {
      getChatsByUserId(userId).then((chats) => {
        if (chats.status === "success") {
          const grouped = chats.chats.reduce((acc, chat) => {
           
            const date = new Date(chat.created_at).toDateString();
            if (!acc[date]) acc[date] = [];
            acc[date].push(chat);
            return acc;
          }, {});
          setGroupedChats(grouped);
        }
      });
    }
  }, [userId]);

  const handleChatClick = (chatId: number) => {
    router.push(`/chat/${chatId}`);
  };

  return (
    <div
      className={`flex flex-col z-50 w-64 gap-4 bg-tertiary rounded-lg text-white p-4 h-full fixed top-0 left-0 transition-all duration-300 ease-in-out 
            ${
              sidebarVisible ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0`}
    >
      <Button
        text="+ New Chat"
        className="w-full py-1 rounded-lg"
        style={"SECONDARY"}
        onClick={() => router.push("/chat")}
      />

      <div className="flex flex-col overflow-y-auto gap-1 flex-grow sidebar-scroll">
        {Object.keys(groupedChats).map((date) => (
          <div key={date} className="flex flex-col gap-1">
            <div className="text-sm text-foreground-muted font-semibold">
              {date}
            </div>
            <div className="flex flex-col">
              {groupedChats[date].map((chat) => (
                <div
                  key={chat.id}
                  className="flex gap-2 text-sm p-1 rounded-md hover:bg-[#737373]/20 transition-all duration-200 ease-in-out cursor-pointer"
                  onClick={() => handleChatClick(chat.id)}
                >
                  <Image
                    src="/icons/ChatDots.svg"
                    width={20}
                    height={20}
                    alt="Chat icon"
                  />
                  <div className="truncate">{chat.title}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col border border-foreground-muted bg-[#737373]/20 p-4 rounded-xl gap-4 transition-all duration-300 ease-in-out hover:shadow-lg hover:bg-[#737373]/30 backdrop-blur-lg backdrop-opacity-60 hover:backdrop-opacity-100">
        <div className="flex items-center justify-center">
          <Image src="/icons/BigLogo.svg" alt="Logo" width={80} height={80} />
        </div>
        <Button
          text="Premium"
          className="w-full py-1 rounded-lg"
          style={"PRIMARY"}
        />
      </div>
    </div>
  );
};

export default Sidebar;
