import { useState } from "react";
import { X } from "lucide-react";

const Drop42Badge = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg">
        <span className="text-sm font-medium text-gray-300">Made with</span>
        <div className="flex items-center space-x-1">
          <img
            src="/lovable-uploads/lock-icon.svg"
            alt="Lock"
            className="w-5 h-5"
          />
          <span className="text-sm font-bold text-white">Drop42</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 p-1 hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-gray-400 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default Drop42Badge;
