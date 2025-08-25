import { useState, useEffect } from "react";
import { X } from "lucide-react";

const Drop42Badge = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldShowBadge, setShouldShowBadge] = useState(true);

  useEffect(() => {
    // Check if running in iframe
    const isInIframe = window.self !== window.top;

    if (isInIframe) {
      try {
        // Get parent URL
        const parentUrl = document.referrer || window.parent.location.href;
        const parentDomain = new URL(parentUrl).hostname;

        // Check if parent domain is one of the specified domains
        const hideBadgeDomains = ["drop42.jtpk.app", "app.drop42.com"];
        if (hideBadgeDomains.includes(parentDomain)) {
          setShouldShowBadge(false);
        }
      } catch (error) {
        // If we can't access parent due to cross-origin restrictions,
        // check document.referrer as fallback
        if (document.referrer) {
          try {
            const referrerDomain = new URL(document.referrer).hostname;
            const hideBadgeDomains = ["drop42.jtpk.app", "app.drop42.com"];
            if (hideBadgeDomains.includes(referrerDomain)) {
              setShouldShowBadge(false);
            }
          } catch (referrerError) {
            // If all else fails, keep badge visible
            console.warn(
              "Could not determine parent domain, keeping badge visible"
            );
          }
        }
      }
    }
  }, []);

  if (!isVisible || !shouldShowBadge) return null;

  const handleBadgeClick = () => {
    window.open("http://drop42.com/", "_blank");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg">
        <div
          onClick={handleBadgeClick}
          className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="text-sm font-medium text-gray-300">Made with</span>
          <div className="flex items-center space-x-1">
            <img
              src="/lovable-uploads/lock-icon.svg"
              alt="Lock"
              className="w-5 h-5"
            />
            <span className="text-sm font-bold text-white">Drop42</span>
          </div>
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
