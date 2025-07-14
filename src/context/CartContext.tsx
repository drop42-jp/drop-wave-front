import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "../lib/supabase";
import { Tables } from "../database.types";
import { useAuth } from "./AuthContext";

type Cart = Tables<"carts">;
type CartItemDB = Tables<"cart_items">;
type Product = Tables<"products">;

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
  product_id: string;
  cart_item_id?: string; // To track the database record
}

interface AddedToBagState {
  isVisible: boolean;
  itemName: string;
}

interface CartContextType {
  items: CartItem[];
  addedToBag: AddedToBagState;
  loading: boolean;
  cartId: string | null;
  addItem: (item: Omit<CartItem, "quantity" | "cart_item_id">) => Promise<void>;
  removeItem: (id: string, size?: string, color?: string) => Promise<void>;
  updateQuantity: (
    id: string,
    quantity: number,
    size?: string,
    color?: string
  ) => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearCart: () => Promise<void>;
  hideAddedToBag: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartId, setCartId] = useState<string | null>(null);
  const [addedToBag, setAddedToBag] = useState<AddedToBagState>({
    isVisible: false,
    itemName: "",
  });
  const { user } = useAuth();

  // Get or create cart on component mount
  useEffect(() => {
    initializeCart();
  }, [user]); // Re-initialize cart when user changes

  const getSessionId = () => {
    let sessionId = localStorage.getItem("cart_session_id");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("cart_session_id", sessionId);
    }
    return sessionId;
  };

  const initializeCart = async () => {
    try {
      setLoading(true);
      const sessionId = getSessionId();

      // Try to find existing cart by session_id or customer_id if user is logged in
      let { data: existingCart, error: cartError } = await supabase
        .from("carts")
        .select("*")
        .or(
          `session_id.eq.${sessionId}${
            user ? `,customer_id.eq.${user.id}` : ""
          }`
        )
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (cartError && cartError.code !== "PGRST116") {
        // PGRST116 = no rows returned
        throw cartError;
      }

      // If no cart exists, create one
      if (!existingCart) {
        const { data: newCart, error: createError } = await supabase
          .from("carts")
          .insert([
            {
              session_id: sessionId,
              customer_id: user?.id || null,
            },
          ])
          .select()
          .single();

        if (createError) throw createError;
        existingCart = newCart;
      } else if (user && !existingCart.customer_id) {
        // If user is logged in and cart doesn't have customer_id, update it
        const { error: updateError } = await supabase
          .from("carts")
          .update({ customer_id: user.id })
          .eq("id", existingCart.id);

        if (updateError) throw updateError;
        existingCart.customer_id = user.id;
      }

      setCartId(existingCart.id);

      // Load cart items
      await loadCartItems(existingCart.id);
    } catch (error) {
      console.error("Error initializing cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCartItems = async (cartId: string) => {
    try {
      const { data: cartItems, error } = await supabase
        .from("cart_items")
        .select(
          `
          *,
          products (
            id,
            name,
            price,
            image_url
          )
        `
        )
        .eq("cart_id", cartId);

      if (error) throw error;

      const transformedItems: CartItem[] =
        cartItems?.map((item) => ({
          id: item.product_id || "",
          product_id: item.product_id || "",
          cart_item_id: item.id,
          name: (item.products as any)?.name || "Unknown Product",
          price: (item.products as any)?.price || 0,
          image: (item.products as any)?.image_url || "/placeholder.svg",
          quantity: item.quantity,
          size: "M", // Default values since we don't store these in DB yet
          color: "Default",
        })) || [];

      setItems(transformedItems);
    } catch (error) {
      console.error("Error loading cart items:", error);
    }
  };

  const addItem = async (
    newItem: Omit<CartItem, "quantity" | "cart_item_id">
  ) => {
    if (!cartId) return;

    try {
      // Check if item already exists in cart
      const existingItemIndex = items.findIndex(
        (item) =>
          item.product_id === newItem.product_id &&
          item.size === newItem.size &&
          item.color === newItem.color
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const existingItem = items[existingItemIndex];
        await updateQuantity(
          existingItem.id,
          existingItem.quantity + 1,
          existingItem.size,
          existingItem.color
        );
      } else {
        // Add new item to database
        const { data: cartItem, error } = await supabase
          .from("cart_items")
          .insert([
            {
              cart_id: cartId,
              product_id: newItem.product_id,
              quantity: 1,
            },
          ])
          .select()
          .single();

        if (error) throw error;

        // Add to local state
        const newCartItem: CartItem = {
          ...newItem,
          quantity: 1,
          cart_item_id: cartItem.id,
        };

        setItems((prev) => [...prev, newCartItem]);
      }

      // Show the added to bag overlay
      setAddedToBag({
        isVisible: true,
        itemName: newItem.name,
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeItem = async (id: string, size?: string, color?: string) => {
    try {
      const itemToRemove = items.find(
        (item) => item.id === id && item.size === size && item.color === color
      );

      if (!itemToRemove?.cart_item_id) return;

      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemToRemove.cart_item_id);

      if (error) throw error;

      // Update local state
      setItems((prev) =>
        prev.filter(
          (item) =>
            !(item.id === id && item.size === size && item.color === color)
        )
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const updateQuantity = async (
    id: string,
    quantity: number,
    size?: string,
    color?: string
  ) => {
    if (quantity <= 0) {
      await removeItem(id, size, color);
      return;
    }

    try {
      const itemToUpdate = items.find(
        (item) => item.id === id && item.size === size && item.color === color
      );

      if (!itemToUpdate?.cart_item_id) return;

      const { error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("id", itemToUpdate.cart_item_id);

      if (error) throw error;

      // Update local state
      setItems((prev) =>
        prev.map((item) =>
          item.id === id && item.size === size && item.color === color
            ? { ...item, quantity }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const getTotalItems = () =>
    items.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  const clearCart = async () => {
    if (!cartId) return;

    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("cart_id", cartId);

      if (error) throw error;

      setItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const hideAddedToBag = () => {
    setAddedToBag({
      isVisible: false,
      itemName: "",
    });
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addedToBag,
        loading,
        cartId,
        addItem,
        removeItem,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
        clearCart,
        hideAddedToBag,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
