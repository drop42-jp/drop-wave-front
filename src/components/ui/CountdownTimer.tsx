
import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
}

const CountdownTimer = ({ targetDate, onComplete }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        onComplete?.();
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return <span>Time's up!</span>;
  }

  return (
    <div className="flex items-center space-x-1 text-sm">
      {timeLeft.days > 0 && (
        <>
          <span className="font-medium">{timeLeft.days}d</span>
          <span className="text-gray-400">:</span>
        </>
      )}
      <span className="font-medium">{timeLeft.hours.toString().padStart(2, '0')}h</span>
      <span className="text-gray-400">:</span>
      <span className="font-medium">{timeLeft.minutes.toString().padStart(2, '0')}m</span>
      {timeLeft.days === 0 && (
        <>
          <span className="text-gray-400">:</span>
          <span className="font-medium">{timeLeft.seconds.toString().padStart(2, '0')}s</span>
        </>
      )}
    </div>
  );
};

export default CountdownTimer;
