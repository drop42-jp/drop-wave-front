
import CartItem from './CartItem';

interface CartItemsListProps {
  items: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    size?: string;
    color?: string;
    quantity: number;
  }>;
  onUpdateQuantity: (id: string, quantity: number, size?: string, color?: string) => void;
  onRemove: (id: string, size?: string, color?: string) => void;
  onClearCart: () => void;
}

const CartItemsList = ({ items, onUpdateQuantity, onRemove, onClearCart }: CartItemsListProps) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            <button
              onClick={onClearCart}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {items.map((item) => (
            <CartItem
              key={`${item.id}-${item.size}`}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemove}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartItemsList;
