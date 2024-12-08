"use client";
import React, { forwardRef } from "react";
import "react-toastify/dist/ReactToastify.css";

interface InputProps {
  type?: "text" | "number" | "password" | "email";
  id?: string;
  name?: string;
  placeholder: string;
  autocomplete?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", id, name, placeholder, autocomplete }, ref) => {
    return (
      <div>
        <p className="text-foreground-secondary mb-2">{placeholder}</p>
        <input
          className="w-full bg-secondary py-2 px-6 border border-input-border rounded-full"
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          ref={ref}
          autoComplete={autocomplete ? "on" : "off"}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
