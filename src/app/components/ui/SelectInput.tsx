"use client";
import React, { forwardRef } from "react";
import Image from "next/image";

interface SelectInputProps {
  id?: string;
  name?: string;
  label?: string;
  options: { value: string; label: string }[];
  placeholder: string;
  onChange?: (option: { value: string; label: string }) => void;
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ id, name, label, options, placeholder, onChange }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedOption = options.find(
        (option) => option.value === e.target.value
      );
      if (selectedOption && onChange) {
        onChange(selectedOption);
      }
    };

    return (
      <div className="w-full">
        <label className="text-foreground-secondary mb-1">
          {label ? label : placeholder}
        </label>

        <div className="relative w-full">
          <select
            id={id}
            name={name}
            ref={ref}
            onChange={handleChange}
            className="w-full bg-secondary py-2 px-6 border border-input-border rounded-full appearance-none cursor-pointer pr-12"
          >
            <option value="" disabled hidden>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Image
            src={"/icons/Arrowdown.svg"}
            alt={"Arrow down"}
            height={16}
            width={16}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none"
          />
        </div>
      </div>
    );
  }
);

SelectInput.displayName = "SelectInput";
export default SelectInput;
