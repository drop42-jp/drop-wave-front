import { Link } from "react-router-dom";
import {
  Check,
  Share2,
  Instagram,
  Twitter,
  Facebook,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";

const CheckoutSuccessPage = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart on successful checkout
    clearCart();
  }, [clearCart]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check out my latest purchase!",
        text: "Just got some amazing items from this store!",
        url: window.location.origin,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.origin);
      alert("Link copied to clipboard!");
    }
  };

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com",
      color: "hover:text-pink-600",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com",
      color: "hover:text-blue-400",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com",
      color: "hover:text-blue-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Success Message */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>

          <p className="text-gray-600 mb-8 text-lg">
            Thank you for your purchase. Your order has been successfully placed
            and you'll receive a confirmation email shortly.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-2">Order Details</h3>
            <p className="text-sm text-gray-600">Order #12345</p>
            <p className="text-sm text-gray-600">
              Estimated delivery: 3-5 business days
            </p>
          </div>

          {/* Share Section */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Share Your Purchase
            </h2>
            <p className="text-gray-600 mb-6">
              Let your friends know about your great finds!
            </p>

            <button
              onClick={handleShare}
              className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 mb-6"
            >
              <Share2 className="w-5 h-5" />
              <span>Share Purchase</span>
            </button>
          </div>

          {/* Follow Section */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h2>
            <p className="text-gray-600 mb-6">
              Stay updated with our latest drops and exclusive offers
            </p>

            <div className="flex justify-center space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors ${social.color}`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="border-t border-gray-200 pt-8">
            <Link
              to="/"
              className="inline-flex items-center bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
