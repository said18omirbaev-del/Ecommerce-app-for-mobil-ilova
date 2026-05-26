import { createContext, ReactNode, useContext, useState } from "react";

type Product = {
  id: number | string;
  name: string;
  price: number;
  image: string;
};

type CartItem = Product & { quantity: number };

type Order = {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
};

type CartContextType = {
  cart: CartItem[];
  orders: Order[];
  wishlist: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number | string) => void;
  checkout: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number | string) => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number | string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const checkout = () => {
    if (cart.length === 0) return;
    const newOrder: Order = {
      id: Date.now().toString(),
      items: cart,
      total: cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
      date: new Date().toLocaleDateString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
  };

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id: number | string) => {
    setWishlist((prev) => prev.filter((i) => i.id !== id));
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        wishlist,
        addToCart,
        removeFromCart,
        checkout,
        addToWishlist,
        removeFromWishlist,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
