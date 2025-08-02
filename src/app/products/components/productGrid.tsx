"use client";

import { useState, useMemo, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import type { Product } from '@/app/products/page';
import { useCart } from '@/contexts/cartContext';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  // const [cart, setCart] = useState<Record<number, number>>({});

  // useEffect(() => {
  //   const savedCart = localStorage.getItem('linkcookie-cart');
  //   if (savedCart) {
  //     setCart(JSON.parse(savedCart));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (Object.keys(cart).length > 0) {
  //     localStorage.setItem('linkcookie-cart', JSON.stringify(cart));
  //   } else {
  //     localStorage.removeItem('linkcookie-cart');
  //   }
  // }, [cart]);

  // const handleQuantityChange = (productId: number, amount: number) => {
  //   setCart(prevCart => {
  //     const currentQuantity = prevCart[productId] || 0;
  //     const newQuantity = Math.max(0, currentQuantity + amount);
  //     const newCart = { ...prevCart };

  //     if (newQuantity === 0) {
  //       delete newCart[productId];
  //     } else {
  //       newCart[productId] = newQuantity;
  //     }
      
  //     return newCart;
  //   });
  // };

  // const totalItems = useMemo(() => {
  //   return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  // }, [cart]);

  const { cart, handleQuantityChange, totalItems} = useCart();

  const groupedProducts = useMemo(() => {
    return products.reduce((acc, product) => {
      const category = product.category || 'Other Cookies';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  }, [products]);


  return (
    <>
      <div className="space-y-16">
        {Object.keys(groupedProducts).map((category) => (
          <section key={category}>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">{category}</h2>
            
            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-x-6 lg:gap-x-8">
              {groupedProducts[category].map((product) => {
                const quantity = cart[product.id] || 0;
                return (
                  <div key={product.id} className="group flex flex-col justify-between overflow-hidden rounded-lg border border-zinc-200 shadow-sm">
                    <Link href={`/products/${product.slug}`} className="block">
                      <div className="relative w-full h-64 sm:h-72">
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-zinc-900">{product.name}</h3>
                        <p className="mt-1 text-sm text-zinc-500 truncate">{product.caption}</p>
                      </div>
                    </Link>
                    
                    <div className="p-4 pt-0 mt-auto flex justify-between items-center">
                      <p className="text-md font-bold text-zinc-900">
                        Rp {product.price.toLocaleString('id-ID')}
                      </p>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleQuantityChange(product.id, -1)} 
                          disabled={quantity === 0}
                          className="w-8 h-8 rounded-md bg-zinc-200 text-lg font-bold disabled:opacity-50"
                        >-</button>
                        <span className="w-8 text-center font-bold">{quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(product.id, 1)} 
                          className="w-8 h-8 rounded-md bg-zinc-800 text-white text-lg font-bold"
                        >+</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
            <div className="container mx-auto">
                 <button className="w-full bg-pink-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-pink-600 transition-colors text-lg">
                    Masukkan {totalItems} item ke Keranjang
                </button>
            </div>
        </div>
      )}
    </>
  );
}