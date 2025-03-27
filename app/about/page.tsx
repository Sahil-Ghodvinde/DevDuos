"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative">
      {/* Background Patterns & Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle Grain Texture */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            filter: 'contrast(170%) brightness(150%)',
          }} />
        </div>
        
        {/* Large Decorative Elements */}
        <div className="absolute top-[5%] right-[5%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#1e1894]/5 to-[#4361ee]/5 blur-3xl"></div>
        <div className="absolute top-[40%] left-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#1e1894]/3 to-[#4361ee]/0 blur-3xl"></div>
        <div className="absolute bottom-[5%] right-[15%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#4361ee]/3 to-[#1e1894]/0 blur-3xl"></div>
        
        {/* Grid Lines */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, #1e1894 1px, transparent 1px),
                              linear-gradient(to bottom, #1e1894 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        ></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <div className="w-full px-4 pt-6 md:pt-12">
          <div className="mx-auto max-w-7xl">
            <section className="py-4">
              <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 md:p-10 border border-white/60 relative overflow-hidden">
                {/* Section Title */}
                <div className="text-center mb-10 relative z-10">
                  <span className="inline-block text-sm bg-gradient-to-r from-[#1e1894]/90 to-[#4361ee]/90 text-white font-medium uppercase tracking-wider px-4 py-1 rounded-full mb-3">
                    Our Story
                  </span>
                  <h1 className="text-4xl md:text-6xl font-extrabold text-[#1e1894] tracking-tight mt-2">
                    About DevDuos
                  </h1>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-6">
                    Created by developers, for developers – building the ultimate hackathon platform
                  </p>
                </div>

                {/* Company Logo and Name */}
                <div className="flex items-center justify-center gap-6 mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#1e1894] to-[#4361ee] rounded-2xl flex items-center justify-center shadow-xl transform rotate-3">
                    <span className="text-white text-4xl font-bold">DD</span>
                  </div>
                  <div className="text-left">
                    <h2 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#1e1894] to-[#4361ee]">DevDuos</h2>
                    <p className="text-gray-600 text-lg">Est. January 2024</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="w-full px-4 py-6">
          <div className="mx-auto max-w-7xl">
            <section className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mission Card */}
                <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/60 relative">
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1e1894]/10 to-[#4361ee]/10 flex items-center justify-center mb-5">
                      <span className="text-3xl">🎯</span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#1e1894] mb-4">Our Mission</h2>
                    <p className="text-gray-600 leading-relaxed">
                      To create a centralized platform that connects hackathon enthusiasts with the right opportunities and teammates, making the process of participating in hackathons seamless and productive.
                    </p>
                  </div>
                </div>
                
                {/* Vision Card */}
                <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/60 relative">
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4361ee]/10 to-[#1e1894]/10 flex items-center justify-center mb-5">
                      <span className="text-3xl">🔮</span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#1e1894] mb-4">Our Vision</h2>
                    <p className="text-gray-600 leading-relaxed">
                      To foster a global community of innovators where every developer can find their perfect hackathon match and build groundbreaking projects through effective collaboration.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Founder Cards */}
        <div className="w-full px-4 py-6">
          <div className="mx-auto max-w-7xl">
            <section className="py-4">
              <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/60 relative">
                {/* Section Header */}
                <div className="text-center mb-12">
                  <span className="inline-block text-sm bg-gradient-to-r from-[#1e1894]/90 to-[#4361ee]/90 text-white font-medium uppercase tracking-wider px-4 py-1 rounded-full mb-3">
                    Meet the Team
                  </span>
                  <h2 className="text-3xl font-extrabold text-[#1e1894]">
                    Our Founders
                  </h2>
                </div>
                
                {/* Founder Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "Sahil Gawli",
                      role: "Co-Founder, IT Engineer",
                      image: "/founders/sahil-gawli.png",
                      bio: "Passionate about creating developer tools that solve real problems. Experienced in full-stack development and hackathon organization.",
                      skills: ["React", "Next.js", "Node.js"]
                    },
                    {
                      name: "Sahil Ghodvinde",
                      role: "Co-Founder, IT Engineer",
                      image: "/founders/sahil-ghodvinde.png",
                      bio: "Dedicated to building intuitive user experiences and scalable applications. Background in UI/UX design and backend architecture.",
                      skills: ["TypeScript", "UI/UX", "Database Design"]
                    }
                  ].map((founder) => (
                    <div
                      key={founder.name}
                      className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-100"
                    >
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                        <div className="w-40 h-40 rounded-xl overflow-hidden">
                          <Image
                            src={founder.image}
                            alt={founder.name}
                            width={160}
                            height={160}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="text-center md:text-left">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{founder.name}</h3>
                          <div className="text-sm text-[#1e1894] font-medium mb-2">{founder.role}</div>
                          <p className="text-gray-600 text-sm mb-3">{founder.bio}</p>
                          <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            {founder.skills.map((skill, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-[#1e1894]/5 text-[#1e1894] text-xs font-medium rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Our Journey Timeline */}
        <div className="w-full px-4 py-6">
          <div className="mx-auto max-w-7xl">
            <section className="py-4">
              <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/60 relative">
                {/* Section Header */}
                <div className="text-center mb-12">
                  <span className="inline-block text-sm bg-gradient-to-r from-[#1e1894]/90 to-[#4361ee]/90 text-white font-medium uppercase tracking-wider px-4 py-1 rounded-full mb-3">
                    Our History
                  </span>
                  <h2 className="text-3xl font-extrabold text-[#1e1894]">
                    The DevDuos Journey
                  </h2>
                </div>
                
                {/* Timeline */}
                <div className="space-y-6 max-w-4xl mx-auto">
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
                    <div
                      key={i}
                      className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-100"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1e1894] to-[#4361ee] flex items-center justify-center text-2xl">
                          <span className="text-white">{milestone.icon}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-[#1e1894]">{milestone.title}</h3>
                            <span className="bg-[#1e1894]/10 text-[#1e1894] text-sm font-medium px-3 py-1 rounded-full">
                              {milestone.date}
                            </span>
                          </div>
                          <p className="text-gray-600">{milestone.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Contact Section */}
        <div className="w-full px-4 py-6 mb-10">
          <div className="mx-auto max-w-7xl">
            <section className="py-4">
              <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/60 relative">
                {/* Section Header */}
                <div className="text-center mb-10">
                  <span className="inline-block text-sm bg-gradient-to-r from-[#1e1894]/90 to-[#4361ee]/90 text-white font-medium uppercase tracking-wider px-4 py-1 rounded-full mb-3">
                    Get in Touch
                  </span>
                  <h2 className="text-3xl font-extrabold text-[#1e1894]">
                    Let&apos;s Connect
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
                    Have questions, feedback, or interested in collaboration? Reach out to our team.
                  </p>
                </div>
                
                {/* Contact Button */}
                <div className="text-center">
                  <button 
                    className="px-8 py-4 bg-gradient-to-r from-[#1e1894] to-[#4361ee] text-white rounded-full text-lg font-bold
                             shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <span className="flex items-center justify-center gap-3">
                      Contact Us
                      <svg 
                        className="w-5 h-5" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
