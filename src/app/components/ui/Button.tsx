import React from "react";
import { twJoin } from "tailwind-merge";

const ButtonStyles = {
  PRIMARY:
    "bg-primary border-2 hover:bg-transparent hover:text-primary border border-primary",
  SECONDARY:
    "bg-transparent border-2 border-foreground-muted hover:bg-primary hover:text-foreground hover:border-primary",
  TERTIARY:
    "bg-accent text-background border-2 hover:bg-transparent hover:text-accent border-accent",
  PREMIUM:
    "bg-primary-muted text-primary border-2 border-primary hover:bg-primary hover:text-foreground hover:border-primary",
};

interface ButtonProps {
  text: string;
  style: keyof typeof ButtonStyles;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  text,
  style,
  onClick,
  disabled,
  className,
  type = "button",
}) => {
  return (
    <button
      className={twJoin(
        "rounded-xl transition duration-300 p-2.5",
        ButtonStyles[style],
        className,
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
