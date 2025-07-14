
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CartHeader = () => {
  return (
    <div className="flex items-center space-x-4 mb-8">
      <Link
        to="/"
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Continue Shopping</span>
      </Link>
    </div>
  );
};

export default CartHeader;
