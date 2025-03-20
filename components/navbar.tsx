"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

interface MobileNavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

export default function Navbar() {
  const pathname = usePathname()
  const [activeLink, setActiveLink] = useState(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname
      if (path === "/") return "Home"
      if (path === "/login" || path.includes("login")) return "Login"
      if (path.includes("/soon")) return "Login"
    }
    return "Home"
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (pathname === "/") {
      setActiveLink("Home")
    } else if (pathname === "/login" || pathname.includes("login")) {
      setActiveLink("Login")
    } else if (pathname.includes("/soon")) {
      setActiveLink("Login")
    }
    console.log("Current pathname:", pathname, "Active link:", activeLink)
  }, [pathname, activeLink])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            <NavLink 
              href="/" 
              label="Home" 
              isActive={activeLink === "Home"} 
              onClick={() => setActiveLink("Home")}
            />
            <NavLink 
              href="#about" 
              label="About" 
              isActive={activeLink === "About"} 
              onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
                e.preventDefault();
                setActiveLink("About");
                document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <NavLink 
              href="/login" 
              label="Signin" 
              isActive={activeLink === "Login"} 
              onClick={() => setActiveLink("Login")}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1e1894]"
          >
            <svg
              className="w-6 h-6 text-[#1e1894]"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-4"
            >
              <div className="flex flex-col space-y-2">
                <MobileNavLink 
                  href="/" 
                  label="Home" 
                  isActive={activeLink === "Home"} 
                  onClick={() => {
                    setActiveLink("Home")
                    setIsMobileMenuOpen(false)
                  }}
                />
                <MobileNavLink 
                  href="#about" 
                  label="About" 
                  isActive={activeLink === "About"} 
                  onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
                    e.preventDefault();
                    setActiveLink("About");
                    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                />
                <MobileNavLink 
                  href="/login" 
                  label="Signin" 
                  isActive={activeLink === "Login"} 
                  onClick={() => {
                    setActiveLink("Login")
                    setIsMobileMenuOpen(false)
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  )
}

function NavLink({ 
  href, 
  label, 
  isActive, 
  onClick 
}: NavLinkProps) {
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

function MobileNavLink({ 
  href, 
  label, 
  isActive, 
  onClick 
}: MobileNavLinkProps) {
  const buttonVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  }

  return (
    <Link href={href}>
      <motion.button
        className={`w-full px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300
                   ${isActive 
                     ? 'bg-[#1e1894] text-white shadow-lg shadow-[#1e1894]/20' 
                     : 'bg-white/80 text-[#1e1894] border-2 border-[#1e1894]/20 hover:border-[#1e1894]/40'
                   }`}
        onClick={onClick}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <div className="flex items-center justify-between">
          <span>{label}</span>
          <motion.div 
            className={`w-2 h-2 rounded-full`}
            style={{ backgroundColor: isActive ? '#ffffff' : '#1e1894' }}
            initial={{ x: 0 }}
            animate={{ x: isActive ? 4 : 0 }}
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

