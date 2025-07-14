import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "./components/ui/toaster";
import Header from "./components/layout/Header";
import Homepage from "./components/pages/Homepage";
import ProductsPage from "./components/pages/ProductsPage";
import ProductPage from "./components/pages/ProductPage";
import DropsPage from "./components/pages/DropsPage";
import DropCampaignPage from "./components/pages/DropCampaignPage";
import WaterBottleDropPage from "./components/pages/WaterBottleDropPage";
import PremiumTeeDropPage from "./components/pages/PremiumTeeDropPage";
import AvailableSoonDropPage from "./components/pages/AvailableSoonDropPage";
import AboutCreatorPage from "./components/pages/AboutCreatorPage";
import CartPage from "./components/pages/CartPage";
import CheckoutPage from "./components/pages/CheckoutPage";
import CheckoutSuccessPage from "./components/pages/CheckoutSuccessPage";
import SignInPage from "./components/pages/SignInPage";
import SignUpPage from "./components/pages/SignUpPage";
import AccountPage from "./components/pages/AccountPage";
import NotFound from "./pages/NotFound";
import AddedToBagOverlay from "./components/cart/AddedToBagOverlay";
import Drop42Badge from "./components/ui/Drop42Badge";

function AppContent() {
  const { addedToBag, hideAddedToBag, getTotalItems } = useCart();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/drops" element={<DropsPage />} />
        <Route path="/drop/:id" element={<DropCampaignPage />} />
        <Route path="/drop/water-bottle" element={<WaterBottleDropPage />} />
        <Route path="/drop/premium-tee" element={<PremiumTeeDropPage />} />
        <Route path="/drop/1" element={<AvailableSoonDropPage />} />
        <Route path="/about" element={<AboutCreatorPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      <AddedToBagOverlay
        isVisible={addedToBag.isVisible}
        onClose={hideAddedToBag}
        itemName={addedToBag.itemName}
        cartCount={getTotalItems()}
      />

      {/* Drop42 Badge - Bottom Center */}
      <Drop42Badge />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
