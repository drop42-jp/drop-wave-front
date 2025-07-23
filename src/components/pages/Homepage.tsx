import HeroSection from "../sections/HeroSection";
import DropCard from "../product/DropCard";
import ProductCard from "../product/ProductCard";
import { Drop, Product } from "../../types";
import { Shirt } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import type { Tables } from "../../database.types";
import { Skeleton } from "../ui/skeleton";

const Homepage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [drops, setDrops] = useState<Drop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = ["All", "Graphic Tees", "Plain Tees", "Vintage"];

  // Existing code for fetching drops and products remains the same

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Category Tabs */}
        <div className="mb-8">
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Collections Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Shirt className="w-5 h-5 text-accent-foreground" />
              <h2 className="text-2xl font-bold text-foreground">
                Limited Edition Collections
              </h2>
            </div>
            <Link
              to="/collections"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              View all Collections →
            </Link>
          </div>

          {/* Drops section remains the same */}
        </div>

        {/* Featured Products Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCategory === "All"
                ? "Featured T-Shirts"
                : selectedCategory}
            </h2>
            <Link
              to="/products"
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
            >
              View all T-Shirts →
            </Link>
          </div>

          {/* Product grid remains the same */}
        </div>
      </div>
    </div>
  );
};

export default Homepage;