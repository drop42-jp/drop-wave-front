
import { useState } from 'react';
import { Clock, Star, ShoppingBag, Minus, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CountdownTimer from '../ui/CountdownTimer';
import { Button } from '../ui/button';
import ProductImageGallery from '../product/ProductImageGallery';

const WaterBottleDropPage = () => {
  const dropEndDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 37 * 60 * 1000);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  
  const [selectedProduct, setSelectedProduct] = useState({
    id: '2',
    name: 'Stainless Steel Water Bottle',
    price: 22,
    image: '/lovable-uploads/09b11c0a-f123-4891-be66-b516558a9817.png',
    description: 'Premium stainless steel water bottle with insulation. Perfect for staying hydrated on the go.',
    stock: 47,
    images: [
      '/lovable-uploads/09b11c0a-f123-4891-be66-b516558a9817.png',
      '/lovable-uploads/a5baf921-1082-4125-8cc8-ccb252062a6b.png'
    ]
  });
  
  const [quantity, setQuantity] = useState(1);

  const variants = [
    {
      id: '2',
      name: 'Stainless Steel Water Bottle',
      price: 22,
      stock: 47,
      images: [
        '/lovable-uploads/09b11c0a-f123-4891-be66-b516558a9817.png',
        '/lovable-uploads/a5baf921-1082-4125-8cc8-ccb252062a6b.png'
      ]
    },
    {
      id: '7',
      name: 'Water Bottle - Matte Black',
      price: 25,
      stock: 23,
      images: [
        '/lovable-uploads/17b70eb0-ff9a-4af8-80ad-5fdd4ab6d334.png',
        '/lovable-uploads/a0af2fd1-53d3-4482-9b34-5dd7a03c12df.png'
      ]
    },
    {
      id: '8',
      name: 'Water Bottle - Rose Gold',
      price: 28,
      stock: 12,
      images: [
        '/lovable-uploads/a0af2fd1-53d3-4482-9b34-5dd7a03c12df.png',
        '/lovable-uploads/17b70eb0-ff9a-4af8-80ad-5fdd4ab6d334.png'
      ]
    }
  ];

  const handleAddToBag = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        image: selectedProduct.image
      });
    }
  };

  const handleBuyNow = () => {
    navigate('/drop/water-bottle');
  };

  const incrementQuantity = () => {
    if (quantity < selectedProduct.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleVariantChange = (variant: typeof variants[0]) => {
    setSelectedProduct({
      ...selectedProduct,
      id: variant.id,
      name: variant.name,
      price: variant.price,
      stock: variant.stock,
      images: variant.images
    });
    setCurrentImages(variant.images);
  };

  const displayImages = currentImages.length > 0 ? currentImages : selectedProduct.images;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Drop Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
            DROP IS LIVE!
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Water Bottle Collection
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Stay hydrated in style with our premium water bottle collection. Limited quantities available.
          </p>

          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Ends in:</span>
              <CountdownTimer targetDate={dropEndDate} />
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
              <span className="text-sm">Limited Edition</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images with Thumbnails */}
          <ProductImageGallery images={displayImages} productName={selectedProduct.name} />

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
              <p className="text-xl font-semibold text-gray-900">${selectedProduct.price}</p>
              <p className="text-gray-600 mt-4">{selectedProduct.description}</p>
            </div>

            {/* Stock Info */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm font-medium text-orange-800">
                Only {selectedProduct.stock} left in stock - order soon!
              </p>
            </div>

            {/* Variant Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Choose Variant</h3>
              <div className="space-y-2">
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => handleVariantChange(variant)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedProduct.id === variant.id
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{variant.name}</span>
                      <div className="text-right">
                        <div className="font-semibold">${variant.price}</div>
                        <div className="text-sm text-gray-600">{variant.stock} left</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="font-semibold text-lg w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= selectedProduct.stock}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Add to Bag */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToBag}
                className="w-full bg-black text-white hover:bg-gray-800 py-3 text-lg"
                disabled={selectedProduct.stock === 0}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Bag - ${(selectedProduct.price * quantity).toFixed(2)}
              </Button>
              
              <div className="text-center text-sm text-gray-600">
                Free shipping on orders over $50
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Don't Miss Out!</h3>
          <p className="text-gray-600 mb-6">This drop ends soon. Get yours before they're gone forever.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/drops"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              View All Drops
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterBottleDropPage;
