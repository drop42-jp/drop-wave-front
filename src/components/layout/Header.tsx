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
    <header className="sticky top-0 z-50 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 backdrop-blur-md border-b border-yellow-400/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                🚀
              </span>
            </div>
            <span className="text-xl font-bold text-white">
              Niranjan Kids Toys
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/space-adventures"
              className="text-yellow-200 hover:text-white transition-colors"            >
              Space Adventures
            </Link>
            <Link
              to="/galaxy-toys"
              className="text-yellow-200 hover:text-white transition-colors"
            >
              Galaxy Toys
            </Link>
            <Link
              to="/cosmic-crafts"
              className="text-yellow-200 hover:text-white transition-colors"
            >
              Cosmic Crafts
            </Link>
            <Link
              to={isAuthenticated ? "/account" : "/signin"}
              className="text-yellow-200 hover:text-white transition-colors"
            >
              {isAuthenticated ? "My Account" : "Sign In"}
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingBag className="w-6 h-6 text-yellow-200 hover:text-white transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingBag className="w-6 h-6 text-yellow-200" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="text-yellow-200 hover:text-white"
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
          <div className="md:hidden border-t border-yellow-400/50 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
            <nav className="px-4 py-4 space-y-4">
              <Link
                to="/space-adventures"
                className="block text-yellow-200 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Space Adventures
              </Link>
              <Link
                to="/galaxy-toys"
                className="block text-yellow-200 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Galaxy Toys
              </Link>
              <Link
                to="/cosmic-crafts"
                className="block text-yellow-200 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cosmic Crafts
              </Link>
              <Link
                to={isAuthenticated ? "/account" : "/signin"}
                className="block text-yellow-200 hover:text-white transition-colors"
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