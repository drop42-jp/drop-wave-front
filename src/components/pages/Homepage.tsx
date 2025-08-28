import HeroSection from "../sections/HeroSection";
import DropCard from "../product/DropCard";
import ProductCard from "../product/ProductCard";
import { Drop, Product } from "../../types";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import type { Tables } from "../../database.types";
import { Skeleton } from "../ui/skeleton";

const Homepage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [drops, setDrops] = useState<Drop[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDropStatus = (
    dropdate: string | null
  ): "coming-soon" | "live" | "ended" => {
    if (!dropdate) return "coming-soon";

    const dropDateTime = new Date(dropdate);
    const now = new Date();

    if (dropDateTime > now) {
      return "coming-soon";
    }

    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    if (dropDateTime >= sevenDaysAgo) {
      return "live";
    }

    return "ended";
  };

  useEffect(() => {
    const fetchDrops = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("store_id", import.meta.env.VITE_STORE_ID || "")
          .eq("isdrop", true)
          .order("dropdate", { ascending: false });

        if (error) throw error;

        const transformedDrops: Drop[] = (data as Tables<"products">[]).map(
          (product) => {
            const status = getDropStatus(product.dropdate);
            const drop: Drop = {
              id: product.id,
              title: product.name,
              image: product.image_url || "/placeholder.svg",
              status,
              price: product.price,
            };

            if (product.dropdate) {
              const dropDateTime = new Date(product.dropdate);
              if (status === "coming-soon") {
                drop.startDate = dropDateTime;
              } else if (status === "live") {
                drop.endDate = new Date(
                  dropDateTime.getTime() + 7 * 24 * 60 * 60 * 1000
                );
              }
            }

            return drop;
          }
        );

        setDrops(transformedDrops);
      } catch (err) {
        console.error("Error fetching drops:", err);
        setError("Failed to load drops");
      }
    };

    fetchDrops();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("store_id", import.meta.env.VITE_STORE_ID || "")
          .eq("isdrop", false)
          .order("created_at", { ascending: false });

        if (error) throw error;

        const transformedProducts: Product[] = (
          data as Tables<"products">[]
        ).map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image_url || "/placeholder.svg",
          description: product.description || "",
          isNew: false,
          category: product.category || "Uncategorized",
        }));

        setProducts(transformedProducts);

        const uniqueCategories = [
          "All",
          ...Array.from(
            new Set(
              transformedProducts
                .map((product) => product.category)
                .filter(Boolean)
            )
          ),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <HeroSection />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <HeroSection />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-destructive mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
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
    <div className="min-h-screen bg-background">
      <HeroSection />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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

        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-accent-foreground" />
              <h2 className="text-2xl font-bold text-foreground">
                Limited-time Drops
              </h2>
            </div>
            <Link
              to="/drops"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {drops.length === 0 ? (
              <>
                <div className="space-y-4">
                  <Skeleton className="w-full h-48 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
                <div className="space-y-4">
                  <Skeleton className="w-full h-48 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
              </>
            ) : (
              drops.map((drop) => <DropCard key={drop.id} drop={drop} />)
            )}
          </div>
        </div>

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