import { useParams } from 'react-router-dom';
import { Calendar, Clock, Star } from 'lucide-react';
import CountdownTimer from '../ui/CountdownTimer';
import ProductCard from '../product/ProductCard';
import { Drop, Product } from '../../types';

const DropCampaignPage = () => {
  const { id } = useParams();

  // Mock drop data
  const mockDrop: Drop = {
    id: '1',
    title: 'Spring Awakening Collection',
    image: '/lovable-uploads/38c9f9f3-e155-44d2-9677-f296e1781068.png',
    status: 'live',
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    price: 89
  };

  const isLive = mockDrop.status === 'live';
  const isComingSoon = mockDrop.status === 'coming-soon';
  const isEnded = mockDrop.status === 'ended';

  // Mock products data
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Limited Edition Tee',
      price: 45,
      image: '/lovable-uploads/dd78b53a-3b2d-49aa-afde-210881370822.png',
      description: 'A soft and stylish tee for everyday wear.',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: '2',
      name: 'Exclusive Hoodie',
      price: 79,
      image: '/lovable-uploads/38c9f9f3-e155-44d2-9677-f296e1781068.png',
      description: 'Stay cozy with our premium hoodie.',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: '3',
      name: 'Collector\'s Print',
      price: 29,
      image: '/lovable-uploads/dd78b53a-3b2d-49aa-afde-210881370822.png',
      description: 'A high-quality print to elevate your space.'
    }
  ];

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Drop Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{mockDrop.title}</h2>
          <div className="flex items-center space-x-4 text-gray-500 mb-2">
            {isLive && (
              <>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Ends in:</span>
                  <CountdownTimer targetDate={mockDrop.endDate as Date} />
                </div>
              </>
            )}
            {isComingSoon && (
              <>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Releasing in:</span>
                  {mockDrop.startDate && <CountdownTimer targetDate={mockDrop.startDate} />}
                </div>
              </>
            )}
            {isEnded && (
              <div className="text-red-500">
                <Star className="w-4 h-4 inline" /> Drop Ended
              </div>
            )}
          </div>
          <p className="text-gray-600">
            {isLive && `Get it before it's gone! This limited edition drop ends soon.`}
            {isComingSoon && `Mark your calendars! This exclusive drop is coming soon.`}
            {isEnded && `This drop has ended. Stay tuned for future releases!`}
          </p>
        </div>

        {/* Drop Image */}
        <div className="mb-8">
          <img
            src={mockDrop.image}
            alt={mockDrop.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Products Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Products in this Drop</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropCampaignPage;
