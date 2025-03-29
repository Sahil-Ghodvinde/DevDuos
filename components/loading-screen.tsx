"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [toggleOn, setToggleOn] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Toggle animation
    const toggleTimer = setTimeout(() => {
      setToggleOn(true)
    }, 1500)

    // Fade out animation
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 3000)

    // Complete loading and transition to main site
    const completeTimer = setTimeout(() => {
      if (onLoadingComplete) {
        onLoadingComplete()
      }
    }, 4000)

    return () => {
      clearTimeout(toggleTimer)
      clearTimeout(fadeTimer)
      clearTimeout(completeTimer)
    }
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-gray-100 flex flex-col items-center justify-center z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: fadeOut ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: fadeOut ? 0 : 1, y: fadeOut ? -50 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl font-bold text-[#1e1894] mb-4"
            initial={{ scale: 1 }}
            animate={{ scale: fadeOut ? 0.8 : 1 }}
          >
            DevKstra
          </motion.h1>

          <div className="relative w-16 h-8 bg-gray-300 rounded-full p-1 duration-300 ease-in-out">
            <motion.div
              className="absolute w-6 h-6 bg-[#1e1894] rounded-full shadow-md transform"
              initial={{ x: 0 }}
              animate={{ x: toggleOn ? 32 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

