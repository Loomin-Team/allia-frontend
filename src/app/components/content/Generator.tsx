import React, { useState, useEffect } from "react";
import Card from "@/app/components/content/Card";
import Image from "next/image";
import SelectInput from "@/app/components/ui/SelectInput";
import CircleButton from "../ui/CircleButton";

type GeneratorProps = {
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    toneOption: string | null,
    contentType: string | null
  ) => Promise<{ chatId?: string; error?: string; response?: any }>;
  promptRef: React.RefObject<HTMLTextAreaElement | null>;
  isGenerating: boolean;
  onGeneratedMessage?: (message: {
    text: string;
    sender: "user" | "bot";
    name: string;
  }) => void;
};

const Generator: React.FC<GeneratorProps> = ({
  onSubmit,
  promptRef,
  isGenerating,
  onGeneratedMessage,
}) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [selectedTone, setSelectedTone] = useState<string | null>(
    "Professional"
  );
  const [botTyping, setBotTyping] = useState(false);
  const [typingDots, setTypingDots] = useState("");

  useEffect(() => {
    if (botTyping) {
      const interval = setInterval(() => {
        setTypingDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [botTyping]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setBotTyping(true);
    const result = await onSubmit(e, selectedTone, selectedCard);

    setBotTyping(false);
    if (result.chatId && result.response) {
      if (onGeneratedMessage) {
        onGeneratedMessage({
          text: result.response.payload.answer,
          sender: "bot",
          name: "AlliA",
        });
      }
    } else if (result.error) {
      console.error(result.error);
    }
  };

  const cards = [
    { title: "Text Content", value: "Text", icon: "/icons/Text.svg" },
    { title: "Social Media Post", value: "Post", icon: "/icons/Social.svg" },
    { title: "Short Video", value: "Video", icon: "/icons/Video.svg" },
    { title: "Meme", value: "Meme", icon: "/icons/Ghost.svg" },
  ];

  const toneOptions = [
    { value: "Professional", label: "Professional" },
    { value: "Casual", label: "Casual" },
    { value: "Formal", label: "Formal" },
    { value: "Friendly", label: "Friendly" },
    { value: "Informative", label: "Informative" },
    { value: "Persuasive", label: "Persuasive" },
  ];

  return (
    <form onSubmit={handleSubmit} className="mx-auto space-y-10 px-4">
      {/* Cards Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            icon={
              <Image src={card.icon} alt={card.title} width={45} height={45} />
            }
            isSelected={selectedCard === card.value}
            onClick={() => setSelectedCard(card.value)}
          />
        ))}
      </div>

      {/* Inputs Section */}
      <div className="flex flex-col md:flex-row gap-6 items-baseline max-w-generator mx-auto">
        <span className="w-full">
          <label className="text-foreground-secondary" htmlFor="prompt">
            Prompt
          </label>
          <textarea
            ref={promptRef}
            id="prompt"
            className="w-full bg-secondary py-2 px-6 border border-input-border rounded-lg min-h-[48px] h-[42px]"
            placeholder="Enter your prompt here..."
          />
        </span>
        <span className="flex gap-6 w-full md:max-w-[250px] items-end">
          <SelectInput
            label="Tone"
            options={toneOptions}
            placeholder="Select a tone"
            onChange={(option) => setSelectedTone(option.value)}
          />
          <div>
            <CircleButton
              type="submit"
              disabled={isGenerating}
              image={
                <Image
                  src="/icons/Send.svg"
                  width={20}
                  height={20}
                  alt="Send icon"
                />
              }
            />
          </div>
        </span>
      </div>

      {/* Bot Typing Section */}
      {botTyping && (
        <div className="flex items-center justify-center mt-4">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/Logo.svg"
              alt="Bot Logo"
              width={30}
              height={30}
            />
            <p className="text-foreground-secondary">
              AlliA is typing{typingDots}
            </p>
          </div>
        </div>
      )}
    </form>
  );
};

export default Generator;
