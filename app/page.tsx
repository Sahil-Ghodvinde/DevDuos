"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import HackathonCard from "@/components/hackathon-card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"
import { getHackathons } from "@/lib/hackathons"

interface ArtisticSlide {
  type: 'artistic';
  gradient: string;
  pattern: "cyberpunk" | "geometric";
  title: string;
}

interface ContentSlide {
  type: 'content';
  title: string;
  description: string;
  subtitle: string;
  gradient: string;
}

// Define the Hackathon interface
interface Hackathon {
  id: string
  title: string
  description: string
  image?: string
  location: string
  date: string
  closes: string
  mode?: "Online" | "Offline" | "Hybrid"
  theme?: string
  status?: "OPEN" | "LIVE" | "CLOSED"
  participants?: number
  organizer?: string
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [displayedHackathons, setDisplayedHackathons] = useState(4)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideDirection, setSlideDirection] = useState(1)
  const [hackathons, setHackathons] = useState<Hackathon[]>([])
  const [selectedMode, setSelectedMode] = useState<string>("All")
  const itemsPerPage = 4

  // Filter hackathons based on selected mode
  const filteredHackathons = hackathons.filter(hackathon => {
    if (selectedMode === "All") return true
    return hackathon.mode === selectedMode
  })

  useEffect(() => {
    // Fetch hackathons from Supabase
    async function fetchHackathons() {
      try {
        // Check if Supabase is properly configured
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          console.error('Supabase configuration is missing');
          setIsLoading(false);
          return;
        }

        const hackathonsData = await getHackathons()
        setHackathons(hackathonsData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching hackathons:", error)
        setIsLoading(false)
      }
    }

    fetchHackathons()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      const nextSlide = (currentSlide + 1) % 3
      setSlideDirection(nextSlide > currentSlide ? 1 : -1)
      setCurrentSlide(nextSlide)
    }, 5000)

    return () => clearInterval(timer)
  }, [currentSlide])

  const handleSlideChange = (index: number) => {
    if (index !== currentSlide) {
      setSlideDirection(index > currentSlide ? 1 : -1)
      setCurrentSlide(index)
    }
  }

  const handleSeeMore = () => {
    const nextCount = Math.min(displayedHackathons + itemsPerPage, hackathons.length)
    setDisplayedHackathons(nextCount)
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Paper Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          filter: 'contrast(200%) brightness(150%)',
        }} />
      </div>

      <Navbar />

      {/* Hero Section */}
      <div className="w-full px-2 md:px-4">
        <div className="mx-auto max-w-7xl">
          <section className="w-full pt-2 pb-2">
            <div 
              className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl md:rounded-3xl p-2 md:p-4 relative overflow-hidden"
            >
              {/* Split Content Container */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 items-stretch h-[160px] md:h-[240px]">
                {/* Left Column */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div 
                    key={`left-${currentSlide}`}
                    className="rounded-xl md:rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                             border border-white/40 h-full"
                    initial={{ x: slideDirection > 0 ? '100%' : '-100%', opacity: 0 }}
                    animate={{ x: '0%', opacity: 1 }}
                    exit={{ x: slideDirection > 0 ? '-100%' : '100%', opacity: 0 }}
                    transition={{ 
                      type: "tween",
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <AnimatedSlides 
                      side="left" 
                      currentSlide={currentSlide} 
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Right Column */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`right-${currentSlide}`}
                    className="rounded-xl md:rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                             border border-[#1e1894]/20 h-full"
                    initial={{ x: slideDirection > 0 ? '100%' : '-100%', opacity: 0 }}
                    animate={{ x: '0%', opacity: 1 }}
                    exit={{ x: slideDirection > 0 ? '-100%' : '100%', opacity: 0 }}
                    transition={{ 
                      type: "tween",
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <AnimatedSlides 
                      side="right" 
                      currentSlide={currentSlide} 
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Centralized Dot Navigator */}
              <div className="flex justify-center gap-1 md:gap-2 mt-2 md:mt-4">
                {[0, 1, 2].map((dot) => (
                  <motion.button
                    key={dot}
                    className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full cursor-pointer transition-all duration-300 ${
                      currentSlide === dot 
                        ? 'bg-[#1e1894] w-3 md:w-6' 
                        : 'bg-[#1e1894]/20 hover:bg-[#1e1894]/40'
                    }`}
                    initial={false}
                    animate={{ scale: currentSlide === dot ? 1 : 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => handleSlideChange(dot)}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Hackathon Listing Section */}
      <div className="w-full px-2 md:px-4">
        <div className="mx-auto max-w-7xl">
          <section className="py-2 md:py-4">
            <div className="bg-white/60 backdrop-blur-md shadow-lg rounded-2xl md:rounded-3xl p-4 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 mb-4 md:mb-8">
                <h2 className="text-xl md:text-3xl font-bold text-[#1e1894]">Upcoming Hackathons</h2>
                <div className="relative w-full md:w-auto min-w-[200px]">
                  <select 
                    className="w-full bg-white/80 border-2 border-gray-200 rounded-xl px-3 md:px-4 py-2 md:py-2.5 pr-10 
                               appearance-none focus:outline-none focus:border-[#1e1894] focus:ring-2 focus:ring-[#1e1894]/20
                               transition-all duration-300 text-sm md:text-base"
                    value={selectedMode}
                    onChange={(e) => {
                      setSelectedMode(e.target.value)
                      setDisplayedHackathons(4) // Reset displayed count when filter changes
                    }}
                  >
                    <option value="All">All</option>
                    <option value="Online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-[#1e1894]">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 min-h-[400px]">
                {filteredHackathons.slice(0, displayedHackathons).map((hackathon, index) => (
                  <motion.div
                    key={hackathon.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <HackathonCard hackathon={hackathon} />
                  </motion.div>
                ))}
              </div>

              {displayedHackathons < filteredHackathons.length && (
                <div className="text-center mt-6 md:mt-10">
                  <motion.button
                    onClick={handleSeeMore}
                    className="px-4 md:px-6 py-2 bg-white/80 text-[#1e1894] rounded-full text-sm font-medium
                             border border-[#1e1894]/20 shadow-sm
                             hover:bg-[#1e1894]/5 transition-all duration-300"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    Load More
                  </motion.button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Team Finding Section */}
      <div className="w-full px-2 md:px-4">
        <div className="mx-auto max-w-7xl">
          <section className="py-2 md:py-4">
            <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl md:rounded-3xl p-4 md:p-12">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h2 className="text-xl md:text-4xl font-bold text-[#1e1894] mb-3 md:mb-6">
                  Everything you need in one place
                </h2>
                <p className="text-gray-600 text-sm md:text-lg mb-6 md:mb-12 max-w-2xl mx-auto px-2">
                  Experience a seamless platform designed to make your hackathon journey smoother and more collaborative.
                </p>

                <div className="max-w-5xl mx-auto min-h-[400px] md:h-[600px] bg-white 
                              rounded-xl md:rounded-2xl flex flex-col md:flex-row items-center md:items-start justify-between 
                              relative overflow-hidden p-3 md:px-8 gap-6 md:gap-0">
                  {/* Left Side - Device Frame */}
                  <div className="relative w-[240px] md:w-[300px] h-[480px] md:h-[600px] bg-[#1a1b1e] rounded-[2rem] md:rounded-[3rem] 
                               shadow-xl border-[8px] md:border-[12px] border-[#2a2b2e]
                               flex items-center justify-center overflow-hidden">
                    {/* Device Header - Camera & Speaker */}
                    <div className="absolute top-0 w-28 md:w-36 h-4 md:h-6 bg-[#2a2b2e] rounded-b-2xl md:rounded-b-3xl 
                                 flex items-center justify-center gap-1 md:gap-2 z-20">
                      <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[#1e1894]"></div>
                      <div className="w-8 md:w-12 h-1.5 md:h-2 rounded-full bg-[#3a3b3e]"></div>
                    </div>

                    {/* Screen Content */}
                    <div className="w-full h-full bg-white relative">
                      {/* Status Bar */}
                      <div className="h-5 md:h-7 bg-[#f8f9fa] flex items-center justify-between px-3 md:px-4 text-[10px] md:text-xs">
                        <span>9:41</span>
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 20.9994C16.4183 20.9994 20 17.4177 20 12.9994C20 8.58107 16.4183 4.99939 12 4.99939C7.58172 4.99939 4 8.58107 4 12.9994C4 17.4177 7.58172 20.9994 12 20.9994Z"/>
                          </svg>
                          <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.5355 8.46447C17.4882 10.4171 17.4882 13.5829 15.5355 15.5355C13.5829 17.4882 10.4171 17.4882 8.46447 15.5355C6.51184 13.5829 6.51184 10.4171 8.46447 8.46447C10.4171 6.51184 13.5829 6.51184 15.5355 8.46447"/>
                          </svg>
                          <div className="w-4 md:w-6 bg-[#1e1894] h-2 md:h-2.5 rounded-full"></div>
                        </div>
                      </div>

                      {/* Content Carousel */}
                      <AnimatePresence mode="wait">
                        <motion.div 
                          key={currentSlide}
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.5 }}
                          className="p-2 md:p-4"
                        >
                          {currentSlide === 0 && (
                            <div className="space-y-4">
                              <div className="bg-[#f8f9fa] p-4 rounded-2xl">
                                <h3 className="text-[#1e1894] font-semibold text-lg mb-2">Team Matching</h3>
                                <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
                                  <div className="w-12 h-12 bg-[#1e1894]/10 rounded-full flex items-center justify-center text-xl">
                                    🎯
                                  </div>
                                  <div className="flex-1">
                                    <div className="h-2 w-24 bg-[#1e1894] rounded-full"></div>
                                    <div className="h-2 w-32 bg-gray-200 rounded-full mt-2"></div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-3">
                                {['Frontend', 'Backend', 'UI/UX', 'DevOps'].map((skill, i) => (
                                  <motion.div
                                    key={skill}
                                    className="bg-white p-3 rounded-xl shadow-sm"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                  >
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 bg-[#1e1894]/10 rounded-full flex items-center justify-center">
                                        {i === 0 ? '👩‍💻' : i === 1 ? '👨‍💻' : i === 2 ? '🎨' : '⚙️'}
                                      </div>
                                      <span className="text-sm font-medium">{skill}</span>
                                    </div>
                                    <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                      <motion.div
                                        className="h-full bg-[#1e1894]"
                                        initial={{ width: '0%' }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 1.5, delay: i * 0.2 }}
                                      />
                                    </div>
                                  </motion.div>
                                ))}
                              </div>

                              <div className="bg-[#f8f9fa] p-4 rounded-2xl">
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-medium text-[#1e1894]">Match Score</h4>
                                  <span className="text-sm text-gray-500">98%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <motion.div
                                    className="h-full bg-[#1e1894]"
                                    initial={{ width: '0%' }}
                                    animate={{ width: '98%' }}
                                    transition={{ duration: 1.5 }}
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {currentSlide === 1 && (
                            <div className="space-y-4">
                              <div className="bg-[#f8f9fa] p-4 rounded-2xl">
                                <h3 className="text-[#1e1894] font-semibold text-lg mb-2">Hackathon Chat</h3>
                                <div className="space-y-3">
                                  {[
                                    { user: "Alice", message: "Hey team! Ready to start?" },
                                    { user: "Bob", message: "Yes! I have some ideas." },
                                    { user: "Charlie", message: "Let's discuss the tech stack." }
                                  ].map((chat, i) => (
                                    <motion.div
                                      key={i}
                                      className={`flex items-start gap-3 ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: i * 0.2 }}
                                    >
                                      {i % 2 === 0 && (
                                        <div className="w-8 h-8 bg-[#1e1894]/10 rounded-full flex items-center justify-center">
                                          {chat.user[0]}
                                        </div>
                                      )}
                                      <div className={`p-3 rounded-xl max-w-[70%] ${
                                        i % 2 === 0 ? 'bg-white' : 'bg-[#1e1894] text-white'
                                      }`}>
                                        <p className="text-sm">{chat.message}</p>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>

                              <div className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-3">
                                <input
                                  type="text"
                                  placeholder="Type a message..."
                                  className="flex-1 bg-transparent text-sm focus:outline-none"
                                />
                                <button className="w-8 h-8 bg-[#1e1894] rounded-full flex items-center justify-center text-white">
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7l7 7-7 7"/>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          )}

                          {currentSlide === 2 && (
                            <div className="space-y-4">
                              {/* Analytics Header */}
                              <div className="bg-[#f8f9fa] p-4 rounded-2xl">
                                <h3 className="text-[#1e1894] font-semibold text-lg mb-4">Analytics Dashboard</h3>
                                <div className="grid grid-cols-2 gap-3">
                                  {[
                                    { label: 'Active Users', value: '23.2K', icon: '👥' },
                                    { label: 'Teams Formed', value: '5.2K', icon: '🤝' },
                                    { label: 'Projects', value: '12.8K', icon: '💻' },
                                    { label: 'Success Rate', value: '89%', icon: '📈' }
                                  ].map((stat, i) => (
                                    <motion.div
                                      key={i}
                                      className="bg-white p-3 rounded-xl shadow-sm"
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: i * 0.1 }}
                                    >
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xl">{stat.icon}</span>
                                        <div className="h-6 w-[1px] bg-gray-200"></div>
                                        <span className="text-lg font-semibold text-[#1e1894]">{stat.value}</span>
                                      </div>
                                      <div className="text-sm text-gray-600">{stat.label}</div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>

                              {/* Growth Chart */}
                              <div className="bg-[#f8f9fa] p-4 rounded-2xl">
                                <div className="flex items-center justify-between mb-4">
                                  <h4 className="font-medium text-[#1e1894]">Monthly Growth</h4>
                                  <div className="flex items-center gap-2 text-sm">
                                    <span className="w-2 h-2 rounded-full bg-[#1e1894]"></span>
                                    <span className="text-gray-600">2024</span>
                                  </div>
                                </div>
                                <div className="h-32 flex items-end justify-between gap-2">
                                  {[40, 65, 45, 80, 60, 90, 75].map((height, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                      <motion.div
                                        className="w-full bg-[#1e1894]/10 rounded-lg relative group"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                      >
                                        <motion.div
                                          className="absolute bottom-0 left-0 right-0 bg-[#1e1894] rounded-lg"
                                          initial={{ height: 0 }}
                                          animate={{ height: `${height}%` }}
                                          transition={{ duration: 1, delay: i * 0.1 }}
                                        />
                                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 
                                                      opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                          <span className="text-xs font-medium text-[#1e1894]">{height}%</span>
                                        </div>
                                      </motion.div>
                                      <span className="text-xs text-gray-500">
                                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i]}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Quick Stats */}
                              <div className="bg-[#f8f9fa] p-4 rounded-2xl">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="text-sm text-gray-600">Total Revenue</h4>
                                    <p className="text-xl font-semibold text-[#1e1894] mt-1">$124.2K</p>
                                  </div>
                                  <motion.div
                                    className="w-12 h-12 rounded-full bg-[#1e1894]/10 flex items-center justify-center"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <svg className="w-6 h-6 text-[#1e1894]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation Dots */}
                      <div className="absolute bottom-2 md:bottom-4 left-0 right-0 flex justify-center gap-1 md:gap-2">
                        {[0, 1, 2].map((dot) => (
                          <motion.button
                            key={dot}
                            className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full ${
                              currentSlide === dot ? 'bg-[#1e1894]' : 'bg-gray-300'
                            }`}
                            onClick={() => handleSlideChange(dot)}
                            whileHover={{ scale: 1.2 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Feature Descriptions */}
                  <div className="w-full md:w-[400px] space-y-3 md:space-y-8 py-2 md:py-8">
                    <motion.div
                      className={`p-3 md:p-6 rounded-xl md:rounded-2xl transition-all duration-300 cursor-pointer ${
                        currentSlide === 0 
                          ? 'bg-[#1e1894]/5 shadow-lg scale-[1.02] md:scale-105' 
                          : 'bg-transparent hover:bg-gray-50'
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      onClick={() => handleSlideChange(0)}
                    >
                      <h3 className="text-lg md:text-xl font-semibold text-[#1e1894] mb-1 md:mb-2">Smart Team Matching</h3>
                      <p className="text-sm md:text-base text-gray-600">Our AI-powered algorithm connects you with the perfect teammates based on skills and goals.</p>
                    </motion.div>

                    <motion.div
                      className={`p-3 md:p-6 rounded-xl md:rounded-2xl transition-all duration-300 cursor-pointer ${
                        currentSlide === 1 
                          ? 'bg-[#1e1894]/5 shadow-lg scale-[1.02] md:scale-105' 
                          : 'bg-transparent hover:bg-gray-50'
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      onClick={() => handleSlideChange(1)}
                    >
                      <h3 className="text-lg md:text-xl font-semibold text-[#1e1894] mb-1 md:mb-2">Dedicated Chat Rooms</h3>
                      <p className="text-sm md:text-base text-gray-600">Each hackathon gets its own space for participants to collaborate and share ideas.</p>
                    </motion.div>

                    <motion.div
                      className={`p-3 md:p-6 rounded-xl md:rounded-2xl transition-all duration-300 cursor-pointer ${
                        currentSlide === 2 
                          ? 'bg-[#1e1894]/5 shadow-lg scale-[1.02] md:scale-105' 
                          : 'bg-transparent hover:bg-gray-50'
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={() => handleSlideChange(2)}
                    >
                      <h3 className="text-lg md:text-xl font-semibold text-[#1e1894] mb-1 md:mb-2">Real-time Analytics</h3>
                      <p className="text-sm md:text-base text-gray-600">Track participation, team formation, and project progress with comprehensive analytics.</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>

      {/* About Us Section */}
      <section id="about-section" className="w-full py-8 md:py-16">
        <div className="px-2 md:px-4">
          <div className="mx-auto max-w-7xl">
            <div className="bg-[#1e1894] rounded-2xl md:rounded-3xl p-6 md:p-12 text-white relative overflow-hidden">
              {/* Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1e1894] to-[#4361ee]">
                <div className="absolute inset-0">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-white/10"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.1, 0.3, 0.1],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="relative z-10">
                {/* Company Logo and Name */}
                <motion.div 
                  className="flex items-center justify-center gap-4 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                    <span className="text-[#1e1894] text-2xl font-bold">DD</span>
                  </div>
                  <div className="text-left">
                    <h2 className="text-3xl font-bold">DevDuos</h2>
                    <p className="text-white/80">Founders-suite</p>
                  </div>
                </motion.div>

                {/* Founder Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  {[
                    {
                      name: "Sahil Gawli",
                      role: "Founder, IT Engineer",
                      emoji: "👨‍💻"
                    },
                    {
                      name: "Sahil Ghodvinde",
                      role: "Founder, IT Engineer",
                      emoji: "👨‍💻"
                    }
                  ].map((founder, i) => (
                    <motion.div
                      key={i}
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                      initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.2 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                          {founder.emoji}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{founder.name}</h3>
                          <p className="text-white/80">{founder.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Story Timeline */}
                <div className="space-y-8 max-w-3xl mx-auto">
                  {[
                    {
                      date: "January 2024",
                      title: "The Beginning",
                      content: "Two engineering students faced a common challenge: finding the right teammates for hackathons. This sparked the idea for DevDuos.",
                      icon: "💡"
                    },
                    {
                      date: "February 2024",
                      title: "Problem Discovery",
                      content: "While building the platform, we uncovered another challenge - participants needed a dedicated space for discussions and collaboration.",
                      icon: "🔍"
                    },
                    {
                      date: "March 2024",
                      title: "DevDuos Spaces Launch",
                      content: "Launched our community-driven forum where innovators can connect, collaborate, and seek guidance.",
                      icon: "🚀"
                    }
                  ].map((milestone, i) => (
                    <motion.div
                      key={i}
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                          {milestone.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{milestone.title}</h3>
                            <div className="h-1 w-1 rounded-full bg-white/40"></div>
                            <span className="text-white/60 text-sm">{milestone.date}</span>
                          </div>
                          <p className="text-white/80 leading-relaxed">{milestone.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Contact Button */}
                <div className="mt-12 text-center">
                  <motion.button 
                    className="px-8 py-3 bg-white text-[#1e1894] rounded-full font-medium 
                             hover:bg-gray-50 transition-all duration-300
                             shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Connect with us
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function AnimatedSlides({ side, currentSlide }: { side: "left" | "right", currentSlide: number }) {
  const slides: {
    left: ArtisticSlide[];
    right: ContentSlide[];
  } = {
    left: [
      {
        type: 'artistic',
        gradient: "from-[#FF0080] via-[#7928CA] to-[#FF0080]",
        pattern: "cyberpunk",
        title: "All Hackathons at one place"
      },
      {
        type: 'artistic',
        gradient: "from-[#00F5A0] via-[#00D9F5] to-[#00F5A0]",
        pattern: "geometric",
        title: "Hackathon specific Chatrooms"
      },
      {
        type: 'artistic',
        gradient: "from-[#1e1894] via-[#4361ee] to-[#1e1894]",
        pattern: "geometric",
        title: "Real-time Analytics"
      }
    ],
    right: [
      {
        type: 'content',
        title: "Find your teammates here",
        description: "Connect with talented developers and form your dream team",
        subtitle: "Team Building",
        gradient: "from-[#1e1894] via-[#1e1894] to-[#1e1894]"
      },
      {
        type: 'content',
        title: "Get the statistics here",
        description: "Track your progress and see your impact in real-time",
        subtitle: "Analytics & Insights",
        gradient: "from-[#1e1894] via-[#1e1894] to-[#1e1894]"
      },
      {
        type: 'content',
        title: "Data-Driven Decisions",
        description: "Make informed decisions with comprehensive analytics and insights",
        subtitle: "Analytics Dashboard",
        gradient: "from-[#1e1894] via-[#1e1894] to-[#1e1894]"
      }
    ]
  }

  const currentContent = slides[side][currentSlide]

  if (side === "left") {
    const content = currentContent as ArtisticSlide
    return (
      <div className="h-full relative overflow-hidden bg-black rounded-xl md:rounded-2xl">
        {/* Artistic Background Patterns */}
        {content.pattern === "cyberpunk" ? (
          <div className="absolute inset-0">
            {/* Static Neon Grid */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
              {[...Array(36)].map((_, i) => (
                <div
                  key={i}
                  className={`w-full h-full border-2 ${
                    i % 2 ? 'border-[#FF0080]/20' : 'border-[#7928CA]/20'
                  }`}
                />
              ))}
            </div>
            
            {/* Static Neon Elements */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={`neon-${i}`}
                  className={`absolute w-32 h-32 bg-gradient-to-r ${content.gradient}`}
                  style={{
                    left: `${(i * 25) % 100}%`,
                    top: `${(i * 30) % 100}%`,
                    filter: 'blur(40px)',
                    mixBlendMode: 'screen',
                    opacity: 0.4,
                    transform: `rotate(${i * 45}deg)`,
                  }}
                />
              ))}
            </div>

            {/* Static Glitch Lines */}
            {[...Array(5)].map((_, i) => (
              <div
                key={`glitch-${i}`}
                className="absolute h-px w-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
                style={{ 
                  top: `${20 * i}%`,
                  opacity: 0.3,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="absolute inset-0">
            {/* Static Geometric Patterns */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
              {[...Array(64)].map((_, i) => (
                <div
                  key={i}
                  className="relative"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${content.gradient}
                               ${i % 2 ? 'rounded-full' : 'rotate-45'}`}
                    style={{
                      opacity: 0.2,
                      transform: `scale(${0.8 + (i % 3) * 0.1}) rotate(${i * 15}deg)`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Overlay Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${content.gradient} opacity-30 mix-blend-overlay`} />

        {/* Title */}
        <div className="relative z-10 h-full flex items-center justify-center p-2 md:p-6">
          <motion.h2
            className="text-sm md:text-3xl font-bold text-white text-center px-2"
            style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              letterSpacing: '-0.02em',
              textShadow: '0 0 30px rgba(255,255,255,0.5)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {content.title}
          </motion.h2>
        </div>
      </div>
    )
  }

  const content = currentContent as ContentSlide
  return (
    <div className="h-full flex flex-col justify-between p-2 md:p-6 relative overflow-hidden bg-white rounded-xl md:rounded-2xl">
      <div className="relative z-10 space-y-0.5 md:space-y-3">
        <div className="space-y-0.5 md:space-y-2">
          <motion.span 
            className="uppercase text-[8px] md:text-xs font-medium tracking-[0.1em] md:tracking-[0.2em] block text-[#1e1894]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {content.subtitle}
          </motion.span>
          <motion.h2
            className="text-xs md:text-2xl font-bold text-[#1e1894] mb-0.5 md:mb-2"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {content.title}
          </motion.h2>
          <motion.p
            className="text-[8px] md:text-base leading-relaxed text-gray-600 line-clamp-2 md:line-clamp-none"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {content.description}
          </motion.p>
        </div>
      </div>

      <motion.button
        className="group w-[100px] md:w-full mx-auto px-2 md:px-4 py-1 md:py-2.5 rounded-full font-medium text-[8px] md:text-sm
                   bg-[#1e1894] text-white hover:bg-[#1e1894]/90
                   transition-all duration-300 shadow-sm hover:shadow-md"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
      >
        <span className="relative z-10 flex items-center justify-center gap-0.5 md:gap-2">
          Explore Now
          <motion.svg 
            className="w-2 h-2 md:w-4 md:h-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            initial={{ x: 0 }}
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </motion.svg>
        </span>
      </motion.button>
    </div>
  )
}
