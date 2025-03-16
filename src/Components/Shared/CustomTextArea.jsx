import { useState } from "react";

const CustomTextArea = ({placeholder, charCount, value, onChange}) => {
  const maxLength = charCount; // Set character limit

  const handleInputChange = (e) => {
    if (e.target.value.length <= maxLength) {
        onChange(e.target.value);
    }
  };

  return (
    <div className="relative w-full">
      <textarea
        name="description"
        placeholder={placeholder}
        required
        value={value}
        onChange={handleInputChange}
        className="text-sm sm:text-base font-light w-full p-1 outline-none resize-none focus:border-blue-500 dark:text-white"
        rows={4}
      ></textarea>

      {/* Character Count */}
      <div className="text-sm text-gray-400 absolute bottom-2 right-2">
      {value.length}/{maxLength}
      </div>

    </div>
  );
};

export default CustomTextArea;
