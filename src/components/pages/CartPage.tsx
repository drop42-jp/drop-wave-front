import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import CartHeader from "../cart/CartHeader";
import EmptyCart from "../cart/EmptyCart";
import CartItemsList from "../cart/CartItemsList";
import OrderSummary from "../cart/OrderSummary";

const CartPage = () => {
  const {
    items,
    updateQuantity,
    removeItem,
    getTotalPrice,
    clearCart,
    loading,
  } = useCart();

  const shippingCost = getTotalPrice() > 50 ? 0 : 8.99;
  const totalWithShipping = getTotalPrice() + shippingCost;

  console.log("CartPage rendered, items count:", items.length);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  const handleUpdateQuantity = async (
    id: string,
    quantity: number,
    size?: string,
    color?: string
  ) => {
    try {
      await updateQuantity(id, quantity, size, color);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = async (
    id: string,
    size?: string,
    color?: string
  ) => {
    try {
      await removeItem(id, size, color);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CartHeader />

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <CartItemsList
              items={items}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveItem}
              onClearCart={handleClearCart}
            />
            <div className="space-y-6">
              <OrderSummary
                subtotal={getTotalPrice()}
                shippingCost={shippingCost}
                total={totalWithShipping}
                items={items}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
