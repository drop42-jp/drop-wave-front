import { Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-white py-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f3f4f6%22%20fill-opacity%3D%220.4%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Unique designs and limited drops. Express yourself with pieces that tell your story.
          </p>

          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>Limited Edition Drops</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div>Free Shipping Over $50</div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div>Worldwide Delivery</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
