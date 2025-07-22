import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Calendar, CheckCircle, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../hooks/use-toast";
import { supabase } from "../../lib/supabase";
import { Database } from "../../database.types";

type TrackOrder = Database["public"]["Tables"]["track_orders"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];

interface OrderWithProduct extends TrackOrder {
  products: Product;
}

const OrdersPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderWithProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect to sign in if not authenticated
  if (!authLoading && !user) {
    navigate("/signin", {
      state: { from: { pathname: "/account/orders" } },
    });
    return null;
  }

  useEffect(() => {
    if (user?.id) {
      fetchOrders();
    }
  }, [user?.id]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      console.log("Fetching orders for user:", user!.id);
      const { data, error } = await supabase
        .from("track_orders")
        .select(
          `
          *,
          products (
            id,
            name,
            price,
            image_url,
            description
          )
        `
        )
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });

      console.log("");

      if (error) {
        throw error;
      }

      setOrders(data as OrderWithProduct[]);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast({
        title: "Error loading orders",
        description: "Failed to load your order history. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  // Show loading state
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/account"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Account
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Order History
              </h1>
              <p className="mt-2 text-gray-600">
                Track and view your completed orders
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Package className="w-4 h-4" />
              <span>{orders.length} completed orders</span>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No completed orders yet
            </h3>
            <p className="text-gray-500 mb-6">
              When you place orders, they'll appear here once completed.
            </p>
            <Link to="/products">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Order #{order.id.slice(-8).toUpperCase()}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {order.created_at && formatDate(order.created_at)}
                          </div>
                          <Badge
                            className={getStatusColor(order.status)}
                            variant="secondary"
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Information */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    {order.products.image_url && (
                      <img
                        src={order.products.image_url}
                        alt={order.products.name}
                        className="w-16 h-16 object-cover rounded-md bg-white border border-gray-200"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {order.products.name}
                      </h4>
                      {order.products.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {order.products.description}
                        </p>
                      )}
                      <div className="mt-2">
                        <span className="text-lg font-semibold text-gray-900">
                          {formatPrice(order.products.price)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      {order.updated_at && (
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Last updated: {formatDate(order.updated_at)}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-3">
                      <Link to={`/product/${order.product_id}`}>
                        <Button variant="outline" size="sm">
                          View Product
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
