"use client"

import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative">
      {/* Background Patterns & Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle Grain Texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            filter: 'contrast(170%) brightness(150%)',
          }} />
        </div>
        
        {/* Large Decorative Elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-[5%] right-[5%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#1e1894]/5 to-[#4361ee]/5 blur-3xl"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute top-[40%] left-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#1e1894]/3 to-[#4361ee]/0 blur-3xl"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          className="absolute bottom-[5%] right-[15%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#4361ee]/3 to-[#1e1894]/0 blur-3xl"
        ></motion.div>
        
        {/* Grid Lines */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, #1e1894 1px, transparent 1px),
                              linear-gradient(to bottom, #1e1894 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        ></div>
        
        {/* Floating Elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-[#1e1894]/10 to-[#4361ee]/10"
            style={{
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              top: `${10 + Math.random() * 80}%`,
              left: `${10 + Math.random() * 80}%`,
              filter: 'blur(5px)',
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 5 + Math.random() * 5,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <div className="w-full px-2 md:px-4 pt-6 md:pt-12">
          <div className="mx-auto max-w-7xl">
            <section className="py-2 md:py-4">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md shadow-2xl rounded-2xl md:rounded-3xl p-6 md:p-10 border border-white/60 relative overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#1e1894]/5 blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[#4361ee]/5 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-[30px] border-[#1e1894]/3 rounded-full opacity-20 animate-pulse"></div>
                
                {/* Section Title */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center mb-10 md:mb-14 relative z-10"
                >
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="inline-block text-sm bg-gradient-to-r from-[#1e1894]/90 to-[#4361ee]/90 text-white font-medium uppercase tracking-wider px-4 py-1 rounded-full mb-3 shadow-sm"
                  >
                    Our Story
                  </motion.span>
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-4xl md:text-6xl font-extrabold text-[#1e1894] tracking-tight mt-2"
                  >
                    About <span className="relative inline-block">
                      DevDuos
                      <span className="absolute bottom-0 left-0 w-full h-[10px] bg-gradient-to-r from-[#1e1894]/20 to-[#4361ee]/20 -z-10 rounded-full"></span>
                    </span>
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto mt-6"
                  >
                    Created by developers, for developers – building the ultimate hackathon platform
                  </motion.p>
                </motion.div>

                {/* Company Logo and Name */}
                <motion.div 
                  className="flex items-center justify-center gap-6 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <motion.div 
                    whileHover={{ y: -5, rotateZ: -5, transition: { duration: 0.2 } }}
                    className="w-24 h-24 bg-gradient-to-br from-[#1e1894] to-[#4361ee] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#1e1894]/20 transform rotate-3"
                  >
                    <span className="text-white text-4xl font-bold">DD</span>
                  </motion.div>
                  <div className="text-left">
                    <h2 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#1e1894] to-[#4361ee]">DevDuos</h2>
                    <p className="text-gray-600 text-lg">Est. January 2024</p>
                  </div>
                </motion.div>
              </motion.div>
            </section>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="w-full px-2 md:px-4 py-6">
          <div className="mx-auto max-w-7xl">
            <section className="py-2 md:py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Mission Card */}
                <motion.div
                  initial={{ opacity: 0, x: -30, rotateY: 10 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ translateY: -10, transition: { duration: 0.2 } }}
                  className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md shadow-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/60 relative overflow-hidden transform perspective-1000"
                >
                  {/* Decorative Elements */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#1e1894]/5 blur-3xl"></div>
                  <div className="absolute top-1/2 right-0 w-3 h-24 bg-gradient-to-b from-[#1e1894] to-[#4361ee] rounded-l-full opacity-40"></div>
                  
                  <div className="relative z-10">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1e1894]/10 to-[#4361ee]/10 flex items-center justify-center mb-5 shadow-lg"
                    >
                      <span className="text-3xl">🎯</span>
                    </motion.div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1e1894] mb-4">Our Mission</h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      To create a centralized platform that connects hackathon enthusiasts with the right opportunities and teammates, making the process of participating in hackathons seamless and productive.
                    </p>
                  </div>
                </motion.div>
                
                {/* Vision Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30, rotateY: -10 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ translateY: -10, transition: { duration: 0.2 } }}
                  className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md shadow-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/60 relative overflow-hidden transform perspective-1000"
                >
                  {/* Decorative Elements */}
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#4361ee]/5 blur-3xl"></div>
                  <div className="absolute top-1/2 left-0 w-3 h-24 bg-gradient-to-b from-[#4361ee] to-[#1e1894] rounded-r-full opacity-40"></div>
                  
                  <div className="relative z-10">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4361ee]/10 to-[#1e1894]/10 flex items-center justify-center mb-5 shadow-lg"
                    >
                      <span className="text-3xl">🔮</span>
                    </motion.div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1e1894] mb-4">Our Vision</h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      To foster a global community of innovators where every developer can find their perfect hackathon match and build groundbreaking projects through effective collaboration.
                    </p>
                  </div>
                </motion.div>
              </div>
            </section>
          </div>
        </div>

        {/* Founder Cards */}
        <div className="w-full px-2 md:px-4 py-6">
          <div className="mx-auto max-w-7xl">
            <section className="py-2 md:py-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md shadow-2xl rounded-2xl md:rounded-3xl p-6 md:p-10 border border-white/60 relative overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#1e1894]/5 blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[#4361ee]/5 blur-3xl"></div>
                
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center mb-12 relative z-10"
                >
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="inline-block text-sm bg-gradient-to-r from-[#1e1894]/90 to-[#4361ee]/90 text-white font-medium uppercase tracking-wider px-4 py-1 rounded-full mb-3 shadow-sm"
                  >
                    Meet the Team
                  </motion.span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e1894] mt-1 tracking-tight">
                    Our <span className="relative inline-block">
                      Founders
                      <span className="absolute bottom-0 left-0 w-full h-[7px] bg-gradient-to-r from-[#1e1894]/20 to-[#4361ee]/20 -z-10 rounded-full"></span>
                    </span>
                  </h2>
                </motion.div>
                
                {/* Founder Cards */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                  {[
                    {
                      name: "Sahil Gawli",
                      role: "Founder, IT Engineer",
                      emoji: "👨‍💻",
                      bio: "Passionate about creating developer tools that solve real problems. Experienced in full-stack development and hackathon organization.",
                      skills: ["React", "Next.js", "Node.js"]
                    },
                    {
                      name: "Sahil Ghodvinde",
                      role: "Founder, IT Engineer",
                      emoji: "👨‍💻",
                      bio: "Dedicated to building intuitive user experiences and scalable applications. Background in UI/UX design and backend architecture.",
                      skills: ["TypeScript", "UI/UX", "Database Design"]
                    }
                  ].map((founder, i) => (
                    <motion.div
                      key={i}
                      className="bg-gradient-to-br from-white to-white/90 rounded-2xl p-6 md:p-8 shadow-xl border border-white/60 group"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
                      viewport={{ once: true, margin: "-50px" }}
                      whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    >
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <motion.div 
                          whileHover={{ 
                            rotate: 5,
                            scale: 1.05,
                            transition: { duration: 0.2 }
                          }}
                          className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#1e1894] to-[#4361ee] flex items-center justify-center shadow-xl shadow-[#1e1894]/30 group-hover:shadow-2xl group-hover:shadow-[#1e1894]/40 transition-all duration-300"
                        >
                          <span className="text-5xl">{founder.emoji}</span>
                        </motion.div>
                        <div className="flex-1 text-center md:text-left">
                          <div className="relative inline-block group-hover:scale-105 transition-transform duration-300">
                            <h3 className="text-2xl font-bold text-[#1e1894]">{founder.name}</h3>
                            <div className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-[#1e1894]/30 to-[#4361ee]/30 rounded-full transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 md:scale-x-50 md:group-hover:scale-x-100"></div>
                          </div>
                          <p className="text-gray-500 mb-4 mt-1">{founder.role}</p>
                          <p className="text-gray-600 mb-5 leading-relaxed">{founder.bio}</p>
                          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {founder.skills.map((skill, j) => (
                              <motion.span 
                                key={j} 
                                className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#1e1894]/10 to-[#4361ee]/10 text-[#1e1894] shadow-sm hover:shadow-md transition-shadow duration-300"
                                whileHover={{ y: -2, transition: { duration: 0.1 } }}
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>
          </div>
        </div>

        {/* Our Journey Timeline */}
        <div className="w-full px-2 md:px-4 py-6">
          <div className="mx-auto max-w-7xl">
            <section className="py-2 md:py-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md shadow-2xl rounded-2xl md:rounded-3xl p-6 md:p-10 border border-white/60 relative overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#1e1894]/5 blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[#4361ee]/5 blur-3xl"></div>

                <div className="relative z-10">
                  {/* Section Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 relative z-10"
                  >
                    <motion.span 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="inline-block text-sm bg-gradient-to-r from-[#1e1894]/90 to-[#4361ee]/90 text-white font-medium uppercase tracking-wider px-4 py-1 rounded-full mb-3 shadow-sm"
                    >
                      Our History
                    </motion.span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e1894] mt-1 tracking-tight">
                      The DevDuos <span className="relative inline-block">
                        Journey
                        <span className="absolute bottom-0 left-0 w-full h-[7px] bg-gradient-to-r from-[#1e1894]/20 to-[#4361ee]/20 -z-10 rounded-full"></span>
                      </span>
                    </h2>
                  </motion.div>
                  
                  {/* Timeline */}
                  <div className="space-y-0 max-w-4xl mx-auto relative">
                    {/* Timeline Line */}
                    <div className="absolute left-[32px] md:left-8 top-12 bottom-0 w-[3px] bg-gradient-to-b from-[#1e1894]/30 via-[#4361ee]/30 to-[#1e1894]/30 z-0 rounded-full hidden md:block"></div>
                    
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
                      },
                      {
                        date: "April 2024",
                        title: "Feature Expansion",
                        content: "Added team matching algorithms, real-time analytics, and integrated chat functionality to enhance the hackathon experience.",
                        icon: "✨"
                      }
                    ].map((milestone, i) => (
                      <motion.div
                        key={i}
                        className="relative pl-0 md:pl-16 mb-10 md:mb-14"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.15 }}
                        viewport={{ once: true, margin: "-50px" }}
                      >
                        {/* Timeline connector and icon (only visible on desktop) */}
                        <div className="absolute left-0 top-0 hidden md:block">
                          <motion.div 
                            whileHover={{ rotate: 10, scale: 1.05 }}
                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1e1894] to-[#4361ee] flex items-center justify-center text-3xl shadow-xl shadow-[#1e1894]/20 border-4 border-white z-10 relative"
                          >
                            <span className="text-white">{milestone.icon}</span>
                          </motion.div>
                          <div className="absolute left-8 top-8 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 border-4 border-[#1e1894]/20"></div>
                        </div>
                        
                        {/* Timeline card */}
                        <div className="md:ml-6">
                          {/* Mobile icon (only visible on mobile) */}
                          <div className="flex items-center mb-4 md:hidden">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1e1894] to-[#4361ee] flex items-center justify-center text-2xl shadow-lg shadow-[#1e1894]/20 border-2 border-white">
                              <span className="text-white">{milestone.icon}</span>
                            </div>
                            <div className="bg-[#1e1894]/10 text-[#1e1894] text-sm font-medium px-3 py-1 rounded-full ml-3">
                              {milestone.date}
                            </div>
                          </div>
                          
                          {/* Card */}
                          <motion.div
                            whileHover={{ 
                              y: -5,
                              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
                            }}
                            className="bg-gradient-to-br from-white to-white/90 rounded-2xl p-6 md:p-8 shadow-lg border border-white/80 group relative"
                          >
                            <div className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-[#1e1894] to-[#4361ee] rounded-r-full"></div>
                            
                            <div className="flex flex-col gap-3">
                              <div className="flex flex-wrap items-center justify-between">
                                <h3 className="text-2xl font-bold text-[#1e1894] group-hover:translate-x-1 transition-transform duration-300">{milestone.title}</h3>
                                {/* Date tag (hidden on mobile) */}
                                <span className="hidden md:block bg-[#1e1894]/10 text-[#1e1894] text-sm font-medium px-3 py-1 rounded-full">
                                  {milestone.date}
                                </span>
                              </div>
                              <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 0.8, delay: i * 0.15 + 0.3 }}
                                viewport={{ once: true }}
                                className="h-[1px] bg-gradient-to-r from-[#1e1894]/30 to-transparent"
                              ></motion.div>
                              <p className="text-gray-600 leading-relaxed">{milestone.content}</p>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </section>
          </div>
        </div>

        {/* Contact Section */}
        <div className="w-full px-2 md:px-4 py-6 mb-10">
          <div className="mx-auto max-w-7xl">
            <section className="py-2 md:py-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md shadow-2xl rounded-2xl md:rounded-3xl p-6 md:p-10 border border-white/60 relative overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-[#1e1894]/5 to-[#4361ee]/10 blur-3xl"></div>
                
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center mb-10 relative z-10"
                >
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="inline-block text-sm bg-gradient-to-r from-[#1e1894]/90 to-[#4361ee]/90 text-white font-medium uppercase tracking-wider px-4 py-1 rounded-full mb-3 shadow-sm"
                  >
                    Get in Touch
                  </motion.span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e1894] mt-1 tracking-tight">
                    Let&apos;s <span className="relative inline-block">
                      Connect
                      <span className="absolute bottom-0 left-0 w-full h-[7px] bg-gradient-to-r from-[#1e1894]/20 to-[#4361ee]/20 -z-10 rounded-full"></span>
                    </span>
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
                    Have questions, feedback, or interested in collaboration? Reach out to our team.
                  </p>
                </motion.div>
                
                {/* Contact Button */}
                <div className="text-center">
                  <motion.button 
                    className="px-8 py-4 bg-gradient-to-r from-[#1e1894] to-[#4361ee] text-white rounded-full text-lg font-bold
                             shadow-xl shadow-[#1e1894]/20 hover:shadow-2xl hover:shadow-[#1e1894]/30
                             hover:translate-y-[-4px] transition-all duration-300 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center gap-3">
                      Contact Us
                      <motion.svg 
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor"
                        initial={{ x: 0 }}
                        animate={{ x: [0, 5, 0] }}
                        transition={{ 
                          duration: 1.5, 
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </motion.svg>
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            </section>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
