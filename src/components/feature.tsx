"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

const features = [
  {
    name: 'Gooey & Chewy Texture',
    description: 'Kami menyempurnakan setiap resep untuk menghasilkan soft cookie yang lembut dan kenyal seutuhnya, memberikan sensasi lumer di mulut yang memuaskan di setiap gigitan.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a16.5 16.5 0 01-2.62-7.38c0-3.465 2.15-6.415 5.23-7.62" />
      </svg>
    ),
  },
  {
    name: 'Rich & Balanced Flavor',
    description: 'Rasa manis yang pas berpadu sempurna dengan bahan berkualitas seperti cokelat asli dan mentega premium, menciptakan harmoni rasa yang tidak membosankan.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
  },
  {
    name: 'Premium Ingredients',
    description: 'Kami tidak berkompromi pada kualitas. Hanya bahan baku terbaik dan segar yang kami gunakan, tanpa tambahan pengawet buatan.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.253 9.253 9 9.563 9h4.874c.31 0 .563.253.563.563v4.874c0 .31-.253.563-.563.563H9.563A.563.563 0 019 14.437V9.563z" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section className="bg-white py-16 sm:py-24 relative overflow-hidden">

      <div aria-hidden="true" className="hidden md:block absolute top-1/5 left-1/6 z-0 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl -translate-x-1/2"></div>
      <div aria-hidden="true" className="hidden md:block absolute bottom-1/8 right-3/5 z-0 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl translate-x-1/2"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 items-center">

          <div className="flex flex-col">
            <div className="text-left">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl text-base font-semibold leading-7 text-pink-600"
              >
                The Linkcookie Difference
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl"
              >
                What Makes Our Cookies Special
              </motion.p>
              <div className="block md:hidden my-12 flex justify-center">
                <div className="relative w-8/12 aspect-square">
                  <Image
                    src="/AsetImage/feature_cookie.png"
                    alt="Tumpukan Soft Cookies Linkcookie"
                    fill
                    className="rounded-lg shadow-lg object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-2 text-lg md:text-xl leading-8 text-zinc-600 text-justify"
              >
                Setiap cookie yang kami panggang adalah hasil dari dedikasi pada tiga pilar utama kualitas yang kami pegang teguh.
              </motion.p>
            </div>

            <div className="mt-12 md:mt-6">
              <dl className="flex flex-col gap-y-10">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                    className="relative pl-16"
                  >
                    <dt className="text-base md:text-xl font-semibold leading-7 text-zinc-900">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500">
                        <div className="text-white">{feature.icon}</div>
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base md:text-xl leading-7 text-zinc-600 text-justify">{feature.description}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex items-center justify-end"
          >
            <div className="relative w-9/12 aspect-square">
              <Image
                src="/AsetImage/feature_cookie.png"
                alt="Tumpukan Soft Cookies Linkcookie"
                fill
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}