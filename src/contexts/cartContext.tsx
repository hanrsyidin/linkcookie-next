"use client";

import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';

// Definisi bentuk data
interface CartContextType {
  cart: Record<number, number>;
  handleQuantityChange: (productId: number, amount: number) => void;
  totalItems: number;
}

// Buat Context
const CartContext = createContext<CartContextType | undefined>(undefined);

//  Provider (komponen yang akan menyimpan semua logika)
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Record<number, number>>({});

  useEffect(() => {
    const savedCart = localStorage.getItem('linkcookie-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      localStorage.setItem('linkcookie-cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('linkcookie-cart');
    }
  }, [cart]);

  const handleQuantityChange = (productId: number, amount: number) => {
    setCart(prevCart => {
      const currentQuantity = prevCart[productId] || 0;
      const newQuantity = Math.max(0, currentQuantity + amount);
      const newCart = { ...prevCart };

      if (newQuantity === 0) {
        delete newCart[productId];
      } else {
        newCart[productId] = newQuantity;
      }
      
      return newCart;
    });
  };

  const totalItems = useMemo(() => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  }, [cart]);

  // Data yang akan dibagikan
  const value = {
    cart,
    handleQuantityChange,
    totalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom Hook untuk mempermudah penggunaan context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}