import React, { useState, useEffect } from "react";
import Image from "next/image";

type MessageProps = {
  message: { text: string; sender: "user" | "bot"; name: string };
};

const Message = ({ message }: MessageProps) => {
  const [displayedText, setDisplayedText] = useState(
    message.sender === "bot" ? "" : message.text
  );

  useEffect(() => {
    if (message.sender === "bot") {
      let index = 0;
      const interval = setInterval(() => {
        if (index < message.text.length) {
          setDisplayedText((prev) => prev + message.text[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 7);
      return () => clearInterval(interval);
    }
  }, [message.text, message.sender]);

  return (
    <div
      className={`flex w-full ${
        message.sender === "user" ? "justify-start" : "justify-end"
      }`}
    >
      {message.sender === "user" ? (
        <div className="flex w-full flex-col">
          <div className="flex mb-2 items-center">
            <div className="w-8 h-8 bg-accent text-white flex items-center justify-center rounded-full">
              {message.name.charAt(0).toUpperCase()}
            </div>
            <span className="ml-2 text-foreground-secondary">
              {message.name}
            </span>
          </div>
          <div className="px-4 flex justify-between w-full py-2 text-white">
            <div className="w-11/12 break-words">{displayedText}</div>
            <div className="flex items-end">
              <Image
                src="/icons/Pencil.svg"
                alt="Pencil"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between rounded-2xl w-full p-6 bg-secondary">
          <div className="flex h-full items-start">
            <Image src="/icons/Logo.svg" alt="Logo" width={20} height={20} />
          </div>
          <div className="ml-4 text-white flex-1 break-words">
            {displayedText}
          </div>
          <div className="flex gap-2 items-end justify-end">
            <Image
              src="/icons/Like.svg"
              alt="ThumbsUp"
              width={20}
              height={20}
            />
            <Image
              src="/icons/Dislike.svg"
              alt="ThumbsDown"
              width={20}
              height={20}
            />
            <Image src="/icons/Update.svg" alt="Sync" width={20} height={20} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
