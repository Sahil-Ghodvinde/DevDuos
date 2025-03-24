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

  return (
    <motion.div
      className="group relative bg-white/40 backdrop-blur-xl rounded-[2rem] overflow-hidden
                 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/60
                 hover:shadow-[0_20px_40px_rgb(30,24,148,0.08)] transition-all duration-500
                 min-h-[280px] p-6 sm:p-8 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={handleCardClick}
    >
      {/* Header Section */}
      <div className="flex flex-col gap-2 mb-4 sm:mb-6">
        <div className="text-gray-500/80 text-sm font-medium">Hackathon</div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-[#1e1894] 
                   transition-colors duration-300 tracking-tight leading-tight"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {hackathon.title}
        </h3>
      </div>

      {/* Theme Section */}
      <div className="mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 rounded-full">
          <span className="text-gray-600 font-medium text-xs sm:text-sm">THEME</span>
          <div className="h-3 sm:h-4 w-[1px] bg-gray-300"></div>
          <span className="text-gray-900 font-semibold uppercase text-xs sm:text-sm tracking-wide">
            {displayTheme}
          </span>
        </div>
      </div>

      {/* Status Tags */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {/* Mode Badge */}
        <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
          hackathon.mode === 'Online' 
            ? 'bg-blue-50 text-blue-600' 
            : hackathon.mode === 'Offline'
            ? 'bg-green-50 text-green-600'
            : 'bg-emerald-50 text-emerald-600'
        }`}>
          {hackathon.mode || 'ONLINE'}
        </div>

        {/* Status Badge */}
        <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-600 rounded-full text-xs sm:text-sm font-medium">
          {hackathon.status || 'OPEN'}
        </div>

        {/* Date Badge */}
        <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-600 rounded-full text-xs sm:text-sm font-medium">
          STARTS {hackathon.date}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 flex items-center gap-2 sm:gap-3 z-10">
        <motion.button
          className="p-2 sm:p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200
                     transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </motion.button>
        <motion.button
          className="p-2 sm:p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200
                     transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </motion.button>
      </div>

      {/* Apply Button */}
      <div 
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <Link href={`/${hackathon.id}`}>
          <motion.button 
            className="px-4 sm:px-6 py-2 sm:py-3 rounded-full
                      bg-[#1e1894] text-white text-sm sm:text-base font-medium
                      hover:bg-[#3730a3] 
                      transition-all duration-300
                      shadow-lg shadow-[#4361ee]/20
                      hover:shadow-xl hover:shadow-[#4361ee]/30"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Apply now
          </motion.button>
        </Link>
      </div>
    </motion.div>
  )
}

