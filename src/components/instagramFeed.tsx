"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

// --- DATA DUMMY ---
const instagramPosts = [
  { id: 1, imageSrc: '/AsetImage/page1Konten1Foto1.jpg', alt: 'Post Instagram 1' },
  { id: 2, imageSrc: '/AsetImage/page1Konten1Foto2.jpg', alt: 'Post Instagram 2' },
  { id: 3, imageSrc: '/AsetImage/page1Konten1Foto3.jpg', alt: 'Post Instagram 3' },
  { id: 4, imageSrc: '/AsetImage/page1Konten1Foto4.jpg', alt: 'Post Instagram 4' },
  { id: 5, imageSrc: '/AsetImage/page1Konten1Foto5.jpg', alt: 'Post Instagram 5' },
  { id: 6, imageSrc: '/AsetImage/page1Konten1Foto6.jpg', alt: 'Post Instagram 6' },
];
// --------------------

export default function InstagramFeed() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 👇 FUNGSI SCROLL DIPERBARUI DENGAN LOGIKA LOOPING 👇
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current: el } = scrollContainerRef;
      const scrollAmount = 300;

      if (direction === 'left') {
        // Jika sudah di paling kiri, pindah ke paling kanan
        if (el.scrollLeft === 0) {
          el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      } else {
        // Jika sudah di paling kanan, pindah ke paling kiri
        // Kita beri toleransi 1px untuk pembulatan
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <section id="instagram-feed" className="bg-white py-16 sm:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div className='text-center sm:text-left'>
            <p className="text-xl md:text-2xl font-semibold text-pink-500">#LinkcookieMoments</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900 flex items-center gap-3">
              <FaInstagram className='hidden md:block' />
              Stay in the loop on Instagram
            </h2>
          </div>
          <div className="flex-shrink-0">
            <Link href="https://instagram.com/linkcookie.id" target="_blank" className="no-underline">
              <button className="border border-zinc-300 text-zinc-700 font-semibold py-2 px-4 rounded-full hover:bg-zinc-200 transition-colors duration-300 flex items-center gap-2 text-sm">
                <span>Follow @linkcookie.id</span>
                <FaInstagram />
              </button>
            </Link>
          </div>
        </div>

        <div className="relative">
          {/* Tombol Panah (sekarang ada kiri dan kanan) */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-5 z-10 hidden md:block">
            <button onClick={() => handleScroll('left')} aria-label="Scroll left" className="w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-zinc-600 hover:bg-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-5 z-10 hidden md:block">
            <button onClick={() => handleScroll('right')} aria-label="Scroll right" className="w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-zinc-600 hover:bg-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
          </div>

          <div ref={scrollContainerRef} className="flex overflow-x-auto space-x-4 sm:space-x-6 pb-4 scrollbar-hide">
            {instagramPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 w-60 sm:w-72 aspect-square bg-zinc-200 rounded-xl overflow-hidden"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={post.imageSrc}
                    alt={post.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}