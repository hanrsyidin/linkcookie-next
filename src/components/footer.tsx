"use client";

import Link from 'next/link';
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Pesan', href: '/products' },
  { name: 'Voucher', href: '#' },
  { name: 'Pesanan', href: '#' },
];

const social = [
  { name: 'Instagram', href: 'https://instagram.com/linkcookie.id', icon: <FaInstagram /> },
  { name: 'TikTok', href: 'https://www.tiktok.com/@linkcookie.id?_t=ZS-8xlV0KAsHaS&_r=1', icon: <FaTiktok /> },
  { name: 'WhatsApp', href: 'https://wa.me/6289658963055', icon: <FaWhatsapp /> },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-white">Linkcookie</h3>
            <p className="text-zinc-400 text-base">
              Handcrafted soft cookies made with premium ingredients to sweeten your day.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:mx-auto"
          >
            <h4 className="font-semibold uppercase tracking-wider text-zinc-300">Quick Links</h4>
            <ul role="list" className="mt-4 space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-base text-zinc-400 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:mx-auto"
          >
            <h4 className="font-semibold uppercase tracking-wider text-zinc-300">Follow Us</h4>
            <div className="flex space-x-6 mt-4">
              {social.map((item) => (
                <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                  <span className="sr-only">{item.name}</span>
                  <div className="h-6 w-6">{item.icon}</div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-12 border-t border-zinc-800 pt-8 text-center">
          <p className="text-base text-zinc-400">&copy; {currentYear} Linkcookie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}