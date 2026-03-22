"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

type CartItem = {
  product: string;
  name: string;
  image: string;
  price: number;
  qty: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  // Load from local or backend on mount/auth change
  useEffect(() => {
    if (user && user.token) {
      fetch("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.cartItems) setCartItems(data.cartItems);
      })
      .catch(console.error);
    } else {
      const localCart = localStorage.getItem("cartItems");
      if (localCart) setCartItems(JSON.parse(localCart));
      else setCartItems([]);
    }
  }, [user]);

  // Sync to backend or local on change
  const syncCart = async (newCart: Omit<CartItem, "id">[]) => {
    setCartItems(newCart);
    if (user && user.token) {
      await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ cartItems: newCart })
      });
    } else {
      localStorage.setItem("cartItems", JSON.stringify(newCart));
    }
  };

  const addToCart = (item: CartItem) => {
    const existItem = cartItems.find((x) => x.product === item.product);
    if (existItem) {
      syncCart(cartItems.map((x) => x.product === existItem.product ? item : x));
    } else {
      syncCart([...cartItems, item]);
    }
  };

  const removeFromCart = (id: string) => {
    syncCart(cartItems.filter((x) => x.product !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
