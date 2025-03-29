"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
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
      if (path === "/") return "Hackathons"
      if (path === "/login" || path.includes("login")) return "Login"
      if (path.includes("/soon")) return "Login"
      if (path === "/faq") return "FAQ"
    }
    return "Hackathons"
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (pathname === "/") {
      setActiveLink("Hackathons")
    } else if (pathname === "/login" || pathname.includes("login")) {
      setActiveLink("Login")
    } else if (pathname.includes("/soon")) {
      setActiveLink("Login")
    } else if (pathname === "/faq") {
      setActiveLink("FAQ")
    } else if (pathname === "/about") {
      setActiveLink("About")
    }
  }, [pathname])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="w-full px-4 pt-4">
      <nav className="mx-auto max-w-7xl rounded-2xl py-3 px-4 md:py-4 md:px-6 transition-all duration-300 
          bg-white/90 backdrop-blur-sm border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
              <Image 
                src="/logo123.png" 
                alt="DevKstra Logo" 
                width={32} 
                height={32} 
                className="rounded-full"
              />
            </div>
            <span className="text-[#1e1894] text-xl font-bold bg-gradient-to-r from-[#1e1894] to-[#4361ee] bg-clip-text text-transparent group-hover:tracking-wide transition-all duration-300">DevKstra</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            <NavLink 
              href="/" 
              label="Hackathons" 
              isActive={activeLink === "Hackathons"} 
              onClick={() => setActiveLink("Hackathons")}
            />
            <NavLink 
              href="/about" 
              label="About" 
              isActive={activeLink === "About"} 
              onClick={() => setActiveLink("About")}
            />
            <NavLink 
              href="/faq" 
              label="FAQ" 
              isActive={activeLink === "FAQ"} 
              onClick={() => setActiveLink("FAQ")}
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
            className="md:hidden p-2 rounded-full hover:bg-gray-50/80 transition-colors duration-200 focus:outline-none"
            aria-label="Toggle menu"
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
        <div 
          className={`md:hidden mt-3 overflow-hidden transition-all duration-200 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-2 pt-2">
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
              href="/about" 
              label="About" 
              isActive={activeLink === "About"} 
              onClick={() => {
                setActiveLink("About")
                setIsMobileMenuOpen(false)
              }}
            />
            <MobileNavLink 
              href="/faq" 
              label="FAQ" 
              isActive={activeLink === "FAQ"} 
              onClick={() => {
                setActiveLink("FAQ")
                setIsMobileMenuOpen(false)
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
        </div>
      </nav>
    </div>
  )
}

function NavLink({ 
  href, 
  label, 
  isActive, 
  onClick 
}: NavLinkProps) {
  return (
    <Link href={href}>
      <button
        className={`relative px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                   ${isActive 
                     ? 'bg-gradient-to-r from-[#1e1894] to-[#4361ee] text-white shadow-sm' 
                     : 'bg-transparent text-gray-700 hover:text-[#1e1894] hover:bg-gray-50/80'
                   }`}
        onClick={onClick}
      >
        <div className="flex items-center space-x-1.5">
          <span>{label}</span>
        </div>
        {isActive && (
          <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>
        )}
      </button>
    </Link>
  )
}

function MobileNavLink({ 
  href, 
  label, 
  isActive, 
  onClick 
}: MobileNavLinkProps) {
  return (
    <Link href={href}>
      <button
        className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                   ${isActive 
                     ? 'bg-gradient-to-r from-[#1e1894] to-[#4361ee] text-white shadow-sm' 
                     : 'bg-transparent text-gray-700 hover:text-[#1e1894] hover:bg-gray-50/80'
                   }`}
        onClick={onClick}
      >
        <div className="flex items-center">
          <span className="text-left">{label}</span>
          {isActive && (
            <div className="ml-auto">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>
      </button>
    </Link>
  )
}

