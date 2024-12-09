"use client";
import React, { useState } from "react";
import Card from "@/app/components/content/Card";
import Image from "next/image";
import SelectInput from "@/app/components/ui/SelectInput";
import CircleButton from "../ui/CircleButton";
import { useGenerateContent } from "@/app/chat/hooks/useGenerateContent.hook";

const Generator: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [selectedTone, setSelectedTone] = useState<string | null>(
    "professional"
  );

  const { promptRef, isGenerating, onSubmit } = useGenerateContent();

  const cards = [
    { title: "Text Content", icon: "/icons/Text.svg" },
    { title: "X Thread", icon: "/icons/X.svg" },
    { title: "Short Video", icon: "/icons/Video.svg" },
    { title: "Meme", icon: "/icons/Ghost.svg" },
  ];

  const toneOptions = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "formal", label: "Formal" },
    { value: "friendly", label: "Friendly" },
    { value: "informative", label: "Informative" },
    { value: "persuasive", label: "Persuasive" },
  ];

  return (
    <form
      onSubmit={(e) => onSubmit(e, selectedTone, selectedCard)}
      className="mx-auto space-y-10 px-4"
    >
      {/* Cards Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            icon={
              <Image src={card.icon} alt={card.title} width={45} height={45} />
            }
            isSelected={selectedCard === card.title}
            onClick={() => setSelectedCard(card.title)}
          />
        ))}
      </div>

      {/* Inputs Section */}
      <div className="flex flex-col md:flex-row gap-6 items-baseline">
        <span className="w-full">
          <label className="text-foreground-secondary" htmlFor="prompt">
            Prompt
          </label>
          <textarea
            ref={promptRef}
            id="prompt"
            className="w-full bg-secondary py-2 px-6 border border-input-border rounded-lg h-[42px]"
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
    </form>
  );
};

export default Generator;
