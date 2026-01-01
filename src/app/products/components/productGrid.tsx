"use client";

import { useMemo } from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from '@/app/products/page';
// import { useCart } from '@/contexts/cartContext';
import { useEffect, useState } from 'react';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
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

  // const { cart, handleQuantityChange, totalItems} = useCart();

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
      <div className="space-y-16 mt-8 md:mt-0">
        {Object.keys(groupedProducts).map((category) => (
          <section key={category}>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">{category}</h2>

            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-x-6 sm:gap-y-12">
              {groupedProducts[category].map((product, index) => {
                const quantity = cart[product.id] || 0;
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="group flex flex-col justify-between overflow-hidden rounded-lg border border-zinc-200 shadow-sm bg-white"
                  >
                    <Link href={`/products/${product.slug}`} className="block">
                      <div className="relative w-full aspect-square overflow-hidden">
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                      </div>
                      <div className="p-1 md:p-4">
                        <h3 className="text-base md:text-lg font-semibold text-zinc-900">{product.name}</h3>
                        <p className="mt-1 text-sm text-zinc-500 truncate">{product.caption}</p>
                      </div>
                    </Link>

                    <div className="p-1 pb-4 md:p-4 pt-0 mt-auto flex justify-between items-center">
                      <p className="text-sm md:text-xl font-bold text-zinc-900">
                        Rp {product.price.toLocaleString('id-ID')}
                      </p>
                      <div className="flex gap-2">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleQuantityChange(product.id, -1)}
                          disabled={quantity === 0}
                          className="w-6 h-6 md:w-8 md:h-8 rounded-md bg-zinc-200 text-md md:text-xl font-bold disabled:opacity-50 flex items-center justify-center"
                        >-</motion.button>
                        <span className="w-4 h-4 md:w-8 md:h-8 text-center text-md md:text-xl font-bold flex items-center justify-center">{quantity}</span>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className="w-6 h-6 md:w-8 md:h-8 rounded-md bg-zinc-800 text-white text-md md:text-xl font-bold flex items-center justify-center"
                        >+</motion.button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4"
          >
            <div className="container mx-auto">
              <div className="container mx-auto">
                <Link href="/cart" className="block w-full bg-pink-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-pink-600 transition-colors text-lg text-center">
                  Masukkan {totalItems} item ke Keranjang
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}