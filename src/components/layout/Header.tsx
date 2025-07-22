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
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">
                CT
              </span>
            </div>
            <span className="text-xl font-bold text-foreground">
              Charlotte Todd
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/drops"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Drops
            </Link>
            <Link
              to="/products"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              to={isAuthenticated ? "/account" : "/signin"}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {isAuthenticated ? "My Account" : "Sign In"}
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingBag className="w-6 h-6 text-muted-foreground hover:text-foreground transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingBag className="w-6 h-6 text-muted-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="text-muted-foreground hover:text-foreground"
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
          <div className="md:hidden border-t border-border bg-background">
            <nav className="px-4 py-4 space-y-4">
              <Link
                to="/drops"
                className="block text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Drops
              </Link>
              <Link
                to="/products"
                className="block text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="block text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to={isAuthenticated ? "/account" : "/signin"}
                className="block text-muted-foreground hover:text-foreground transition-colors"
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
