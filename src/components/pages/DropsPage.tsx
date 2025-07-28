import DropCard from "../product/DropCard";
import { Drop } from "../../types";
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import type { Tables } from "../../database.types";

const DropsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [drops, setDrops] = useState<Drop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ["All", "Live", "Coming Soon", "Ended"];

  // Helper function to determine drop status based on dropdate
  const getDropStatus = (
    dropdate: string | null
  ): "coming-soon" | "live" | "ended" => {
    if (!dropdate) return "coming-soon";

    const dropDateTime = new Date(dropdate);
    const now = new Date();

    // If the drop date is in the future, it's coming soon
    if (dropDateTime > now) {
      return "coming-soon";
    }

    // If the drop date is within the last 7 days, it's live
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    if (dropDateTime >= sevenDaysAgo) {
      return "live";
    }

    // Otherwise, it's ended
    return "ended";
  };

  // Fetch drops from Supabase
  useEffect(() => {
    const fetchDrops = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("store_id", import.meta.env.VITE_STORE_ID || "")
          .eq("isdrop", true)
          .order("dropdate", { ascending: false });

        if (error) throw error;

        // Transform Supabase data to match our Drop interface
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

            // Add startDate for coming-soon drops or endDate for live drops
            if (product.dropdate) {
              const dropDateTime = new Date(product.dropdate);
              if (status === "coming-soon") {
                drop.startDate = dropDateTime;
              } else if (status === "live") {
                // For live drops, set end date to 7 days after the drop date
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
      } finally {
        setLoading(false);
      }
    };

    fetchDrops();
  }, []);

  const filteredDrops =
    selectedCategory === "All"
      ? drops
      : drops.filter((drop) => {
          switch (selectedCategory) {
            case "Live":
              return drop.status === "live";
            case "Coming Soon":
              return drop.status === "coming-soon";
            case "Ended":
              return drop.status === "ended";
            default:
              return true;
          }
        });

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Error Loading Drops
            </h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center space-x-2 mb-6">
          <Clock className="w-5 h-5 text-orange-500" />
          <h1 className="text-3xl font-bold">Limited-time Drops</h1>
        </div>

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

        {drops.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Drops Available
            </h2>
            <p className="text-gray-600">
              There are no drops available at the moment. Check back later for
              limited-time offers!
            </p>
          </div>
        ) : filteredDrops.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No {selectedCategory} Drops
            </h2>
            <p className="text-gray-600">
              There are no {selectedCategory.toLowerCase()} drops at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDrops.map((drop) => (
              <DropCard key={drop.id} drop={drop} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropsPage;
