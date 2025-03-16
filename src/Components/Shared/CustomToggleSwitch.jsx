import { useState } from "react";

const CustomToggleSwitch = ({ onChange, content }) => {
  const [isTrue, setIsTrue] = useState(true);

  const handleToggle = () => {
    const newPrivacy = isTrue ? "private" : "public";
    setIsTrue(!isTrue);
    onChange(newPrivacy); 
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600 dark:text-gray-300">{content}</span>
      <button
        onClick={handleToggle}
        className={`w-11 h-6 flex items-center rounded-full p-1 transition-all ${
            isTrue ? "bg-blue-500" : "bg-gray-400"
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${
            isTrue ? "translate-x-5" : "translate-x-0"
          }`}
        ></div>
      </button>
      {/* <span className="text-sm text-gray-600 dark:text-gray-300">Public</span> */}
    </div>
  );
};

export default CustomToggleSwitch;
