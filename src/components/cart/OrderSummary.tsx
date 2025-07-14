
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

interface OrderSummaryProps {
  subtotal: number;
  shippingCost: number;
  total: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    size?: string;
    color?: string;
    quantity: number;
  }>;
}

const OrderSummary = ({ subtotal, shippingCost, total, items }: OrderSummaryProps) => {
  const navigate = useNavigate();

  const handleSecureCheckout = () => {
    console.log('Secure checkout clicked - button handler triggered');
    console.log('Items in cart:', items);
    console.log('Total price:', total);
    try {
      navigate('/checkout');
      console.log('Navigation to checkout initiated');
    } catch (error) {
      console.error('Error navigating to checkout:', error);
    }
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>
              {shippingCost === 0 ? (
                <span className="text-green-600 font-medium">Free</span>
              ) : (
                `$${shippingCost.toFixed(2)}`
              )}
            </span>
          </div>
          {subtotal < 50 && shippingCost > 0 && (
            <div className="text-sm text-gray-500">
              Add ${(50 - subtotal).toFixed(2)} more for free shipping
            </div>
          )}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Button clicked - event triggered');
            handleSecureCheckout();
          }}
          className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 mb-4 cursor-pointer"
          type="button"
          style={{ pointerEvents: 'auto' }}
        >
          <Lock className="w-5 h-5" />
          <span>Secure Checkout</span>
        </button>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Lock className="w-4 h-4" />
            <span>SSL Encrypted • Secure Payment</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-medium text-gray-900 mb-3">We Accept</h3>
          <div className="flex space-x-2">
            {['Visa', 'MC', 'Amex', 'PayPal'].map((payment) => (
              <div key={payment} className="w-10 h-6 bg-gray-100 rounded border flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">{payment}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
