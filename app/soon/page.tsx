"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4 relative">
        <div className="text-center relative z-10 max-w-2xl mx-auto">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Sound Wave Animation */}
            <div className="flex items-center justify-center gap-1 h-24">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="sound-wave-bar"></div>
              ))}
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-[#1e1894]">
                Coming Soon
              </h1>

              <p className="text-lg md:text-xl text-gray-600">
                We&apos;re working hard to bring you something amazing. Stay tuned for updates!
              </p>

              {/* Back Button */}
              <div className="pt-4">
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 text-[#1e1894] hover:text-[#1e1894]/80 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="text-sm font-medium">Back to Home</span>
                </Link>
              </div>

              
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
