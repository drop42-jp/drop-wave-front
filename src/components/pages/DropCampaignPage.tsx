import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Calendar, Clock, Star } from "lucide-react";
import CountdownTimer from "../ui/CountdownTimer";
import ProductCard from "../product/ProductCard";
import { Drop, Product } from "../../types";
import { supabase } from "../../lib/supabase";
import type { Tables } from "../../database.types";

const DropCampaignPage = () => {
  const { id } = useParams();
  const [drop, setDrop] = useState<Drop | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Fetch drop data from Supabase
  useEffect(() => {
    const fetchDrop = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch the specific drop
        const { data: dropData, error: dropError } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .eq("store_id", import.meta.env.VITE_STORE_ID || "")
          .eq("isdrop", true)
          .single();

        if (dropError) {
          throw dropError;
        }

        if (!dropData) {
          setError("Drop not found");
          return;
        }

        // Transform Supabase data to match our Drop interface
        const status = getDropStatus(dropData.dropdate);
        const transformedDrop: Drop = {
          id: dropData.id,
          title: dropData.name,
          image: dropData.image_url || "/placeholder.svg",
          status,
          price: dropData.price,
        };

        // Add startDate for coming-soon drops or endDate for live drops
        if (dropData.dropdate) {
          const dropDateTime = new Date(dropData.dropdate);
          if (status === "coming-soon") {
            transformedDrop.startDate = dropDateTime;
          } else if (status === "live") {
            // For live drops, set end date to 7 days after the drop date
            transformedDrop.endDate = new Date(
              dropDateTime.getTime() + 7 * 24 * 60 * 60 * 1000
            );
          }
        }

        setDrop(transformedDrop);

        // Fetch related products (non-drop products as recommendations)
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("*")
          .eq("store_id", import.meta.env.VITE_STORE_ID || "")
          .eq("isdrop", false)
          .order("created_at", { ascending: false })
          .limit(3); // Limit to 3 related products

        if (productsError) {
          console.error("Error fetching related products:", productsError);
        } else {
          // Transform products data
          const transformedProducts: Product[] = (
            productsData as Tables<"products">[]
          ).map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image_url || "/placeholder.svg",
            description: product.description || "",
            isNew: false,
            category: "Clothing",
          }));

          setRelatedProducts(transformedProducts);
        }
      } catch (err) {
        console.error("Error fetching drop:", err);
        setError("Failed to load drop");
      } finally {
        setLoading(false);
      }
    };

    fetchDrop();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !drop) {
    return (
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {error || "Drop not found"}
            </h2>
            <p className="text-gray-600">
              The drop you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isLive = drop.status === "live";
  const isComingSoon = drop.status === "coming-soon";
  const isEnded = drop.status === "ended";

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Drop Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {drop.title}
          </h2>
          <div className="flex items-center space-x-4 text-gray-500 mb-2">
            {isLive && (
              <>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Ends in:</span>
                  <CountdownTimer targetDate={drop.endDate as Date} />
                </div>
              </>
            )}
            {isComingSoon && (
              <>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Releasing in:</span>
                  {drop.startDate && (
                    <CountdownTimer targetDate={drop.startDate} />
                  )}
                </div>
              </>
            )}
            {isEnded && (
              <div className="text-red-500">
                <Star className="w-4 h-4 inline" /> Drop Ended
              </div>
            )}
          </div>
          <p className="text-gray-600">
            {isLive &&
              `Get it before it's gone! This limited edition gaming drop ends soon.`}
            {isComingSoon &&
              `Mark your calendars! This exclusive esports drop is coming soon.`}
            {isEnded && `This gaming drop has ended. Stay tuned for future esports releases!`}
          </p>
        </div>

        {/* Drop Image */}
        <div className="mb-8">
          <img
            src={drop.image}
            alt={drop.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Related Products Section */}        {relatedProducts.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Related Products
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropCampaignPage;
