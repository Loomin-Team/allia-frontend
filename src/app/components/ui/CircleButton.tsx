import React from "react";

interface CircleButtonProps {
  image: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const CircleButton: React.FC<CircleButtonProps> = ({
  image,
  className,
  onClick,
  type,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`flex bg-primary w-12 h-12 items-center justify-center rounded-full ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {image}
    </button>
  );
};

export default CircleButton;
