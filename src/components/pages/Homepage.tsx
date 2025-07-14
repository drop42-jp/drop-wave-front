import HeroSection from "../sections/HeroSection";
import DropCard from "../product/DropCard";
import ProductCard from "../product/ProductCard";
import { Drop, Product } from "../../types";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import type { Tables } from "../../database.types";

const Homepage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    "All",
    "Clothing",
    "Accessories",
    "Home & Living",
    "Art & Prints",
  ];

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log("fetching products");
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("store_id", import.meta.env.VITE_STORE_ID || "")
          .order("created_at", { ascending: false });
        console.log(data);

        // Transform Supabase data to match our Product interface
        const transformedProducts: Product[] = (
          data as Tables<"products">[]
        ).map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image_url || "/placeholder.svg",
          description: product.description || "",
          isNew: false, // You might want to add logic to determine if a product is new
          category: "Clothing", // You might want to add a category field to your database
        }));

        setProducts(transformedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Mock data for drops - you might want to create a drops table in the future
  const mockDrops: Drop[] = [
    {
      id: "premium-tee",
      title: "Premium Cotton Tee",
      image: "/lovable-uploads/a0af2fd1-53d3-4482-9b34-5dd7a03c12df.png",
      status: "coming-soon" as const,
      startDate: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
    },
    {
      id: "water-bottle",
      title: "Water Bottle Collection",
      image: "/lovable-uploads/09b11c0a-f123-4891-be66-b516558a9817.png",
      status: "live" as const,
      endDate: new Date(
        Date.now() +
          2 * 24 * 60 * 60 * 1000 +
          14 * 60 * 60 * 1000 +
          37 * 60 * 1000
      ), // 2d 14h 37m from now
      price: 22,
    },
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <HeroSection />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <HeroSection />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Drops Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <h2 className="text-2xl font-bold">Limited-time Drops</h2>
            </div>
            <Link
              to="/drops"
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockDrops.map((drop) => (
              <DropCard key={drop.id} drop={drop} />
            ))}
          </div>
        </div>

        {/* Featured Products Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCategory === "All"
                ? "Featured Products"
                : selectedCategory}
            </h2>
            <Link
              to="/products"
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
            >
              View all →
            </Link>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No products found in this category.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-6">
                {filteredProducts.slice(0, 3).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {filteredProducts.length > 3 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {filteredProducts.slice(3, 6).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
