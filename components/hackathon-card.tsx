"use client"

import Link from "next/link"
import { motion } from "framer-motion"

interface Hackathon {
  id: string
  title: string
  description: string
  location: string
  date: string
  closes: string
  mode?: "Online" | "Offline" | "Hybrid"
  theme?: string
  participants?: number
  status?: "OPEN" | "LIVE" | "CLOSED"
}

export default function HackathonCard({ hackathon }: { hackathon: Hackathon }) {
  return (
    <motion.div
      className="group relative bg-white/40 backdrop-blur-xl rounded-[2rem] overflow-hidden
                 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/60
                 hover:shadow-[0_20px_40px_rgb(30,24,148,0.08)] transition-all duration-500
                 h-[320px] p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Header Section */}
      <div className="flex flex-col gap-2 mb-6">
        <div className="text-gray-500/80 text-sm font-medium">Hackathon</div>
        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#1e1894] 
                   transition-colors duration-300 tracking-tight leading-tight"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {hackathon.title}
        </h3>
      </div>

      {/* Theme Section */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
          <span className="text-gray-600 font-medium">THEME</span>
          <div className="h-4 w-[1px] bg-gray-300"></div>
          <span className="text-gray-900 font-semibold uppercase text-sm tracking-wide">
            {hackathon.theme || "BLOCKCHAIN"}
          </span>
        </div>
      </div>

      {/* Participants */}
      <div className="flex items-center gap-2 mb-8">
        <div className="flex -space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"
            />
          ))}
        </div>
        <span className="text-emerald-500 font-medium">
          +{hackathon.participants || "1000"} participating
        </span>
      </div>

      {/* Status Tags */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Mode Badge */}
        <div className={`px-4 py-2 rounded-full text-sm font-medium ${
          hackathon.mode === 'Online' 
            ? 'bg-blue-50 text-blue-600' 
            : hackathon.mode === 'Offline'
            ? 'bg-purple-50 text-purple-600'
            : 'bg-emerald-50 text-emerald-600'
        }`}>
          {hackathon.mode || 'ONLINE'}
        </div>

        {/* Status Badge */}
        <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
          {hackathon.status || 'OPEN'}
        </div>

        {/* Date Badge */}
        <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
          STARTS {hackathon.date}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-8 right-8 flex items-center gap-3">
        <motion.button
          className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200
                     transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </motion.button>
        <motion.button
          className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200
                     transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </motion.button>
      </div>

      {/* Apply Button */}
      <Link href={`/${hackathon.id}`}>
        <motion.button 
          className="absolute bottom-8 right-8 px-6 py-3 rounded-full
                     bg-[#4361ee] text-white font-medium
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
    </motion.div>
  )
}

