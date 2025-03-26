"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { getHackathonById } from "@/lib/hackathons"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface Hackathon {
  id: string
  title: string
  description: string
  image?: string
  location: string
  date: string
  closes: string
  mode?: string
  theme?: string
  status?: "OPEN" | "LIVE" | "CLOSED"
  participants?: number
  organizer?: string
  url?: string
  prizeAmount?: string
  tags?: string[]
  sourcePlatform?: string
  lastUpdated?: string
  timeline?: {
    start: string
    end: string
    registration_deadline: string
    key_dates: Array<{ date: string; event: string }>
  }
  overview?: string
  eligibility?: string[]
  requirements?: string[]
  tracks?: Array<{ name: string; description: string }>
  judges?: Array<{ name: string; role: string; image?: string }>
  judging_criteria?: string[]
  prizes?: {
    total_pool: string
    breakdown: Array<{ position: string; amount: string; sponsor?: string }>
  }
  rules?: string[]
  additional_info?: string
}

export default function HackathonDetail() {
  const params = useParams()
  const router = useRouter()
  const [hackathon, setHackathon] = useState<Hackathon | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    async function loadHackathon() {
      if (!params.id) return
      
      setIsLoading(true)
      try {
        const data = await getHackathonById(params.id as string)
        if (data) {
          // Validate and transform the status
          const validatedData = {
            ...data,
            status: (data.status === "OPEN" || data.status === "LIVE" || data.status === "CLOSED" 
              ? data.status 
              : undefined) as "OPEN" | "LIVE" | "CLOSED" | undefined
          }
          setHackathon(validatedData)
        } else {
          setHackathon(null)
        }
      } catch (error) {
        console.error("Failed to load hackathon:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadHackathon()
  }, [params.id])

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-16 h-16 border-4 border-[#1e1894]/20 border-t-[#1e1894] rounded-full animate-spin"></div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <motion.div 
          className="w-16 h-16 relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border-4 border-[#1e1894]/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#1e1894] rounded-full border-t-transparent animate-spin"></div>
        </motion.div>
      </div>
    )
  }

  if (!hackathon) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-4 text-[#1e1894]">Hackathon not found</h1>
          <Link href="/">
            <motion.button
              className="px-8 py-3 bg-[#1e1894] text-white rounded-full font-medium
                       hover:bg-[#1e1894]/90 transition-all duration-300
                       shadow-lg shadow-[#1e1894]/20 hover:shadow-xl hover:shadow-[#1e1894]/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Return to home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          filter: 'contrast(150%) brightness(150%)',
        }} />
      </div>

      <Navbar />

      <div className="w-full px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Back Button */}
          <motion.button
            onClick={() => router.back()}
            className="mb-6 px-6 py-2.5 bg-white/70 backdrop-blur-md text-[#1e1894] rounded-full font-medium
                     hover:bg-[#1e1894] hover:text-white transition-all duration-300 group
                     shadow-lg shadow-[#1e1894]/10 hover:shadow-xl hover:shadow-[#1e1894]/20
                     flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg 
              className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Hackathons
          </motion.button>

          {/* Header Section */}
          <motion.div
            className="bg-white/70 backdrop-blur-md shadow-lg rounded-3xl overflow-hidden mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white p-4 pt-6">
              <div className="relative w-full mx-auto max-w-4xl" style={{ paddingTop: "30%" }}>
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <Image 
                    src={hackathon?.image && (hackathon.image.startsWith('http') || hackathon.image.startsWith('/')) 
                      ? hackathon.image 
                      : "/default_hackathon.png"}
                    alt={hackathon?.title || "Hackathon image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent"></div>
                
                  <div className="absolute bottom-4 left-4 z-10">
                    <div className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-lg text-white inline-block">
                      <span className="font-medium text-sm">{hackathon?.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{hackathon?.title}</h1>
                    <div className="flex flex-wrap gap-3 mb-6">
                      <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-medium">
                        {hackathon?.mode || "Online"}
                      </span>
                      {hackathon?.tags?.some(tag => tag.toLowerCase().includes('theme')) && (
                        <span className="px-4 py-2 bg-purple-50 text-purple-600 rounded-xl font-medium">
                          {hackathon.tags.find(tag => tag.toLowerCase().includes('theme'))?.replace(/^theme/i, '')}
                        </span>
                      )}
                      <span className="px-4 py-2 bg-[#1e1894] text-white rounded-xl">
                        {hackathon?.location}
                      </span>
                      {hackathon?.organizer && (
                        <span className="px-4 py-2 bg-green-50 text-green-600 rounded-xl font-medium">
                          {hackathon?.organizer}
                        </span>
                      )}
                    </div>
                    {hackathon?.sourcePlatform && (
                      <div className="text-sm text-gray-500 mb-4">
                        Source: {hackathon.sourcePlatform}
                      </div>
                    )}
                  </motion.div>
                </div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <button 
                    onClick={() => router.push('/find_teammate')}
                    className="px-6 py-3 bg-white border-2 border-[#1e1894]/20 text-[#1e1894] rounded-xl font-medium
                               hover:bg-[#1e1894]/5 transition-all duration-300
                               shadow-md hover:shadow-lg 
                               flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292V15M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Find Teammates
                  </button>
                  <a 
                    href={hackathon?.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#1e1894] text-white rounded-xl font-medium
                              hover:bg-[#1e1894]/90 transition-all duration-300
                              shadow-lg shadow-[#1e1894]/20 hover:shadow-xl hover:shadow-[#1e1894]/30
                              flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                    Apply Now
                  </a>
                  <button className="px-6 py-3 bg-white border-2 border-[#1e1894] text-[#1e1894] rounded-xl 
                                   font-medium hover:bg-[#1e1894] hover:text-white transition-all duration-300
                                   shadow-lg shadow-[#1e1894]/10 hover:shadow-xl hover:shadow-[#1e1894]/20
                                   flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </button>

                  
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview Section */}
              <motion.section
                className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
                <div className="prose max-w-none text-gray-600">
                  <p className="text-lg leading-relaxed">
                    {hackathon?.description}
                  </p>
                </div>
              </motion.section>

              {/* Timeline Section - Enhanced */}
              <motion.section
                className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-lg overflow-hidden relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {/* Subtle Background Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#1e1894]/5 blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#4361ee]/5 blur-2xl"></div>
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-2">Timeline</span>
                    <div className="h-1 flex-grow bg-gradient-to-r from-[#1e1894]/20 to-transparent rounded-full"></div>
                  </h2>
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-1 p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-100 shadow-sm">
                        <div className="text-blue-600 font-medium mb-2 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Start Date
                        </div>
                        <div className="text-xl font-semibold text-gray-900">{hackathon?.date}</div>
                      </div>
                      <div className="flex-1 p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl border border-purple-100 shadow-sm">
                        <div className="text-purple-600 font-medium mb-2 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Registration Closes
                        </div>
                        <div className="text-xl font-semibold text-gray-900">{hackathon?.closes}</div>
                      </div>
                    </div>

                    <div className="relative pl-6 pt-6">
                      <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1e1894] to-[#4361ee] rounded-full"></div>
                      {[
                        { date: hackathon?.date || "Start Date", title: "Hackathon Begins", icon: "🚀" },
                        { date: hackathon?.closes || "Registration Deadline", title: "Registration Closes", icon: "🔒" }
                      ].map((phase, i) => (
                        <motion.div
                          key={i}
                          className="relative pl-10 pb-10"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#1e1894] to-[#4361ee] flex items-center justify-center text-white shadow-lg">
                            <span>{phase.icon}</span>
                          </div>
                          <div className="text-sm text-[#1e1894]/70 font-medium mb-1">{phase.date}</div>
                          <div className="font-bold text-gray-900 text-lg">{phase.title}</div>
                          <div className="mt-2 text-gray-600 text-sm">
                            {i === 0 ? "Get ready to showcase your skills and creativity." : "Last chance to join this exciting hackathon."}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Theme Section */}
              <motion.section
                className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Theme</h2>
                <div className="grid grid-cols-1 gap-6">
                  {hackathon?.tags?.some(tag => tag.toLowerCase().includes('theme')) ? (
                    hackathon.tags
                      .filter(tag => tag.toLowerCase().includes('theme'))
                      .map((tag, i) => (
                        <motion.div
                          key={i}
                          className="p-6 bg-gray-50 rounded-2xl"
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          viewport={{ once: true }}
                        >
                          <div className="text-3xl mb-4">🎯</div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{tag}</h3>
                          <p className="text-gray-600">The central theme for this hackathon</p>
                        </motion.div>
                      ))
                  ) : (
                    <motion.div
                      className="p-6 bg-gray-50 rounded-2xl text-center"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-3xl mb-4">🔍</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Theme Not Available</h3>
                      <p className="text-gray-600 mb-4">Visit the official website to learn more about the hackathon theme</p>
                      <a 
                        href={hackathon?.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 bg-[#1e1894] text-white rounded-xl font-medium
                                 hover:bg-[#1e1894]/90 transition-all duration-300
                                 shadow-lg shadow-[#1e1894]/20 hover:shadow-xl hover:shadow-[#1e1894]/30"
                      >
                        More Details
                      </a>
                    </motion.div>
                  )}
                </div>
              </motion.section>

              

              {/* Prizes Section - Enhanced */}
              <motion.section
                className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-lg overflow-hidden relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e1894] to-[#4361ee]"></div>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/10 blur-3xl"></div>
                
                <div className="absolute inset-0 opacity-10" 
                  style={{
                    backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0)`,
                    backgroundSize: '50px 50px'
                  }}
                ></div>
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="mr-2">🏆</span>
                    Prizes & Rewards
                  </h2>
                  <div className="h-1 w-20 bg-white/20 rounded-full mb-8"></div>
                  
                  {hackathon?.prizeAmount ? (
                    <div className="text-center mb-8">
                      <div className="text-white/80 mb-2">Total Prize Pool</div>
                      <div className="text-5xl font-bold text-white bg-white/10 inline-block px-8 py-3 rounded-xl backdrop-blur-sm">{hackathon.prizeAmount}</div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { position: "1st", prize: "$5,000", icon: "🏆" },
                        { position: "2nd", prize: "$3,000", icon: "🥈" },
                        { position: "3rd", prize: "$2,000", icon: "🥉" }
                      ].map((prize, i) => (
                        <motion.div
                          key={i}
                          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center
                                   border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="text-4xl mb-4">{prize.icon}</div>
                          <div className="text-white/80 mb-2">{prize.position} Place</div>
                          <div className="text-2xl font-bold text-white">{prize.prize}</div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  <div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Additional Rewards
                    </h3>
                    <ul className="space-y-3 text-white/90">
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Certificates of Participation for all contestants
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Networking opportunities with industry professionals
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Mentorship sessions for winning teams
                      </li>
                    </ul>
                  </div>
                  <div className="mt-6 text-center">
                    <a 
                      href={hackathon?.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-8 py-3 bg-white text-[#1e1894] rounded-xl font-bold
                               hover:bg-white/90 transition-all duration-300
                               shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-white/30"
                    >
                      View Official Rules
                    </a>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Quick Info Card - Enhanced */}
              <motion.section
                className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-lg relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {/* Decorative corners */}
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#1e1894]/20 rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#1e1894]/20 rounded-bl-xl"></div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-[#1e1894]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Quick Info
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 hover:bg-[#1e1894]/5 p-3 rounded-xl transition-colors duration-200">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shadow-sm">
                      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Starts On</div>
                      <div className="font-bold text-gray-900 text-lg">{hackathon?.date || "TBA"}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 hover:bg-[#1e1894]/5 p-3 rounded-xl transition-colors duration-200">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shadow-sm">
                      <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Location</div>
                      <div className="font-bold text-gray-900 text-lg">{hackathon?.location || "TBA"}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 hover:bg-[#1e1894]/5 p-3 rounded-xl transition-colors duration-200">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shadow-sm">
                      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Prize Pool</div>
                      <div className="font-bold text-gray-900 text-lg">{hackathon?.prizeAmount || "TBA"}</div>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Rules Section */}
              <motion.section
                className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Rules</h2>
                <ul className="space-y-4">
                  {[
                    "All code must be written during the hackathon",
                    "Use of open source libraries is allowed",
                    "Teams must submit a working prototype",
                    "Respect intellectual property rights"
                  ].map((rule, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <svg className="w-5 h-5 text-[#1e1894] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">{rule}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.section>

              {/* Need Help Section - Enhanced */}
              <motion.section
                className="bg-gradient-to-br from-[#1e1894] to-[#4361ee] rounded-3xl p-8 shadow-lg text-white overflow-hidden relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 blur-2xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-white/10 blur-2xl"></div>
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Need Help?
                  </h2>
                  <div className="space-y-4">
                    <button className="w-full px-6 py-3.5 bg-white text-[#1e1894] rounded-xl font-bold
                                     hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-1
                                     shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-white/30
                                     flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Join Discord
                    </button>
                    <button className="w-full px-6 py-3.5 bg-white/10 backdrop-blur-md text-white rounded-xl 
                                     font-bold hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1
                                     border border-white/20
                                     shadow-lg shadow-[#1e1894]/20 hover:shadow-xl hover:shadow-[#1e1894]/30
                                     flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Contact Support
                    </button>
                  </div>
                  <div className="mt-6 text-center">
                    <span className="text-white/70 text-sm">We are here to help you succeed!</span>
                  </div>
                </div>
              </motion.section>
              
            </div>
          </div>
        </div> 

        
      </div>

      <Footer />
      
      {/* Last Updated Information */}
      {hackathon?.lastUpdated && (
        <div className="text-center text-sm text-gray-500 pb-4">
          Hackathon details Last updated: {hackathon.lastUpdated}
        </div>
      )}
      <div className="text-center text-xs text-gray-500 pb-4 px-8 max-w-3xl mx-auto">
        Disclaimer: We do not own or organize the hackathons listed on this platform. All information is sourced from third-party websites, and we are not responsible for its accuracy, changes, or any actions taken based on this data. By participating in any listed hackathon, you agree to review the official event website for the latest details. We do not assume liability for any issues arising from participation, registration, or other interactions with the listed events.
      </div>

      
    </div>
  )
} 