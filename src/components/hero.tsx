"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const mockImages = [
  { id: 1, src: '/AsetImage/page1Konten1Foto1.jpg', alt: 'Cookie 1' },
  { id: 2, src: '/AsetImage/page1Konten1Foto2.jpg', alt: 'Cookie 2' },
  { id: 3, src: '/AsetImage/page1Konten1Foto3.jpg', alt: 'Cookie 3' },
  { id: 4, src: '/AsetImage/page1Konten1Foto4.jpg', alt: 'Cookie 4' },
  { id: 5, src: '/AsetImage/page1Konten1Foto5.jpg', alt: 'Cookie 5' },
  { id: 6, src: '/AsetImage/page1Konten1Foto6.jpg', alt: 'Cookie 6' },
  { id: 7, src: '/AsetImage/page1Konten1Foto7.jpg', alt: 'Cookie 7' },
  { id: 8, src: '/AsetImage/page1Konten1Foto8.jpg', alt: 'Cookie 8' },
  { id: 9, src: '/AsetImage/page1Konten1Foto9.jpg', alt: 'Cookie 9' },
];

export default function Hero() {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <section id="konten1" className="relative h-screen w-full">
      <div id="kotakFoto" className="absolute inset-0 z-0">
        <div className="grid grid-cols-3 h-full w-full">
          {mockImages.map((image) => (
            <div key={image.id} className="relative w-full h-full">
              <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width: 768px) 33vw, 33vw" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 z-10 bg-black/60"></div>
      
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col md:flex-row items-center justify-between h-full gap-8 pt-56 md:pt-0"> {/* pt nya di sini bang */}
          <div className="w-full md:w-1/2 text-white text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold">
              Welcome to Linkcookie
            </h1>
            <p className="mt-2 text-lg md:text-xl">
              Add a Cookie for a Sweet Day!
            </p>
            <div className="mt-8 flex flex-col items-center sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/products" className="no-underline"><div className="bg-white text-zinc-900 font-bold py-3 px-10 rounded-md hover:bg-white/20 transition-colors duration-300"><p className="text-lg">Shop now</p></div></Link>
                <a href="https://www.instagram.com/linkcookie.id/" target="_blank" rel="noopener noreferrer" className="no-underline"><div className="bg-black text-white font-semibold py-3 px-6 rounded-md hover:bg-white/10 transition-colors duration-300"><p className="text-lg">@linkcookie.id</p></div></a>
            </div>
          </div>
          
          {isDesktop && (
            <div className="w-full md:w-1/2 flex items-center justify-end">
              <Image
                src="/AsetImage/cookie_hero2.png"
                alt="Hero section cookie"
                width={450}
                height={300}
                style={{ animation: 'rotate-360 25s linear infinite' }} 
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}