
import DropCard from '../product/DropCard';
import { Drop } from '../../types';
import { Clock } from 'lucide-react';
import { useState } from 'react';

const DropsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Live', 'Coming Soon', 'Ended'];

  // Mock data for drops
  const mockDrops: Drop[] = [
    {
      id: '1',
      title: 'Premium Cotton Tee',
      image: '/lovable-uploads/a0af2fd1-53d3-4482-9b34-5dd7a03c12df.png',
      status: 'coming-soon' as const,
      startDate: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
    },
    {
      id: '2',
      title: 'Water Bottle Collection',
      image: '/lovable-uploads/09b11c0a-f123-4891-be66-b516558a9817.png',
      status: 'live' as const,
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 37 * 60 * 1000), // 2d 14h 37m from now
      price: 22
    }
  ];

  const filteredDrops = selectedCategory === 'All' 
    ? mockDrops 
    : mockDrops.filter(drop => {
        switch (selectedCategory) {
          case 'Live':
            return drop.status === 'live';
          case 'Coming Soon':
            return drop.status === 'coming-soon';
          case 'Ended':
            return drop.status === 'ended';
          default:
            return true;
        }
      });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center space-x-2 mb-6">
          <Clock className="w-5 h-5 text-orange-500" />
          <h1 className="text-3xl font-bold">Limited-time Drops</h1>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDrops.map((drop) => (
            <DropCard key={drop.id} drop={drop} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropsPage;
