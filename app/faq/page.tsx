"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { faqCategories } from '@/lib/faq-data'

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
      const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  })).filter(category => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Paper Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          filter: 'contrast(200%) brightness(150%)',
        }} />
      </div>

      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-[#1e1894] mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-600">Find answers to common questions about hackathons and our platform.</p>
          </motion.div>

          {/* Search and Filter Section */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/80 border-2 border-gray-200 
                         focus:outline-none focus:border-[#1e1894] focus:ring-2 focus:ring-[#1e1894]/20
                         transition-all duration-300"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <motion.button
                key="All"
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === 'All'
                    ? 'bg-[#1e1894] text-white'
                    : 'bg-white/80 text-gray-600 hover:bg-[#1e1894]/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                All
              </motion.button>
              {faqCategories.map((category) => (
                <motion.button
                  key={category.title}
                  onClick={() => setSelectedCategory(category.title)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.title
                      ? 'bg-[#1e1894] text-white'
                      : 'bg-white/80 text-gray-600 hover:bg-[#1e1894]/5'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.title}
                </motion.button>
              ))}
            </div>
          </div>

          {/* FAQ List by Category */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            <AnimatePresence>
              {filteredFAQs.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
                >
                  <h2 className="text-2xl font-semibold text-[#1e1894] mb-6">
                    {category.title}
                  </h2>
                  
                  <div className="space-y-4">
                    {category.questions.map((faq, index) => (
                      <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Link href={faq.link}>
                          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm
                                       hover:shadow-md hover:bg-white/90 transition-all duration-300
                                       border border-gray-200 hover:border-[#1e1894]/20">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-sm font-medium text-[#1e1894]/60 mb-2 block">
                                  {faq.category}
                                </span>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {faq.question}
                                </h3>
                              </div>
                              <div className="text-[#1e1894]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                        d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredFAQs.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-gray-600">No questions found matching your criteria.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
