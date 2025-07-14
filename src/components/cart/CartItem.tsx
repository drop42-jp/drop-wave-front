
import { Plus, Minus, X } from 'lucide-react';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    size?: string;
    color?: string;
    quantity: number;
  };
  onUpdateQuantity: (id: string, quantity: number, size?: string, color?: string) => void;
  onRemove: (id: string, size?: string, color?: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  return (
    <div className="p-6">
      <div className="flex items-start space-x-4">
        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop"
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            {item.name}
          </h3>
          {item.size && (
            <p className="text-sm text-gray-500 mb-2">Size: {item.size}</p>
          )}
          <p className="text-lg font-semibold text-gray-900">
            ${item.price.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 border border-gray-200 rounded-lg">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.size)}
              className="p-2 hover:bg-gray-50 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.size)}
              className="p-2 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id, item.size)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
