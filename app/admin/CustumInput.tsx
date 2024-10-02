"use client";
import React, { ChangeEvent } from "react";

interface InputProps {
  inputName: string;
  isDisabled: boolean;
  setValue: (value: string) => void;
}

const CustumInput: React.FC<InputProps> = ({
  inputName,
  isDisabled,
  setValue,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="relative text-sm">
      <input
        type="text"
        className="w-full p-2 bg-transparent border border-gray-300 rounded-md text-white/80 peer z-50"
        placeholder=" "
        disabled={isDisabled}
        onChange={handleChange}
      />
      <label className="absolute left-2 top-[-10px] transition-all duration-300 ease-in-out peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:top-[-10px] peer-focus:text-sm bg-[#232323] peer-hover:top-[-10px] px-1 z-0 hover:top-[-10px]">
        {inputName}
      </label>
    </div>
  );
};

export default CustumInput;
