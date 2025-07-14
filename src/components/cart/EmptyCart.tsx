
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const EmptyCart = () => {
  return (
    <div className="text-center py-16">
      <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-6" />
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
      <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
      <Link
        to="/"
        className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        Start Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
