import React from "react";
import Button from "@/app/components/ui/Button";

interface CardProps {
  title: string;
  icon: React.ReactNode;
  isPremium?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  icon,
  isPremium = false,
  isSelected = false,
  onClick,
}) => {
  return (
    <div
      className={`relative rounded-3xl w-full h-[214px] flex flex-col justify-center items-center cursor-pointer 
                transition-colors duration-300 ease-in-out 
                ${isSelected ? "bg-primary" : "bg-tertiary"}`}
      onClick={onClick}
    >
      <div className={"flex flex-col items-center pt-2.5"}>
        {icon}
        <p className={"text-xl font-bold mt-5 w-52 text-center"}>{title}</p>
        {isPremium && (
          <Button
            className={"absolute top-3 h-[30px] py-0 text-sm w-[173px]"}
            text={"Premium Feature"}
            style={"PREMIUM"}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
