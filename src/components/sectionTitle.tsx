"use client";

import { motion } from 'framer-motion';

export default function SectionTitle() {
  const backgroundText = "Linkcookie ".repeat(20);

  return (
    <div className="relative flex h-24 items-center justify-center overflow-hidden">
      {/* Teks Latar Belakang (Watermark) */}
      <div className="absolute top-0 left-0 whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 50
          }}
          className="whitespace-nowrap"
        >
          <span
            className="mx-4 text-8xl font-black uppercase text-zinc-900"
            style={{
              WebkitTextStroke: '1px rgb(228 228 231 / 0.5)',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {backgroundText}
          </span>
        </motion.div>
      </div>
    </div>
  );
}