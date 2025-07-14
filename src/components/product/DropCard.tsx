import { Clock, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import CountdownTimer from "../ui/CountdownTimer";

interface Drop {
  id: string;
  title: string;
  image: string;
  status: "coming-soon" | "live" | "ended";
  startDate?: Date;
  endDate?: Date;
  price?: number;
}

interface DropCardProps {
  drop: Drop;
}

const DropCard = ({ drop }: DropCardProps) => {
  const isLive = drop.status === "live";
  const isComingSoon = drop.status === "coming-soon";

  // Map drop IDs to specific routes
  const getDropRoute = (dropId: string) => {
    switch (dropId) {
      case "water-bottle":
        return "/drop/water-bottle";
      case "premium-tee":
        return "/drop/premium-tee";
      default:
        return `/drop/${dropId}`;
    }
  };

  return (
    <div className="group relative bg-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link
        to={getDropRoute(drop.id)}
        className="aspect-square bg-gray-100 relative overflow-hidden block"
      >
        <img
          src={drop.image}
          alt={drop.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          {isLive && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Drop is live!
            </span>
          )}
          {isComingSoon && (
            <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Available soon
            </span>
          )}
        </div>

        {/* Countdown Timer */}
        {isLive && drop.endDate && (
          <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm">
            <CountdownTimer targetDate={drop.endDate} />
          </div>
        )}
      </Link>

      <div className="p-6 bg-white">
        <h3 className="text-xl font-bold mb-2">{drop.title}</h3>

        {isComingSoon && drop.startDate && (
          <div className="mb-4">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Clock className="w-4 h-4 mr-1" />
              Starts in <CountdownTimer targetDate={drop.startDate} />
            </div>
          </div>
        )}

        {isLive && drop.endDate && (
          <div className="mb-4">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Clock className="w-4 h-4 mr-1" />
              Ends in <CountdownTimer targetDate={drop.endDate} />
            </div>
          </div>
        )}

        <div className="space-y-2">
          {isComingSoon ? (
            <Link
              to={getDropRoute(drop.id)}
              className="block w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center flex items-center justify-center space-x-2"
            >
              <Bell className="w-4 h-4" />
              <span>Get notified</span>
            </Link>
          ) : (
            <Link
              to={getDropRoute(drop.id)}
              className="block w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors text-center"
            >
              {isLive ? "Buy Now" : "View Drop"}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropCard;
