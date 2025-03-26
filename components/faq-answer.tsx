"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FAQItem, getRelatedQuestions } from '@/lib/faq-data'

interface FAQAnswerProps {
  question: FAQItem
  children: React.ReactNode
}

export default function FAQAnswer({ question, children }: FAQAnswerProps) {
  const relatedQuestions = getRelatedQuestions(question.id)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Paper Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          filter: 'contrast(200%) brightness(150%)',
        }} />
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 text-sm text-gray-600 mb-4"
          >
            <Link 
              href="/"
              className="hover:text-[#1e1894] transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link 
              href="/faq"
              className="hover:text-[#1e1894] transition-colors"
            >
              FAQ
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#1e1894] font-medium">{question.question}</span>
          </motion.div>

          {/* Question and Answer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
          >
            <h1 className="text-4xl font-bold text-[#1e1894] mb-6">
              {question.question}
            </h1>
            
            <div className="prose prose-lg max-w-none text-gray-600">
              {children}
            </div>
          </motion.div>

          {/* Related Questions */}
          {relatedQuestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-semibold text-[#1e1894] mb-6">
                Related Questions
              </h2>
              
              <div className="grid gap-4">
                {relatedQuestions.map((relatedQuestion, index) => (
                  <motion.div
                    key={relatedQuestion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                  >
                    <Link href={relatedQuestion.link}>
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm
                                  hover:shadow-md hover:bg-white/90 transition-all duration-300
                                  border border-gray-200 hover:border-[#1e1894]/20 group">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#1e1894]">
                            {relatedQuestion.question}
                          </h3>
                          <div className="text-[#1e1894] transform group-hover:translate-x-1 transition-transform">
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
          )}
        </div>
      </main>
    </div>
  )
} 