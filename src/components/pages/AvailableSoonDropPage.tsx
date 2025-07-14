
import { useState } from 'react';
import { Clock, Bell, Star, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountdownTimer from '../ui/CountdownTimer';
import { Button } from '../ui/button';
import NotifyMeOverlay from '../ui/NotifyMeOverlay';

const AvailableSoonDropPage = () => {
  const dropStartDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000);
  const [email, setEmail] = useState('');
  const [isNotified, setIsNotified] = useState(false);
  const [showNotifyOverlay, setShowNotifyOverlay] = useState(false);

  const dropDetails = {
    title: 'Exclusive Sneaker Drop',
    description: 'Limited edition sneakers with premium materials and unique design. Only 100 pairs will be available.',
    image: '/lovable-uploads/38c9f9f3-e155-44d2-9677-f296e1781068.png',
    expectedPrice: 150,
    expectedStock: 100
  };

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsNotified(true);
    setShowNotifyOverlay(true);
  };

  const hideNotifyOverlay = () => {
    setShowNotifyOverlay(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <NotifyMeOverlay 
        isVisible={showNotifyOverlay}
        onClose={hideNotifyOverlay}
        title={dropDetails.title}
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Drop Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-gray-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Clock className="w-3 h-3 mr-2" />
            AVAILABLE SOON
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {dropDetails.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            {dropDetails.description}
          </p>

          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Drops in:</span>
              <CountdownTimer targetDate={dropStartDate} />
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
              <span className="text-sm">Limited Edition</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden">
            <img
              src={dropDetails.image}
              alt={dropDetails.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{dropDetails.title}</h2>
              <p className="text-xl font-semibold text-gray-900">Expected Price: ${dropDetails.expectedPrice}</p>
              <p className="text-gray-600 mt-4">{dropDetails.description}</p>
            </div>

            {/* Expected Stock Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm font-medium text-blue-800">
                Expected stock: {dropDetails.expectedStock} units available when live
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-semibold mb-3">What Makes This Special</h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                  <span className="text-gray-700">Premium materials and craftsmanship</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                  <span className="text-gray-700">Limited edition - only {dropDetails.expectedStock} pieces</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                  <span className="text-gray-700">Exclusive design not available elsewhere</span>
                </div>
              </div>
            </div>

            {/* Notification Signup */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Get Notified When Available
              </h3>
              
              {!isNotified ? (
                <form onSubmit={handleNotifyMe} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800 py-3"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Notify Me When Available
                  </Button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Bell className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="font-medium text-gray-900">You're on the list!</p>
                  <p className="text-sm text-gray-600 mt-1">
                    We'll email you as soon as this drop goes live.
                  </p>
                </div>
              )}
            </div>

            <div className="text-center text-sm text-gray-600">
              Be among the first to get this exclusive drop
            </div>
          </div>
        </div>

        {/* More Info Section */}
        <div className="text-center bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Don't Miss Out</h3>
          <p className="text-gray-600 mb-6">
            This is a limited drop with very few pieces available. Sign up for notifications to be the first to know when it goes live.
          </p>
          <Link
            to="/drops"
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors inline-block"
          >
            View All Drops
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AvailableSoonDropPage;
