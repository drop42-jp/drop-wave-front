
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
    <div className="group relative bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              New
            </span>
          )}

          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
              className="p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors"
            >
              <Heart 
                className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
              />
            </button>
          </div>

          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors">
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-900 mb-1 hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
