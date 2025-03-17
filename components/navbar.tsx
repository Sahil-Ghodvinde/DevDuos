"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("Home")

  return (
    <div className="w-full px-4 pt-4">
      <motion.nav
        className="mx-auto max-w-7xl rounded-2xl py-4 px-6 transition-all duration-300 
          backdrop-blur-md bg-white/70 border border-white/20 shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-[#1e1894] text-2xl font-bold">
            DevDuos
          </Link>

          <div className="flex items-center space-x-3">
            <NavLink 
              href="/" 
              label="Home" 
              isActive={activeLink === "Home"} 
              onClick={() => setActiveLink("Home")}
            />
            <NavLink 
              href="/about" 
              label="About" 
              isActive={activeLink === "About"} 
              onClick={() => setActiveLink("About")}
            />
            <NavLink 
              href="/login" 
              label="Login" 
              isActive={activeLink === "Login"} 
              onClick={() => setActiveLink("Login")}
            />
            <NavLink 
              href="/signup" 
              label="Signup" 
              isActive={activeLink === "Signup"} 
              onClick={() => setActiveLink("Signup")}
            />
          </div>
        </div>
      </motion.nav>
    </div>
  )
}

function NavLink({ 
  href, 
  label, 
  isActive, 
  onClick 
}: { 
  href: string; 
  label: string; 
  isActive: boolean;
  onClick: () => void;
}) {
  const buttonVariants = {
    hover: { scale: 1.05 }
  }

  const dotVariants = {
    initial: { x: 0 },
    hover: { x: 4 }
  }

  return (
    <Link href={href}>
      <motion.button
        className={`relative px-6 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                   ${isActive ? 'bg-[#1e1894] text-white' : 'bg-white/80 text-[#1e1894] border border-[#1e1894]'}`}
        onClick={onClick}
        variants={buttonVariants}
        whileHover="hover"
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center space-x-2">
          <span>{label}</span>
          <motion.div 
            className={`w-3 h-3 rounded-full`}
            style={{ backgroundColor: isActive ? '#ffffff' : '#1e1894' }}
            variants={dotVariants}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          />
        </div>
      </motion.button>
    </Link>
  )
}

