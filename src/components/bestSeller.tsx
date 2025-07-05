"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionTitle from './sectionTitle';

// --- DATA ---
const bestSellerProducts = [
  {
    id: 1,
    preTitle: '✦ Our Best Seller',
    title: 'Marshmallow Cookies',
    description: "Siap untuk merasakan sensasi s'mores dalam sebuah cookie? Marshmallow Cookies kami adalah petualangan tekstur. Kami memadukan adonan soft cookie klasik yang kenyal dengan potongan marshmallow yang meleleh sempurna saat dipanggang, menciptakan kantung-kantung kelembutan yang lengket dan manis. Saat Anda mematahkannya, lelehan marshmallow akan menyambut Anda, berpadu dengan kepingan cokelat premium yang lumer di mulut. Ini adalah nostalgia api unggun dan kebahagiaan masa kecil, dirangkum dalam satu gigitan yang tak terlupakan.",
    imageSrc: '/AsetImage/Foto1BestSeller.png',
    slug: 'marshmallow-cookies',
  },
  {
    id: 2,
    preTitle: '✦ Fan Favorite',
    title: 'Brookie',
    description: 'Mengapa harus memilih antara brownie dan cookie jika Anda bisa mendapatkan keduanya dalam satu gigitan? Perkenalkan Brookie, mahakarya kami yang menyatukan dua dessert favorit dunia. Lapisan bawahnya adalah brownie cokelat yang padat dan super fudgy, menjadi fondasi yang kaya rasa. Di atasnya, kami letakkan adonan soft cookie klasik kami yang kenyal dan bertabur kepingan cokelat melimpah yang lumer saat dipanggang. Perpaduan tekstur yang kontras namun harmonis ini menawarkan pengalaman kemewahan yang tak terlupakan.',
    imageSrc: '/AsetImage/Foto2BestSeller_2.jpg',
    slug: 'red-velvet-softies',
  },
  {
    id: 3,
    preTitle: '✦ Decadent Choice',
    title: 'Cookie Cake',
    description: 'Lupakan kue tart yang itu-itu saja dan perkenalkan pusat perhatian baru di setiap perayaan Anda, kini hadir Linkcookie Cookie Cake! Ini adalah perpaduan sempurna antara soft cookie premium yang Anda cintai dengan kemeriahan sebuah kue. Kami membuatnya dalam ukuran raksasa yang ideal untuk berbagi, dengan tekstur tebal, kenyal, dan lumer di mulut yang sama di setiap potongnya. Sempurna untuk ulang tahun, ucapan selamat, perpisahan, atau momen spesial apa pun, karena Anda bisa menambahkan tulisan dan gambar karakter kustom di atasnya. Jadikan perayaan Anda berikutnya lebih berkesan dan bagikan kebahagiaan yang sesungguhnya.',
    imageSrc: '/AsetImage/Foto3BestSeller_2.jpg',
    slug: 'double-choco-overload',
  },
];

const keyIngredients = [
  { name: 'Premium Butter', imageSrc: '/AsetImage/ingredient_butter.png' },
  { name: 'Dark Chocolate Chips', imageSrc: '/AsetImage/ingredient_choco.png' },
  { name: 'Organic Flour', imageSrc: '/AsetImage/ingredient_flour.png' },
  { name: 'Brown Sugar', imageSrc: '/AsetImage/ingredient_sugar.png' },
];
// --------------------

export default function BestSellers() {
  // State untuk melacak indeks produk yang aktif
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fungsi untuk menangani klik arrow
  const handlePrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? bestSellerProducts.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const isLastSlide = currentIndex === bestSellerProducts.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Ambil data produk yang sedang aktif
  const currentProduct = bestSellerProducts[currentIndex];

  return (
    <section id="best-sellers" className="bg-white py-16 sm:py-24">
      <SectionTitle />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12">
        
        <div className="flex items-center gap-4">
            {/* Tampilkan preTitle dari produk yang aktif */}
            <p className="text-xl sm:text-2xl font-semibold text-pink-500 uppercase flex-shrink-0">
              {currentProduct.preTitle}
            </p>
            <div className="w-full h-[2px] bg-pink-200"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="flex flex-col justify-center mt-4 md:mt-8">
            {/* Tampilkan data dari produk yang aktif */}
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900">
              {currentProduct.title}
            </h2>
            {/* Tampilkan gambar dari produk yang aktif untuk MOBILE*/}
            <div className="md:hidden flex justify-center md:justify-end items-center mt-4">
            <div className="relative w-9/12 aspect-square">
              <Image
                src={currentProduct.imageSrc}
                alt={currentProduct.title}
                key={currentProduct.id} // Penting untuk transisi gambar
                fill
                className="object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
            <p className="text-zinc-600 text-base md:text-xl leading-relaxed text-justify mt-4">
              {currentProduct.description}
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-8">
              <Link href={`/products/${currentProduct.slug}`} className="no-underline">
                <button className="bg-zinc-800 text-white font-bold py-3 px-6 rounded-md hover:bg-zinc-700 transition-colors duration-300 flex items-center gap-2">
                  <span>Lihat Detail Produk</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
              {/* Tombol Arrow Carousel */}
              <div className="flex items-center gap-3">
                <button onClick={handlePrev} aria-label="Previous slide" className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-zinc-600 hover:bg-zinc-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                </button>
                <button onClick={handleNext} aria-label="Next slide" className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-zinc-600 hover:bg-zinc-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </button>
              </div>
            </div>
          </div>
          {/* Tampilkan gambar dari produk yang aktif untuk DEKSTOP*/}
          <div className="hidden md:flex justify-center md:justify-end items-center">
            <div className="relative w-9/12 aspect-square">
              <Image
                src={currentProduct.imageSrc}
                alt={currentProduct.title}
                key={currentProduct.id} // Penting untuk transisi gambar
                fill
                className="object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>


        {/* Bagian Bawah: Key Ingredients */}
        <div className="mt-4 sm:mt-8">
          <div className="flex items-center gap-4">
            {/* Garis Kiri */}
            <div className="grow h-px bg-zinc-900"></div>
            {/* Teks Judul */}
            <h3 className="text-2xl font-bold text-zinc-900 flex-shrink-0">Key Ingredients</h3>
            {/* Garis Kanan */}
            <div className="grow h-px bg-zinc-900"></div>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {keyIngredients.map((ingredient) => (
              <div key={ingredient.name} className="flex flex-col items-center gap-4">
                <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-md">
                  <Image
                    src={ingredient.imageSrc}
                    alt={ingredient.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-semibold text-zinc-700">{ingredient.name}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}