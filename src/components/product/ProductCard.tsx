
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  isNew?: boolean;
  description?: string;
  category?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 border border-gray-200/50 backdrop-blur-sm">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          {product.isNew && (
            <span className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
              New
            </span>
          )}

          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
              className="p-2.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 border border-white/20"
            >
              <Heart 
                className={`w-4 h-4 transition-colors duration-300 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-400'}`} 
              />
            </button>
          </div>

          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button className="p-3 bg-black/90 backdrop-blur-md text-white rounded-full shadow-xl hover:bg-black hover:shadow-2xl transition-all duration-300 border border-white/10 hover:scale-110">
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 hover:text-gray-700 transition-colors duration-300 text-lg leading-tight">
            {product.name}
          </h3>
          <p className="text-xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            ${product.price.toFixed(2)}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;