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
    <header className="sticky top-0 z-50 bg-[#FAF7FF]/80 backdrop-blur-md border-b border-[#A78BFA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#8B5CF6] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">NP</span>
            </div>
            <span className="text-xl font-bold text-[#7C3AED]">NP T-Shirts</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/collections"
              className="text-[#7C3AED] hover:text-[#8B5CF6] transition-colors"
            >
              Collections
            </Link>
            <Link
              to="/products"
              className="text-[#7C3AED] hover:text-[#8B5CF6] transition-colors"
            >
              T-Shirts
            </Link>
            <Link
              to="/about"
              className="text-[#7C3AED] hover:text-[#8B5CF6] transition-colors"
            >
              About Us
            </Link>
            <Link
              to={isAuthenticated ? "/account" : "/signin"}
              className="text-[#7C3AED] hover:text-[#8B5CF6] transition-colors"
            >
              {isAuthenticated ? "My Account" : "Sign In"}
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingBag className="w-6 h-6 text-[#7C3AED] hover:text-[#8B5CF6] transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#8B5CF6] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingBag className="w-6 h-6 text-[#7C3AED]" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#8B5CF6] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="text-[#7C3AED] hover:text-[#8B5CF6]"
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
          <div className="md:hidden border-t border-[#A78BFA] bg-[#FAF7FF]">
            <nav className="px-4 py-4 space-y-4">
              <Link
                to="/collections"
                className="block text-[#7C3AED] hover:text-[#8B5CF6] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                to="/products"
                className="block text-[#7C3AED] hover:text-[#8B5CF6] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                T-Shirts
              </Link>
              <Link
                to="/about"
                className="block text-[#7C3AED] hover:text-[#8B5CF6] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to={isAuthenticated ? "/account" : "/signin"}
                className="block text-[#7C3AED] hover:text-[#8B5CF6] transition-colors"
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