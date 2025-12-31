"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    <section id="konten1" className="relative h-screen w-full overflow-hidden">
      {/* Background Images with Parallax/Stagger Effect */}
      <motion.div
        id="kotakFoto"
        className="absolute inset-0 z-0"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="grid grid-cols-3 h-full w-full">
          {mockImages.map((image) => (
            <motion.div key={image.id} variants={itemVariants} className="relative w-full h-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover opacity-80"
                sizes="(max-width: 768px) 33vw, 33vw"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="absolute inset-0 z-10 bg-black/60"></div>

      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col md:flex-row items-center justify-between h-full gap-8 pt-56 md:pt-0">
          <div className="w-full md:w-1/2 text-white text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-bold"
            >
              Welcome to Linkcookie
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="mt-2 text-lg md:text-xl"
            >
              Add a Cookie for a Sweet Day!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
              className="mt-8 flex flex-col items-center sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Link href="/products" className="no-underline">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-zinc-900 font-bold py-3 px-10 rounded-md hover:bg-white/90 transition-colors"
                >
                  <p className="text-lg">Shop now</p>
                </motion.div>
              </Link>
              <a href="https://www.instagram.com/linkcookie.id/" target="_blank" rel="noopener noreferrer" className="no-underline">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black text-white font-semibold py-3 px-6 rounded-md hover:bg-black/80 transition-colors border border-white/20"
                >
                  <p className="text-lg">@linkcookie.id</p>
                </motion.div>
              </a>
            </motion.div>
          </div>

          {isDesktop && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-full md:w-1/2 flex items-center justify-end"
            >
              <motion.div
                animate={{
                  rotate: 360,
                  y: [0, -20, 0] // Floating effect
                }}
                transition={{
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Image
                  src="/AsetImage/cookie_hero2.png"
                  alt="Hero section cookie"
                  width={450}
                  height={300}
                />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}