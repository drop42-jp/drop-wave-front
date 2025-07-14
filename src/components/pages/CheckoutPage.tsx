import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../hooks/use-toast";

interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  createAccount?: boolean;
  password?: string;
}

interface StripeCheckoutRequest {
  lineItems: Array<{
    priceData: {
      currency: string;
      productData: {
        name: string;
        description?: string;
        images?: string[];
      };
      unitAmount: number;
    };
  }>;
  mode: string;
  successUrl: string;
  cancelUrl: string;
  customerEmail: string;
  metadata: Record<string, string>;
  automaticTax: {
    enabled: boolean;
  };
  taxIdCollection: {
    enabled: boolean;
  };
  shippingAddressCollection: {
    allowedCountries: string[];
  };
}

interface StripeCheckoutResponse {
  success: boolean;
  message: string;
  responseObject: {
    id: string;
    url: string;
    created: number;
    expires_at: number;
    livemode: boolean;
    mode: string;
    status: string;
  };
  statusCode: number;
}

const CheckoutPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAccountCreation, setShowAccountCreation] = useState(false);
  const { items, getTotalPrice, loading: cartLoading, cartId } = useCart();
  const { user, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<CheckoutForm>();

  const isAuthenticated = !!user;

  const shippingCost = getTotalPrice() > 50 ? 0 : 8.99;
  const totalWithShipping = getTotalPrice() + shippingCost;

  const onSubmit = async (data: CheckoutForm) => {
    setIsLoading(true);

    try {
      // Ensure user is either authenticated or creates a guest account
      if (!isAuthenticated) {
        if (!showAccountCreation || !data.password) {
          toast({
            title: "Authentication required",
            description:
              "Please sign in or create an account to proceed with checkout",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        // Create new account if user chose to do so
        const { user: newUser, error: signUpError } = await signUp(
          data.email,
          data.password,
          data.firstName,
          data.lastName
        );

        if (signUpError) {
          toast({
            title: "Failed to create account",
            description: signUpError.message,
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        // Wait a moment for the auth state to update
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // If we get here and still no user, something went wrong
      if (!user && !showAccountCreation) {
        toast({
          title: "Authentication required",
          description:
            "Please sign in or create an account to proceed with checkout",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Create Stripe checkout session
      const checkoutRequest: StripeCheckoutRequest = {
        lineItems: items.map((item) => ({
          priceData: {
            currency: "usd",
            productData: {
              name: item.name,
              description: `Size: ${item.size}${
                item.color ? `, Color: ${item.color}` : ""
              }`,
              images: [item.image],
            },
            unitAmount: Math.round(item.price * 100), // Convert to cents
          },
        })),
        mode: "payment",
        successUrl: `${window.location.origin}/checkout-success`,
        cancelUrl: `${window.location.origin}/cart`,
        customerEmail: data.email,
        metadata: {
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country,
          userId: user?.id || "",
          cartId: cartId || "",
          productIds: items.map((item) => item.product_id).join(","),
          shippingCost: shippingCost.toString(),
          totalAmount: totalWithShipping.toString(),
        },
        automaticTax: {
          enabled: true,
        },
        taxIdCollection: {
          enabled: true,
        },
        shippingAddressCollection: {
          allowedCountries: ["US", "CA", "GB"], // Add more countries as needed
        },
      };

      const response = await fetch(
        "https://api.drop42.jtpk.app/stripe/checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(checkoutRequest),
        }
      );

      const checkoutSession: StripeCheckoutResponse = await response.json();

      if (!checkoutSession.success) {
        throw new Error(
          checkoutSession.message || "Failed to create checkout session"
        );
      }

      // Redirect to Stripe checkout
      window.location.href = checkoutSession.responseObject.url;
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description:
          error instanceof Error
            ? error.message
            : "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <Link to="/products" className="text-black hover:underline">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/cart"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to cart</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Checkout
              </h1>

              {!isAuthenticated && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Already have an account?{" "}
                    <Link to="/signin" className="font-medium hover:underline">
                      Sign in
                    </Link>{" "}
                    for faster checkout
                  </p>
                </div>
              )}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Contact Information */}
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Contact Information
                    </h2>
                    <FormField
                      control={form.control}
                      name="email"
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Please enter a valid email",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Shipping Information */}
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Shipping Information
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        rules={{ required: "First name is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                              <Input placeholder="First name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        rules={{ required: "Last name is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                              <Input placeholder="Last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="address"
                        rules={{ required: "Address is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Street address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          rules={{ required: "City is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="City" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="state"
                          rules={{ required: "State is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input placeholder="State" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="zipCode"
                          rules={{ required: "ZIP code is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP code</FormLabel>
                              <FormControl>
                                <Input placeholder="ZIP code" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="country"
                          rules={{ required: "Country is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Country"
                                  defaultValue="United States"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Account Creation Option for Guests */}
                  {!isAuthenticated && (
                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <input
                          type="checkbox"
                          id="createAccount"
                          checked={showAccountCreation}
                          onChange={(e) =>
                            setShowAccountCreation(e.target.checked)
                          }
                          className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                        />
                        <label
                          htmlFor="createAccount"
                          className="text-sm text-gray-700"
                        >
                          Create an account to save your information for faster
                          checkout next time
                        </label>
                      </div>

                      {showAccountCreation && (
                        <FormField
                          control={form.control}
                          name="password"
                          rules={{
                            required: showAccountCreation
                              ? "Password is required"
                              : false,
                            minLength: {
                              value: 6,
                              message: "Password must be at least 6 characters",
                            },
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Create password</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="Create a password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2"
                    disabled={isLoading}
                  >
                    <Lock className="w-4 h-4" />
                    <span>
                      {isLoading ? "Processing..." : "Complete Order"}
                    </span>
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex space-x-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {item.name}
                      </h3>
                      {item.size && (
                        <p className="text-sm text-gray-600">
                          Size: {item.size}
                        </p>
                      )}
                      {item.color && (
                        <p className="text-sm text-gray-600">
                          Color: {item.color}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {shippingCost === 0
                      ? "Free"
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between text-lg font-medium">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">
                      ${totalWithShipping.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {getTotalPrice() < 50 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Add ${(50 - getTotalPrice()).toFixed(2)} more for free
                    shipping!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
