import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { Product } from "@/data/products";

type CartItem = { product: Product; quantity: number };

export type IslandNotification = {
  product: Product;
  visible: boolean;
};

type CartContextType = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  island: IslandNotification | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [island, setIsland] = useState<IslandNotification | null>(null);

  const addToCart = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsland({ product, visible: true });
    setTimeout(() => setIsland((prev) => prev ? { ...prev, visible: false } : null), 2600);
    setTimeout(() => setIsland(null), 3100);
  }, []);

  const removeFromCart = (productId: number) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) { removeFromCart(productId); return; }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => {
    const p = i.product.discount
      ? i.product.price * (1 - i.product.discount / 100)
      : i.product.price;
    return s + p * i.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{ items, totalItems, totalPrice, island, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
