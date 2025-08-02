"use client"

import { useState, useEffect, use } from "react";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Product } from "../page";
import Image from "next/image";
import { useCart } from "@/contexts/cartContext"; 

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);

    const [detailProduct, setDetailProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (!slug) return;

                const { data: product, error } = await supabase
                .from('products')
                .select<'*', Product>('*')
                .eq('slug', slug)
                .single()
                if(error || !product) {
                    notFound();
                } else {
                    setDetailProduct(product);
                }
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [slug]);

    const { cart, handleQuantityChange, totalItems } = useCart();

    if(loading){
        return <p className="mt-16">Loading gan...</p>
    }
    
    if(!detailProduct){
        return notFound();
    }

    const quantity = cart[detailProduct.id] || 0;

    // const [cart, setCart] = useState<Record<number, number>>();

    // useEffect(() => {
    //     const savedCart = localStorage.getItem("linkcookie-cart");
    //     if (savedCart) {
    //         setCart(JSON.parse(savedCart));
    //     }
    // }, [])

    // useEffect(() => {
    //     if (Object.keys())
    // })

    // const quantity = cart[detailProduct.id] || 0;

    return(
        <section className="bg-white mt-16 md:mt-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16">
                    
                    <div className="relative aspect-[5/4]">
                        <Image
                            src={detailProduct.image_url}
                            alt={detailProduct.name}
                            fill
                            className="w-full h-full object-contain rounded-lg shadow-sm rounded-xl"
                        />
                    </div>

                    <div className="mt-8 md:mt-0">
                        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
                            {detailProduct.name}
                        </h1>
                        <p className="mt-2 md:mt-6 text-xl md:text-2xl font-bold text-zinc-900">
                            Rp {detailProduct.price.toLocaleString('id-ID')}
                        </p>
                        <p className="mt-2 md:mt-4 text-sm md:text-lg text-zinc-600">
                            {detailProduct.description}
                        </p>

                        <div className="mt-8">
                            <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleQuantityChange(detailProduct.id, -1)} 
                          disabled={quantity === 0}
                          className="w-12 h-12 rounded-md bg-zinc-200 text-lg font-bold disabled:opacity-50"
                        >-</button>
                        <span className="w-12 text-center font-bold text-xl">{quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(detailProduct.id, 1)} 
                          className="w-12 h-12 rounded-md bg-zinc-800 text-white text-lg font-bold"
                        >+</button>
                      </div>
                        </div>
                    </div>

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
        </section>
    )
}