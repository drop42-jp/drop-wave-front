import { Clock, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../hooks/use-toast";
import CountdownTimer from "../ui/CountdownTimer";
import NotifyMeOverlay from "../ui/NotifyMeOverlay";
import EmailInputDialog from "../ui/EmailInputDialog";
import { scheduleNotification } from "../../lib/notificationService";

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
  const { user } = useAuth();
  const { toast } = useToast();
  const [showNotifyOverlay, setShowNotifyOverlay] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [isSchedulingNotification, setIsSchedulingNotification] =
    useState(false);

  const isLive = drop.status === "live";
  const isComingSoon = drop.status === "coming-soon";

  // Handle notification request
  const handleNotifyMe = async (email?: string) => {
    if (!drop.startDate) {
      toast({
        title: "Error",
        description: "Drop start date is not available",
        variant: "destructive",
      });
      return;
    }

    const userEmail = email || user?.email;
    if (!userEmail) {
      toast({
        title: "Error",
        description: "Email address is required",
        variant: "destructive",
      });
      return;
    }

    setIsSchedulingNotification(true);

    try {
      const result = await scheduleNotification(
        drop.id,
        userEmail,
        drop.startDate
      );

      if (result.success) {
        setShowNotifyOverlay(true);
        setShowEmailDialog(false);
      } else {
        toast({
          title: "Failed to set notification",
          description: result.error || "Please try again later",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSchedulingNotification(false);
    }
  };

  // Handle get notified button click
  const handleGetNotifiedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (user?.email) {
      // User is logged in, send notification directly
      handleNotifyMe();
    } else {
      // User is not logged in, show email input dialog
      setShowEmailDialog(true);
    }
  };

  // Map drop IDs to specific routes
  const getDropRoute = (dropId: string, status: string) => {
    // If drop is live, redirect to product page for purchasing
    if (status === "live") {
      return `/product/${dropId}`;
    }

    // For coming-soon and ended drops, show drop campaign page
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
        to={getDropRoute(drop.id, drop.status)}
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
            <button
              onClick={handleGetNotifiedClick}
              disabled={isSchedulingNotification}
              className="block w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Bell className="w-4 h-4" />
              <span>
                {isSchedulingNotification ? "Setting up..." : "Get notified"}
              </span>
            </button>
          ) : (
            <Link
              to={getDropRoute(drop.id, drop.status)}
              className="block w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors text-center"
            >
              {isLive ? "Buy Now" : "View Drop"}
            </Link>
          )}
        </div>
      </div>

      {/* Email Input Dialog for non-logged-in users */}
      <EmailInputDialog
        isOpen={showEmailDialog}
        onClose={() => setShowEmailDialog(false)}
        onSubmit={handleNotifyMe}
        isLoading={isSchedulingNotification}
        dropTitle={drop.title}
      />

      {/* Success Notification Overlay */}
      <NotifyMeOverlay
        isVisible={showNotifyOverlay}
        onClose={() => setShowNotifyOverlay(false)}
        title={drop.title}
      />
    </div>
  );
};

export default DropCard;
