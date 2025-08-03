'use client'

import { useCart } from "@/contexts/cartContext";
import { useEffect, useMemo, useState } from "react";
import { Product } from "../products/page";
import { supabase } from "@/lib/supabase";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import ConfirmationModal from "./components/confirmationModal";

export default function Cart() {
    const {cart, handleQuantityChange, clearCart, totalItems} = useCart();
    const [detailedCartItems, setDetailedCartItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if(!cart) return;
        const fetchProduct = async () => {
            const arrayIdProduct = Object.keys(cart);
            if (arrayIdProduct.length === 0) {
                setLoading(false);
                setDetailedCartItems([]);
                return;
            }
             try{
                const {data: products, error} = await supabase
                .from('products')
                .select<'*', Product>('*')
                .in('id', arrayIdProduct)
                if(error || !products) {
                    notFound();
                } 
                else if (products) {
                    setDetailedCartItems(products);
                }
             }
             finally{
                setLoading(false);
            }
        }
        fetchProduct();
    }, [cart]);

    const subtotal = useMemo(() => {
        return detailedCartItems.reduce((acc, item) => {
            const quantity = cart[item.id] || 0;
            return acc + (item.price * quantity);
        }, 0)
    }, [detailedCartItems, cart]);

    const handleCheckOut = () => {
        const phoneNumber = '6289658963055';

        const orderItems = detailedCartItems.map(item => {
            const quantity = cart[item.id];
            return `- ${item.name} (x${quantity})`
        }).join('\n');

        const message = `
        Halo Linkcookie, saya mau pesan:
        
        ${orderItems}
        
        *subtotal: Rp ${subtotal.toLocaleString('id-ID')}*
        
        Terima kasih!
            `.trim();
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            window.location.href = whatsappUrl;
    }

    const handleBeforeCheckOut = () => {
        // const confirmation = window.confirm('Anda akan diarahkan ke WhatsApp untuk menyelesaikan pesanan. Keranjang Anda akan dikosongkan setelah ini. Lanjutkan?');
        // if (confirmation) {
            handleCheckOut();
            clearCart();
            setIsModalOpen(false);
        // }
        
    };

    if (loading){
        return (
            <p className="mt-18">Loading gan...</p>
        )
    }

    if (Object.keys(cart).length <= 0) {
        redirect('/');

        // return(
        //     <section className="py-16 sm:py-24 mt-10 md:mt-16 bg-white">
        //         <div className="container mx-auto px-4 sm:px-6 lg:px-8 items-center justify-center text-center">
        //             <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl">Anda belum memilih salah satu produk manapun!</h1>
        //         </div>
        //     </section>
        // )
    }

    return(
        <>
            <section className="bg-white py-16 sm:py-24 mt-10 md:mt-4">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl">Shopping Cart</h1>

                    <div className="mt-4">
                        {detailedCartItems.map((item) => (
                            <div key={item.id} className="flex items-center border-b py-4">
                                <Image src={item.image_url} alt={item.name} width={80} height={80} className="rounded-md" />
                                <div className="ml-4 flex-grow">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-zinz-600">Rp {item.price.toLocaleString('id-ID')}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => handleQuantityChange(item.id, -1)} className="w-8 h-8 rounded-md bg-zinc-200 font-bold">-</button>
                                    <span>{cart[item.id]}</span>
                                    <button onClick={() => handleQuantityChange(item.id, 1)} className="w-8 h-8 rounded-md bg-zinc-800 text-white font-bold">+</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-right">
                        <h2 className="text-xl">Total Items: {totalItems}</h2>
                        <h2 className="text-xl">Subtotal: Rp {subtotal.toLocaleString('id-ID')}</h2>
                        <button onClick={() => setIsModalOpen(true)} className="mt-4 bg-pink-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-pink-600">
                            Proceed to WhatsApp
                        </button>
                    </div>
                </div>
            </section>

            <ConfirmationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleBeforeCheckOut}
            title="Konfirmasi Pesanan!"
            message="Anda akan diarahkan ke WhatsApp untuk menyelesaikan pesanan. Keranjang Anda akan dikosongkan setelah ini. Lanjutkan?"
            />
        </>

    )
}