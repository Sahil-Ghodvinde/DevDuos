"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FAQItem } from '@/lib/faq-data'

interface FAQDropdownProps {
  faq: FAQItem
}

export default function FAQDropdown({ faq }: FAQDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left"
      >
        <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#1e1894]"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4">
              <p className="text-gray-600 mb-4">
                {faq.question.includes("Find the Right Hackathon") && 
                  "Our platform uses advanced algorithms to match you with hackathons based on your skills, interests, and experience level. We consider factors like location, timing, and prize pools to ensure you find the perfect event."}
                {faq.question.includes("Find a Hackathon Teammate") && 
                  "Connect with potential teammates through our intelligent matching system. We analyze your skills, experience, and project preferences to help you form the ideal team for your hackathon journey."}
                {faq.question.includes("List Hackathons From Multiple Sources") && 
                  "We aggregate hackathons from various platforms, organizers, and communities to provide you with a comprehensive list of opportunities. Our system automatically updates to ensure you never miss out on relevant events."}
                {faq.question.includes("Use DevDuos Instead of Searching Manually") && 
                  "Save time and effort by using our platform instead of manually searching across multiple websites. We provide a centralized hub for all your hackathon needs, from finding events to building teams."}
              </p>
              <Link 
                href={faq.link}
                className="inline-flex items-center text-[#1e1894] hover:text-[#1e1894]/80 group"
              >
                Read more
                <svg 
                  className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 