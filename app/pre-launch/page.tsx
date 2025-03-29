'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ContactForm from '@/components/contact-form';

export default function PreLaunch() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative flex items-center justify-center p-4">
      {/* Background Patterns & Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Subtle Grain Texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            filter: 'contrast(170%) brightness(150%)',
          }} />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#1e1894]/5 blur-3xl"></div>
        <div className="absolute top-[40%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#1e1894]/3 blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] rounded-full bg-[#4361ee]/3 blur-3xl"></div>
      </div>

      <div className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Image
            src="/logo123.png"
            alt="Devkstra Logo"
            width={150}
            height={150}
            className="mx-auto"
          />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-[#4361ee] mb-6"
        >
          Devkstra
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1e1894] mb-4">
            Coming Soon
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We&apos;re working hard to bring you something amazing. Stay tuned for updates!
          </p>
          
          <div className="mt-8">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-16 h-16 mx-auto"
            >
              <Image
                src="/logo123.png"
                alt="Loading..."
                width={64}
                height={64}
                className="mx-auto"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Contact Form */}
      <ContactForm />
    </div>
  );
}
