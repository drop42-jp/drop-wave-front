import { ShoppingBag, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const Header = () => {
  const { getTotalItems } = useCart();
  const { user } = useAuth();
  const totalItems = getTotalItems();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAuthenticated = !!user;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">CT</span>
            </div>
            <span className="text-xl font-bold">Charlotte Todd</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/drops"
              className="text-gray-700 hover:text-black transition-colors"
            >
              Drops
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-black transition-colors"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-black transition-colors"
            >
              About
            </Link>
            <Link
              to={isAuthenticated ? "/account" : "/signin"}
              className="text-gray-700 hover:text-black transition-colors"
            >
              {isAuthenticated ? "My Account" : "Sign In"}
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingBag className="w-6 h-6 text-gray-700 hover:text-black transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingBag className="w-6 h-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-black"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <nav className="px-4 py-4 space-y-4">
              <Link
                to="/drops"
                className="block text-gray-700 hover:text-black transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Drops
              </Link>
              <Link
                to="/products"
                className="block text-gray-700 hover:text-black transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="block text-gray-700 hover:text-black transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to={isAuthenticated ? "/account" : "/signin"}
                className="block text-gray-700 hover:text-black transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {isAuthenticated ? "My Account" : "Sign In"}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
