
import { useState } from 'react';
import { Clock, Bell, Star, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountdownTimer from '../ui/CountdownTimer';
import { Button } from '../ui/button';
import NotifyMeOverlay from '../ui/NotifyMeOverlay';
import ProductImageGallery from '../product/ProductImageGallery';

const PremiumTeeDropPage = () => {
  const dropStartDate = new Date(Date.now() + 8 * 60 * 60 * 1000);
  const [email, setEmail] = useState('');
  const [isNotified, setIsNotified] = useState(false);
  const [showNotifyOverlay, setShowNotifyOverlay] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>([]);

  const [selectedVariant, setSelectedVariant] = useState({
    id: '1',
    name: 'Premium Cotton Tee - Black',
    price: 28,
    expectedStock: 150,
    images: [
      '/lovable-uploads/09b11c0a-f123-4891-be66-b516558a9817.png',
      '/lovable-uploads/a5baf921-1082-4125-8cc8-ccb252062a6b.png'
    ]
  });

  const variants = [
    {
      id: '1',
      name: 'Premium Cotton Tee - Black',
      price: 28,
      expectedStock: 150,
      images: [
        '/lovable-uploads/09b11c0a-f123-4891-be66-b516558a9817.png',
        '/lovable-uploads/a5baf921-1082-4125-8cc8-ccb252062a6b.png'
      ]
    },
    {
      id: '9',
      name: 'Premium Cotton Tee - White',
      price: 28,
      expectedStock: 120,
      images: [
        '/lovable-uploads/17b70eb0-ff9a-4af8-80ad-5fdd4ab6d334.png',
        '/lovable-uploads/a0af2fd1-53d3-4482-9b34-5dd7a03c12df.png'
      ]
    },
    {
      id: '10',
      name: 'Premium Cotton Tee - Gray',
      price: 28,
      expectedStock: 100,
      images: [
        '/lovable-uploads/a0af2fd1-53d3-4482-9b34-5dd7a03c12df.png',
        '/lovable-uploads/17b70eb0-ff9a-4af8-80ad-5fdd4ab6d334.png'
      ]
    }
  ];

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsNotified(true);
    setShowNotifyOverlay(true);
  };

  const hideNotifyOverlay = () => {
    setShowNotifyOverlay(false);
  };

  const handleVariantChange = (variant: typeof variants[0]) => {
    setSelectedVariant(variant);
    setCurrentImages(variant.images);
  };

  const displayImages = currentImages.length > 0 ? currentImages : selectedVariant.images;

  return (
    <div className="min-h-screen bg-white">
      <NotifyMeOverlay 
        isVisible={showNotifyOverlay}
        onClose={hideNotifyOverlay}
        title="Premium Cotton Tee"
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Drop Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-gray-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Clock className="w-3 h-3 mr-2" />
            AVAILABLE SOON
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Premium Cotton Tee
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Our softest, most comfortable tee yet. Made with premium cotton for the perfect fit and feel.
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
          {/* Product Images with Thumbnails */}
          <ProductImageGallery images={displayImages} productName={selectedVariant.name} />

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedVariant.name}</h2>
              <p className="text-xl font-semibold text-gray-900">${selectedVariant.price}</p>
              <p className="text-gray-600 mt-4">
                Ultra-soft premium cotton t-shirt with superior comfort and fit. Perfect for everyday wear.
              </p>
            </div>

            {/* Expected Stock Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm font-medium text-blue-800">
                Expected stock: {selectedVariant.expectedStock} units available when live
              </p>
            </div>

            {/* Variant Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Choose Color</h3>
              <div className="space-y-2">
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => handleVariantChange(variant)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedVariant.id === variant.id
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{variant.name}</span>
                      <div className="text-right">
                        <div className="font-semibold">${variant.price}</div>
                        <div className="text-sm text-gray-600">{variant.expectedStock} expected</div>
                      </div>
                    </div>
                  </button>
                ))}
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
              Be among the first to get this limited edition tee
            </div>
          </div>
        </div>

        {/* More Info Section */}
        <div className="text-center bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Why You'll Love It</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-2">Premium Cotton</h4>
              <p className="text-gray-600 text-sm">100% premium cotton for ultimate comfort</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Perfect Fit</h4>
              <p className="text-gray-600 text-sm">Carefully designed for the ideal fit</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Limited Edition</h4>
              <p className="text-gray-600 text-sm">Exclusive design, limited quantities</p>
            </div>
          </div>
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

export default PremiumTeeDropPage;
