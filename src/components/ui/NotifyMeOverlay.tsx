
import { useEffect, useState } from 'react';
import { Bell, Check } from 'lucide-react';

interface NotifyMeOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
}

const NotifyMeOverlay = ({ isVisible, onClose, title }: NotifyMeOverlayProps) => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowAnimation(true);
      const timer = setTimeout(() => {
        setShowAnimation(false);
        setTimeout(onClose, 300); // Wait for exit animation
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
      showAnimation ? 'bg-black/20 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className={`relative transition-all duration-500 ${
        showAnimation ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
      }`}>
        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm mx-auto border border-gray-100">
          <div className="text-center">
            {/* Success checkmark */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            
            {/* Success message */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">You're on the list!</h3>
            <p className="text-gray-600 mb-6">We'll notify you when {title} goes live</p>
            
            {/* Animated bell with notification */}
            <div className="relative inline-block">
              <div className={`transform transition-all duration-700 ${
                showAnimation ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
              }`}>
                <Bell className="w-12 h-12 text-black" />
              </div>
              
              {/* Notification badge */}
              <div className={`absolute -top-2 -right-2 bg-green-500 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center transform transition-all duration-500 ${
                showAnimation ? 'scale-125 animate-pulse' : 'scale-100'
              }`}>
                !
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-green-400 rounded-full transition-all duration-1000 ${
                showAnimation ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.1}s`,
                transform: showAnimation ? `translateY(-${20 + i * 10}px) scale(0)` : 'translateY(0) scale(1)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotifyMeOverlay;
