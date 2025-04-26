'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PreLaunch() {
  return (
    <div className="min-h-screen bg-white relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Patterns & Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Grain Texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            filter: 'contrast(170%) brightness(150%)',
          }} />
        </div>
        
        {/* Decorative Elements - Using the #3530ba color */}
        <div className="absolute -top-24 -left-24 w-64 md:w-96 h-64 md:h-96 rounded-full bg-gradient-to-br from-[#3530ba]/10 to-[#3530ba]/20 blur-3xl" />
        <div className="absolute top-1/4 -right-24 w-64 md:w-96 h-64 md:h-96 rounded-full bg-gradient-to-br from-[#3530ba]/10 to-[#3530ba]/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 w-64 md:w-96 h-64 md:h-96 rounded-full bg-gradient-to-br from-[#3530ba]/10 to-[#3530ba]/20 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4">
        <div className="text-center">
          {/* Logo Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="relative h-32 w-32 mx-auto">
              {/* Glow effect behind logo */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-[#3530ba]/30 to-[#3530ba]/30 blur-md rounded-full"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.6, 0.8, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              <Image
                src="/DevkstraLogo.png"
                alt="Devkstra Logo"
                width={150}
                height={150}
                className="mx-auto relative z-10"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const parent = target.parentElement;
                  if (parent) {
                    const textFallback = document.createElement('div');
                    textFallback.className = 'font-bold text-2xl text-[#3530ba] h-full w-full flex items-center justify-center';
                    textFallback.innerText = 'DevKstra';
                    parent.appendChild(textFallback);
                    target.style.display = 'none';
                  }
                }}
              />
            </div>
          </motion.div>

          {/* Early Access Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-4"
          >
            <span className="px-3 py-1 bg-[#3530ba]/10 rounded-full text-xs font-semibold text-[#3530ba]">
              Pre-Launch
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3530ba] to-[#3530ba]">
              DevKstra
            </span>
          </motion.h1>
          
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-lg mx-auto"
          >
            Your shortest path to optimal hackathons
          </motion.p>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-10"
          >
            We&apos;re working hard to bring you the ultimate hackathon experience. Connect with talented developers, build amazing projects, and showcase your skills.
          </motion.p>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-8 max-w-md mx-auto"
          >
            <p className="text-gray-700 mb-2">
              You can reach us at{" "}
              <a 
                href="mailto:support@devkstra.com" 
                className="text-[#3530ba] font-medium hover:underline"
              >
                support@devkstra.com
              </a>{" "}
              for queries
            </p>
            <p className="text-gray-700">
              or talk with us at{" "}
              <a 
                href="mailto:sahil@devkstra.com" 
                className="text-[#3530ba] font-medium hover:underline"
              >
                sahil@devkstra.com
              </a>
            </p>
          </motion.div>
          
          {/* Thank you message */}
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-xl text-[#3530ba] font-medium">
              Thank you for your interest in DevKstra!
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
