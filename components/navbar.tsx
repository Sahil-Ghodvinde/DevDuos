"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"
import UserAvatar from "./UserAvatar"

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
  const { user, signOut } = useAuth()
  const [activeLink, setActiveLink] = useState("Hackathons")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)

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
    } else if (pathname === "/profile") {
      setActiveLink("Profile") 
    } else if (pathname === "/dashboard") {
      setActiveLink("Dashboard")
    }
  }, [pathname])

  useEffect(() => {
    // Close profile dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  const handleSignOut = async () => {
    await signOut()
    setIsProfileMenuOpen(false)
  }

  return (
    <div className="w-full px-4 pt-4">
      <nav className="mx-auto max-w-7xl rounded-2xl py-3 px-4 md:py-4 md:px-6 transition-all duration-300 
          bg-white/90 backdrop-blur-sm border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-40 relative">
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
            
            {/* Login/Profile Button */}
            {user ? (
              <div className="relative z-50" ref={profileMenuRef}>
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <UserAvatar user={user} size={24} />
                  <span className="max-w-[80px] truncate">
                    {user.user_metadata?.full_name || user.email?.split('@')[0] || "Profile"}
                  </span>
                  <svg 
                    className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100">
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1e1894]"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        View Profile
                      </div>
                    </Link>
                    <Link 
                      href="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1e1894]"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                      </div>
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button 
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink 
                href="/login" 
                label="Sign In" 
                isActive={activeLink === "Login"} 
                onClick={() => setActiveLink("Login")}
              />
            )}
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
          className={`md:hidden mt-3 overflow-hidden transition-all duration-200 ease-in-out z-40 ${
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
            
            {user ? (
              <>
                <MobileNavLink 
                  href="/profile" 
                  label="Profile" 
                  isActive={activeLink === "Profile"} 
                  onClick={() => {
                    setActiveLink("Profile")
                    setIsMobileMenuOpen(false)
                  }}
                />
                <MobileNavLink 
                  href="/dashboard" 
                  label="Dashboard" 
                  isActive={activeLink === "Dashboard"} 
                  onClick={() => {
                    setActiveLink("Dashboard")
                    setIsMobileMenuOpen(false)
                  }}
                />
                <button
                  className="w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 text-left transition-all duration-200"
                  onClick={() => {
                    handleSignOut()
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <div className="flex items-center">
                    <span>Sign Out</span>
                  </div>
                </button>
              </>
            ) : (
              <MobileNavLink 
                href="/login" 
                label="Sign In" 
                isActive={activeLink === "Login"} 
                onClick={() => {
                  setActiveLink("Login")
                  setIsMobileMenuOpen(false)
                }}
              />
            )}
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

