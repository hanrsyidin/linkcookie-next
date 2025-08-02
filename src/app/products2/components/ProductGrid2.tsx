"use client"

import { useEffect, useMemo, useState } from 'react';
import type {Product} from '../page';
import Link from 'next/link';
import Image from 'next/image'
import { json } from 'stream/consumers';

interface ProductGridProps2{
    products: Product[];
}

export default function ProductGrid2({products} : ProductGridProps2){
    const groupedProducts = useMemo(() => {
        return products.reduce((acc, product) => {
            const category = product.category || "Other Category";
            if (!acc[category]){
                acc[category] = [];
            }
            acc[category].push(product);
            return acc;
        }, {} as Record<string, Product[]>)
    }, [products]);

    const[cart, setCart] = useState<Record<number, number>>({});

    useEffect(() => {
        const savedCart = localStorage.getItem('linkcookie-cart');
    if (savedCart) {
        setCart(JSON.parse(savedCart));
    }
    }, []);

    useEffect(() => {
        if(Object.keys(cart).length > 0) {
            localStorage.setItem('linkcookie-cart', JSON.stringify(cart))
        }
        else {
            localStorage.removeItem('linkcookie-cart')
        }
    }, [cart]);

    const handleQuantityChange = (productId: number, amount: number) => {
        setCart(prevCart => {
            const currentQuantity = prevCart[productId] || 0;
            const newQuantity = Math.max(0, currentQuantity + amount);
            const newCart = { ...prevCart};
            if (newQuantity === 0) {
                delete newCart[productId];
            } else {
                newCart[productId] = newQuantity;
            }
          return newCart;
        })
    }

    const totalItems = useMemo(() => {
        return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
    }, [cart])

    return<>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
            <div className='space-y-16'>
                {Object.keys(groupedProducts).map((category) => (
                <section key={category}>
                    <h2 className='text-3xl font-bold text-zinc-900 mb-8'>
                        {category}
                    </h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {groupedProducts[category].map((product) => {
                            const quantity = cart[product.id] || 0; 
                            return (
                                <div key={product.id} className='group flex flex-col justify-between border border-zinc-200 rounded-lg overflow-hidden shadow-sm'>
                                    <Link
                                        href={`/products/${product.slug}`}
                                        className='block'
                                    >
                                        <div className='relative w-full aspect-square overflow-hidden'>
                                            <Image
                                                src={product.image_url}
                                                alt={product.name}
                                                fill
                                                className="h-full w-full object-cover ovject-center group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-zinc-900 truncate">
                                              {product.name}
                                            </h3>
                                            {/* <p className="mt-2 text-md font-bold text-zinc-900">
                                              Rp {product.price.toLocaleString('id-ID')}
                                            </p> */}
                                        </div>
                                    </Link>

                                    <div className="p-4 pt-0 mt-auto flex justify-between items-center">
                                        <p className="text-md font-bold text-zinc-900">
                                         Rp {product.price.toLocaleString('id-ID')}
                                        </p>

                                        <div className='flex item-center gap-2'>
                                                <button
                                                    onClick={() => handleQuantityChange(product.id, -1)} 
                                                    disabled={quantity === 0}
                                                    className="w-8 h-8 rounded-md bg-zinc-200 text-lg font-bold disabled:opacity-30"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center font-bold">{quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(product.id, +1)}
                                                    disabled={quantity === 99}
                                                    className='w-8 h-8 rounded-md bg-zinc-950 text-lg font-bold disabled:opacity-50 text-white'
                                                >
                                                    +
                                                </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            ))}
            </div>
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
}