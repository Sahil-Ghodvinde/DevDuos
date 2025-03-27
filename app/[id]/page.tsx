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

function processDescription(description: string) {
  // Clean and normalize the text
  const cleanText = (text: string) => {
    // Remove multiple spaces and normalize line breaks
    let cleaned = text.replace(/\s+/g, ' ').trim();
    
    // Fix common scraping issues
    cleaned = cleaned
      // Fix common word joins
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // Fix common punctuation issues
      .replace(/([.!?])([A-Z])/g, '$1 $2')
      // Fix common spacing issues
      .replace(/([a-z])([0-9])/g, '$1 $2')
      .replace(/([0-9])([a-z])/g, '$1 $2')
      // Remove unwanted characters
      .replace(/[^\w\s.,!?-]/g, '')
      // Fix multiple punctuation
      .replace(/([.,!?])\1+/g, '$1')
      // Add space after punctuation
      .replace(/([.,!?])([A-Za-z])/g, '$1 $2')
      // Remove extra spaces
      .replace(/\s+/g, ' ')
      .trim();

    // Capitalize first letter of sentences
    cleaned = cleaned.replace(/(^\w|\.\s+\w)/gm, letter => letter.toUpperCase());

    return cleaned;
  };

  // Split the description into paragraphs and clean each
  const paragraphs = description
    .split('\n')
    .map(p => cleanText(p))
    .filter(p => p.trim());
  
  // Process each paragraph to identify key sections
  const sections: {
    main: string;
    highlights: string[];
    requirements: string[];
    benefits: string[];
  } = {
    main: '',
    highlights: [],
    requirements: [],
    benefits: []
  };

  // Keywords to identify different sections
  const keywords = {
    highlights: ['highlight', 'feature', 'key', 'main', 'focus', 'about', 'overview', 'introduction'],
    requirements: ['requirement', 'need', 'must', 'should', 'eligible', 'qualification', 'prerequisite'],
    benefits: ['benefit', 'reward', 'gain', 'get', 'win', 'prize', 'opportunity', 'advantage']
  };

  // Process each paragraph
  paragraphs.forEach(paragraph => {
    const lowerParagraph = paragraph.toLowerCase();
    
    // Skip very short paragraphs
    if (paragraph.length < 20) return;
    
    // Check if paragraph contains section keywords
    if (keywords.highlights.some(keyword => lowerParagraph.includes(keyword))) {
      sections.highlights.push(paragraph);
    } else if (keywords.requirements.some(keyword => lowerParagraph.includes(keyword))) {
      sections.requirements.push(paragraph);
    } else if (keywords.benefits.some(keyword => lowerParagraph.includes(keyword))) {
      sections.benefits.push(paragraph);
    } else {
      // If no keywords found, treat as main description
      sections.main = paragraph;
    }
  });

  // If no main description was found, use the first paragraph
  if (!sections.main && paragraphs.length > 0) {
    sections.main = paragraphs[0];
  }

  // Clean up sections
  (Object.keys(sections) as Array<keyof typeof sections>).forEach(key => {
    if (key !== 'main' && Array.isArray(sections[key])) {
      sections[key] = (sections[key] as string[]).filter(p => p.length > 20);
    }
  });

  return sections;
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

  const descriptionSections = hackathon?.description ? processDescription(hackathon.description) : null;

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
            className="mb-4 md:mb-6 px-4 md:px-6 py-2 md:py-2.5 bg-white/70 backdrop-blur-md text-[#1e1894] rounded-full font-medium
                     hover:bg-[#1e1894] hover:text-white transition-all duration-300 group
                     shadow-lg shadow-[#1e1894]/10 hover:shadow-xl hover:shadow-[#1e1894]/20
                     flex items-center gap-2 text-sm md:text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg 
              className="w-4 h-4 md:w-5 md:h-5 transform transition-transform group-hover:-translate-x-1" 
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
            <div className="bg-white p-0 md:p-4 pt-0 md:pt-6">
              <div className="relative w-full mx-auto" style={{ paddingTop: "40%" }}>
                <div className="absolute inset-0">
                  <Image 
                    src={hackathon?.image && (hackathon.image.startsWith('http') || hackathon.image.startsWith('/')) 
                      ? hackathon.image 
                      : "/default_hackathon.png"}
                    alt={hackathon?.title || "Hackathon image"}
                    fill
                    sizes="100vw"
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

            <div className="p-4 md:p-8">
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">{hackathon?.title}</h1>
                    <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
                      <span className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-50 text-blue-600 rounded-xl font-medium text-sm md:text-base">
                        {hackathon?.mode || "Online"}
                      </span>
                      {hackathon?.tags?.some(tag => tag.toLowerCase().includes('theme')) && (
                        <span className="px-3 py-1.5 md:px-4 md:py-2 bg-purple-50 text-purple-600 rounded-xl font-medium text-sm md:text-base">
                          {hackathon.tags.find(tag => tag.toLowerCase().includes('theme'))?.replace(/^theme/i, '')}
                        </span>
                      )}
                      <span className="px-3 py-1.5 md:px-4 md:py-2 bg-[#1e1894] text-white rounded-xl text-sm md:text-base">
                        {hackathon?.location}
                      </span>
                      {hackathon?.organizer && (
                        <span className="px-3 py-1.5 md:px-4 md:py-2 bg-green-50 text-green-600 rounded-xl font-medium text-sm md:text-base">
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

                {/* Desktop-only buttons */}
                <motion.div
                  className="hidden md:flex flex-col sm:flex-row gap-4"
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
              {/* Overview Section - Enhanced */}
              <motion.section
                className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-lg overflow-hidden relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {/* Decorative Background */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br from-[#1e1894]/5 to-[#4361ee]/5 blur-3xl"></div>
                  <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-gradient-to-tl from-[#1e1894]/5 to-[#4361ee]/5 blur-3xl"></div>
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <svg className="w-6 h-6 text-[#1e1894]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Overview
                    </h2>
                    <div className="h-1 w-32 bg-gradient-to-r from-[#1e1894]/20 to-transparent rounded-full"></div>
                  </div>

                  {/* Main Description */}
                  <div className="prose max-w-none mb-8">
                    {descriptionSections ? (
                      <div className="space-y-8">
                        {/* Main Description */}
                        {descriptionSections.main && (
                          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                            <p className="text-lg leading-relaxed text-gray-600">
                              {descriptionSections.main}
                            </p>
                          </div>
                        )}

                        {/* Highlights */}
                        {descriptionSections.highlights.length > 0 && (
                          <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                              <svg className="w-5 h-5 text-[#1e1894]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              Key Highlights
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {descriptionSections.highlights.map((highlight, index) => (
                                <div key={index} className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                                  <p className="text-gray-700">{highlight}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Requirements */}
                        {descriptionSections.requirements.length > 0 && (
                          <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                              <svg className="w-5 h-5 text-[#1e1894]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Requirements
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {descriptionSections.requirements.map((req, index) => (
                                <div key={index} className="bg-purple-50/50 rounded-xl p-4 border border-purple-100">
                                  <p className="text-gray-700">{req}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Benefits */}
                        {descriptionSections.benefits.length > 0 && (
                          <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                              <svg className="w-5 h-5 text-[#1e1894]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Benefits & Rewards
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {descriptionSections.benefits.map((benefit, index) => (
                                <div key={index} className="bg-green-50/50 rounded-xl p-4 border border-green-100">
                                  <p className="text-gray-700">{benefit}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                        <p className="text-lg leading-relaxed text-gray-600">
                    {hackathon?.description}
                  </p>
                      </div>
                    )}
                  </div>

                  {/* Key Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Mode & Location */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Participation Mode</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          <span className="text-gray-600">{hackathon?.mode || "Online"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          <span className="text-gray-600">{hackathon?.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Organizer & Platform */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6 border border-purple-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                          <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Organizer Details</h3>
                      </div>
                      <div className="space-y-2">
                        {hackathon?.organizer && (
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            <span className="text-gray-600">{hackathon.organizer}</span>
                          </div>
                        )}
                        {hackathon?.sourcePlatform && (
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            <span className="text-gray-600">Source: {hackathon.sourcePlatform}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tags & Themes */}
                  {hackathon?.tags && hackathon.tags.length > 0 && (
                    <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-6 border border-green-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Tags & Themes</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {hackathon.tags
                          .filter(tag => {
                            // Filter out unwanted tags
                            const unwantedTags = [
                              'helpcopy email address',
                              'contact uscopy email address',
                              'copy email address',
                              'email address',
                              'contact us',
                              'help',
                              'copy'
                            ];
                            return !unwantedTags.some(unwanted => 
                              tag.toLowerCase().includes(unwanted.toLowerCase())
                            );
                          })
                          .map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 border border-gray-200 hover:bg-green-50/50 transition-colors duration-200"
                            >
                              {tag.replace(/^theme/i, '').trim()}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
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
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br from-[#1e1894]/10 to-[#4361ee]/10 blur-3xl"></div>
                  <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-gradient-to-tl from-[#1e1894]/10 to-[#4361ee]/10 blur-3xl"></div>
                  <div className="absolute inset-0 opacity-5" 
                    style={{
                      backgroundImage: `radial-gradient(circle at 25px 25px, #1e1894 1px, transparent 0)`,
                      backgroundSize: '50px 50px'
                    }}
                  ></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <svg className="w-6 h-6 text-[#1e1894]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Timeline
                    </h2>
                    <div className="h-1 w-32 bg-gradient-to-r from-[#1e1894]/20 to-transparent rounded-full"></div>
                  </div>

                  {/* Key Dates Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <motion.div
                      className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-blue-600 font-medium">Start Date</div>
                          <div className="text-xl font-bold text-gray-900">{hackathon?.date}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">Get ready to showcase your skills and creativity</div>
                    </motion.div>

                    <motion.div
                      className="group p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                          <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-purple-600 font-medium">Registration Closes</div>
                          <div className="text-xl font-bold text-gray-900">{hackathon?.closes}</div>
                    </div>
                    </div>
                      <div className="text-sm text-gray-600">Last chance to join this exciting hackathon</div>
                    </motion.div>
                  </div>

                  {/* Timeline Visualization */}
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1e1894] to-[#4361ee] rounded-full"></div>
                    
                    {/* Timeline Events */}
                    <div className="space-y-8">
                      {[
                        { 
                          date: hackathon?.date || "Start Date", 
                          title: "Hackathon Begins", 
                          icon: "🚀",
                          description: "Get ready to showcase your skills and creativity",
                          color: "blue"
                        },
                        { 
                          date: hackathon?.closes || "Registration Deadline", 
                          title: "Registration Closes", 
                          icon: "🔒",
                          description: "Last chance to join this exciting hackathon",
                          color: "purple"
                        }
                    ].map((phase, i) => (
                      <motion.div
                        key={i}
                          className="relative pl-12"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                          {/* Event Marker */}
                          <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-gradient-to-r from-[#1e1894] to-[#4361ee] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <span className="text-xl">{phase.icon}</span>
                          </div>

                          {/* Event Content */}
                          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`text-sm font-medium px-3 py-1 rounded-full bg-${phase.color}-50 text-${phase.color}-600`}>
                                {phase.date}
                              </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{phase.title}</h3>
                            <p className="text-gray-600">{phase.description}</p>
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
                        For certificates and other info click on the apply button
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

      {/* Mobile Fixed Bottom Buttons */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => router.push('/find_teammate')}
            className="flex-[2] px-4 py-2.5 bg-white border-2 border-[#1e1894]/20 text-[#1e1894] rounded-xl font-medium
                     text-sm flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292V15M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Find Team
          </button>
          <a 
            href={hackathon?.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2.5 bg-[#1e1894] text-white rounded-xl font-medium
                     text-sm flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            Apply
          </a>
          <button className="w-10 h-10 bg-white border-2 border-[#1e1894] text-[#1e1894] rounded-xl 
                           font-medium flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      
    </div>
  )
} 