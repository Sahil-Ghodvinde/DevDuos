"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch by only rendering on client
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center">
          <Link href="/" className="font-bold text-xl text-[#1e1894]">
            ProjectConnect
          </Link>
        </div>
        
        {/* Only render navigation items after client-side hydration */}
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="text-gray-600 hover:text-[#1e1894]">
            Home
          </Link>
          <Link href="/find_teammate" className="text-gray-600 hover:text-[#1e1894]">
            Find Teammates
          </Link>
          <Link href="/projects" className="text-gray-600 hover:text-[#1e1894]">
            Projects
          </Link>
        </div>
        
        {/* Only render auth buttons after client-side hydration */}
        {mounted ? (
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-[#1e1894]">
                  Dashboard
                </Link>
                <button className="bg-[#1e1894] text-white px-4 py-2 rounded-lg hover:bg-[#1e1894]/90">
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-[#1e1894]">
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="bg-[#1e1894] text-white px-4 py-2 rounded-lg hover:bg-[#1e1894]/90"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        ) : (
          // Placeholder with the same size to prevent layout shift
          <div className="flex items-center space-x-4 opacity-0">
            <span className="text-gray-600">Log in</span>
            <span className="bg-[#1e1894] text-white px-4 py-2 rounded-lg">Sign up</span>
          </div>
        )}
      </nav>
    </header>
  );
} 