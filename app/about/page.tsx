"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

// Define the shape of our video data
interface ShortVideo {
  id: string;
  title: string;
}

// Add your YouTube Short IDs and Titles here
const featuredShorts: ShortVideo[] = [
  { id: "WczTrc_9kLk", title: "What is Generative AI?" },
  { id: "rnCe2aNdrn4", title: "Hackathon Winning Pitch!" },
  { id: "jZP8sL0CHsM", title: "Top 3 AI Tools for Devs" },
  { id: "9uxv1xkF3a4", title: "Our First Hackathon Experience" },
  // Add more videos here
  // { id: "YOUR_SHORT_ID_5", title: "New Video Title" },
  // { id: "YOUR_SHORT_ID_6", title: "Another Cool Short" },
];

export default function MediaPage() {
  return (
    // This structure matches your app/about/page.tsx layout
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative">
      
      {/* Background Patterns & Effects (Copied from your about/page.tsx) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            filter: 'contrast(170%) brightness(150%)',
          }} />
        </div>
        <div className="absolute top-[5%] right-[5%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#1e1894]/5 to-[#4361ee]/5 blur-3xl"></div>
        <div className="absolute top-[40%] left-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#1e1894]/3 to-[#4361ee]/0 blur-3xl"></div>
        <div className="absolute bottom-[5%] right-[15%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#4361ee]/3 to-[#1e1894]/0 blur-3xl"></div>
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, #1e1894 1px, transparent 1px),
                              linear-gradient(to bottom, #1e1894 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        ></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <div className="w-full px-4 pt-6 md:pt-12">
          <div className="mx-auto max-w-7xl">
            {/* Using the same card styling as your 'about' page */}
            <section className="py-4">
              <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 md:p-10 border border-white/60 relative overflow-hidden">
                <div className="text-center mb-10 relative z-10">
                  <span className="inline-block text-sm bg-gradient-to-r from-[#1e1894]/90 to-[#4361ee]/90 text-white font-medium uppercase tracking-wider px-4 py-1 rounded-full mb-3">
                    Our Content
                  </span>
                  <h1 className="text-4xl md:text-6xl font-extrabold text-[#1e1894] tracking-tight mt-2">
                    DevKstra Media
                  </h1>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-6">
                    Exploring the world of AI, hackathons, and technology, one Short at a time.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* YouTube Shorts Grid Section */}
        <div className="w-full px-4 py-6">
          <div className="mx-auto max-w-7xl">
            <section className="py-4">
              {/* This grid matches your inspiration image (4 columns on large screens) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* We map over the video data to create the cards */}
                {featuredShorts.map((video) => (
                  <div 
                    key={video.id}
                    // Card styling from your project
                    className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col"
                  >
                    {/* Video Embed Container */}
                    <div className="w-full aspect-[9/16] bg-gray-200">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${video.id}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                    {/* Video Title */}
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-bold text-gray-900">
                        {video.title}
                      </h3>
                    </div>
                  </div>
                ))}

              </div>
            </section>
          </div>
        </div>

        {/* Inquiry Section */}
        <div className="w-full px-4 py-6 mb-10">
          <div className="mx-auto max-w-7xl">
            <section className="py-4">
              {/* Using the same card styling as your 'about' page */}
              <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 md:p-10 border border-white/60 relative">
                <div className="text-center mb-10 relative z-10">
                  <span className="inline-block text-sm bg-gradient-to-r from-[#1e1894]/90 to-[#4361ee]/90 text-white font-medium uppercase tracking-wider px-4 py-1 rounded-full mb-3">
                    Get in Touch
                  </span>
                  <h2 className="text-3xl font-extrabold text-[#1e1894]">
                    Let's Collaborate
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-6">
                    Have an idea for a video? Want to co-host a tech talk or sponsor content? We'd love to hear from you.
                  </p>
                </div>
                
                {/* Button styled like your 'about' page contact button */}
                <div className="text-center">
                  <Link 
                    href="mailto:connect.sahilghodvinde@gmail.com"
                    className="inline-block px-8 py-4 bg-gradient-to-r from-[#1e1894] to-[#4361ee] text-white rounded-full text-lg font-bold
                             shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    {/* === UPDATE YOUR EMAIL HERE === */}
                    <span className="flex items-center justify-center gap-3">
                      connect.sahilghodvinde@gmail.com
                      <svg 
                        className="w-5 h-5" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
