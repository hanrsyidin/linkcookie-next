"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Andira S.',
    quote: 'Cookie Cake-nya jadi pusat perhatian di ulang tahun anak saya! Rasanya enak banget, lembut, dan semua tamu suka. Jauh lebih seru dari kue tart biasa.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Bima P.',
    quote: 'Sebagai pecinta soft cookies, Marshmallow Cookies dari Linkcookie ini juaranya. Teksturnya pas, kenyal dan lumer. Nagih banget!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Clara W.',
    quote: 'Pesan Brookie untuk teman kantor dan langsung ludes. Perpaduan brownie dan cookie-nya unik dan sangat memanjakan lidah. Recommended!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Dion F.',
    quote: 'Kualitas bahan-bahannya benar-benar terasa. Nggak terlalu manis, pas di lidah. Pengirimannya juga cepat dan packaging-nya aman.',
    rating: 5,
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(rating)].map((_, i) => (
        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current: el } = scrollContainerRef;
      const scrollAmount = 300;

      if (direction === 'left') {
        if (el.scrollLeft === 0) {
          el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      } else {
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <section id="testimonials" className="bg-gradient-to-b from-pink-50 from-10% to-white to-50% py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-12">
          <div className="text-center sm:text-left">
            <h2 className="text-xl md:text-2xl text-base font-semibold leading-7 text-pink-600">Our Testimonials</h2>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-600">
              Ulasan tulus dari para pencinta Linkcookie.
            </p>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -left-5 z-10 hidden md:block">
            <button onClick={() => handleScroll('left')} aria-label="Scroll left" className="w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-zinc-600 hover:bg-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
          </div>
        </div>

        <div ref={scrollContainerRef} className="flex overflow-x-auto space-x-8 pb-4 scrollbar-hide">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-80 sm:w-96 bg-white p-8 rounded-lg shadow-lg"
            >
              <p className="mb-2 font-bold text-zinc-900 text-left">- {testimonial.name}</p>
              <StarRating rating={testimonial.rating} />
              <blockquote className="mt-2 text-zinc-800 text-lg italic before:content-['“'] after:content-['”']">
                {testimonial.quote}
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}