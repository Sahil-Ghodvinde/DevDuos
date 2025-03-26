"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface Hackathon {
  id: string
  title: string
  description: string
  location: string
  date: string
  closes: string
  mode?: "Online" | "Offline" | "Hybrid"
  theme?: string
  tags?: string[]
  status?: "OPEN" | "LIVE" | "CLOSED"
}

export default function HackathonCard({ hackathon }: { hackathon: Hackathon }) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/${hackathon.id}`)
  }

  const themeTag = hackathon?.tags?.find(tag => tag.toLowerCase().includes('theme'))
  const displayTheme = themeTag ? themeTag.replace(/^theme/i, '') : "BLOCKCHAIN"
  
  // Determine status color and style
  const getStatusStyle = (status?: string) => {
    switch(status) {
      case 'OPEN': return 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-sm shadow-emerald-500/30';
      case 'LIVE': return 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm shadow-orange-500/30';
      case 'CLOSED': return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-sm shadow-gray-500/20';
      default: return 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-sm shadow-emerald-500/30';
    }
  }
  
  // Format date nicer
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl
                 transition-all duration-500 min-h-[300px] cursor-pointer 
                 bg-white shadow-xl hover:shadow-2xl shadow-gray-200/80 hover:shadow-[#1e1894]/20
                 border border-gray-100 hover:border-[#1e1894]/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={handleCardClick}
    >
      {/* Decorative Background Elements - Enhanced */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-gradient-to-br from-[#1e1894] to-[#4361ee]"></div>
        <div className="absolute -left-20 -bottom-20 w-40 h-40 rounded-full bg-gradient-to-tl from-[#1e1894] to-[#4361ee]"></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       w-40 h-40 rounded-full border-8 border-dashed border-[#1e1894]/20 animate-slow-spin"></div>
      </div>
      
      {/* Status Tag - Top Left, More Prominent */}
      <div className="absolute top-5 left-5 z-20">
        <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${getStatusStyle(hackathon.status)}`}>
          {hackathon.status || 'OPEN'}
        </div>
      </div>
      
      <div className="p-5 pt-16">
        {/* Theme - Smaller but eye-catching */}
        <div className="mb-2">
          <span className="inline-block text-sm font-bold text-[#1e1894] bg-[#1e1894]/5 px-3 py-1 rounded-full border border-[#1e1894]/10">
            {displayTheme}
          </span>
        </div>
        
        {/* Large Title - Main Focal Point - Enhanced */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 group-hover:text-[#1e1894] 
                      transition-colors duration-300 mb-3 tracking-tight leading-tight
                      font-display"
        >
          <span className="bg-gradient-to-r from-gray-900 to-gray-700 group-hover:from-[#1e1894] group-hover:to-[#4361ee] bg-clip-text text-transparent transition-all duration-300">
            {hackathon.title}
          </span>
        </h2>
        
        {/* Description - Clean and Simple */}
        <p className="text-gray-600 text-sm mb-5 line-clamp-2">
          {hackathon.description || "Join this exciting hackathon and showcase your skills!"}
        </p>
        
        {/* Info Cards - Visual Hierarchy - Enhanced */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Date Card */}
          <div className="bg-gradient-to-br from-gray-50 to-white p-3 rounded-xl border border-gray-100 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-[#1e1894]/10">
            <div className="text-xs text-gray-500 uppercase mb-1 font-medium">Starts</div>
            <div className="font-bold text-gray-800 group-hover:text-[#1e1894] transition-colors duration-300">{formatDate(hackathon.date)}</div>
          </div>
          
          {/* Location Card */}
          <div className="bg-gradient-to-br from-gray-50 to-white p-3 rounded-xl border border-gray-100 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-[#1e1894]/10">
            <div className="text-xs text-gray-500 uppercase mb-1 font-medium">Location</div>
            <div className="font-bold text-gray-800 truncate group-hover:text-[#1e1894] transition-colors duration-300">{hackathon.location}</div>
          </div>
        </div>
        
        {/* Mode Tag and Apply Button - Bottom Row - Enhanced */}
        <div className="flex items-center justify-between mt-auto">
          <div className="py-2 px-4 bg-[#1e1894]/10 text-[#1e1894] text-sm font-bold rounded-full backdrop-blur-sm border border-[#1e1894]/5">
            {hackathon.mode || 'ONLINE'}
          </div>
          
          <Link href={`/${hackathon.id}`} onClick={(e) => e.stopPropagation()}>
            <motion.button 
              className="flex items-center gap-2 px-6 py-2.5 rounded-full
                        bg-gradient-to-r from-[#4361ee] to-[#1e1894] text-white font-bold text-base
                        hover:bg-[#313ac9] shadow-lg shadow-[#1e1894]/20 hover:shadow-xl hover:shadow-[#1e1894]/40
                        border border-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply Now
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

