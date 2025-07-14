import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProductImageGallery from "../product/ProductImageGallery";
import ProductInfo from "../product/ProductInfo";
import RelatedProducts from "../product/RelatedProducts";
import { supabase } from "../../lib/supabase";
import { Tables } from "../../database.types";

type Product = Tables<"products">;

const ProductPage = () => {
  const { id } = useParams();
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Scroll to top when component mounts or product ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Fetch product data from Supabase
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch the specific product
        const { data: productData, error: productError } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (productError) {
          throw productError;
        }

        if (!productData) {
          setError("Product not found");
          return;
        }

        // Transform Supabase product data to match the expected format
        const transformedProduct = {
          id: productData.id,
          name: productData.name,
          price: productData.price,
          originalPrice: productData.price + 7, // Add some markup for "original price"
          description: productData.description || "No description available",
          images: productData.image_url
            ? [productData.image_url]
            : ["/placeholder.svg"],
          colors: [
            {
              name: "Default",
              value: "#3B82F6",
              images: productData.image_url
                ? [productData.image_url]
                : ["/placeholder.svg"],
            },
          ],
          sizes: ["XS", "S", "M", "L", "XL"],
          inStock: (productData.inventory ?? 0) > 0,
          features: [
            "100% Organic Cotton",
            "Machine Washable",
            "Unisex Fit",
            "Printed in USA",
          ],
          inventory: productData.inventory,
        };

        setProduct(transformedProduct);

        // Fetch related products (other products from the same store or random products)
        const { data: relatedData, error: relatedError } = await supabase
          .from("products")
          .select("*")
          .neq("id", id)
          .limit(3);

        if (!relatedError && relatedData) {
          const transformedRelated = relatedData.map((item, index) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image_url || "/placeholder.svg",
            isNew: index === 0, // Mark the first one as new
          }));
          setRelatedProducts(transformedRelated);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleColorChange = (color: {
    name: string;
    value: string;
    images: string[];
  }) => {
    setCurrentImages(color.images);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            {error || "The product you are looking for does not exist."}
          </p>
          <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  const displayImages =
    currentImages.length > 0 ? currentImages : product.images;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link
            to="/"
            className="hover:text-gray-700 flex items-center space-x-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to shop</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductImageGallery
            images={displayImages}
            productName={product.name}
          />
          <ProductInfo product={product} onColorChange={handleColorChange} />
        </div>

        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
};

export default ProductPage;
