"use client"

import { useState } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, PanInfo } from "framer-motion"
import { users, UserProfile } from "@/lib/users"
import Navbar from "@/components/navbar"

export default function FindTeammate() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [matches, setMatches] = useState<UserProfile[]>([])
  const [showProfile, setShowProfile] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null)
  const [activeTab, setActiveTab] = useState<'discover' | 'requests' | 'profile'>('discover')
  const [requests, setRequests] = useState<UserProfile[]>([])
  
  // Motion values for swipe animation
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-30, 30])
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5])
  const scale = useSpring(useTransform(x, [-200, 0, 200], [0.8, 1, 0.8]), {
    stiffness: 300,
    damping: 30
  })
  // Left and right indicator opacities
  const leftIndicatorOpacity = useTransform(x, [-100, 0], [1, 0])
  const rightIndicatorOpacity = useTransform(x, [0, 100], [0, 1])

  const currentUser = users[currentIndex]

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100
    if (Math.abs(info.offset.x) > threshold) {
      const direction = info.offset.x > 0 ? 'right' : 'left'
      handleSwipe(direction)
    } else {
      // Reset position if not swiped far enough
      x.set(0)
      rotate.set(0)
      opacity.set(1)
      scale.set(1)
    }
  }

  const handleSwipe = (direction: 'left' | 'right') => {
    setDirection(direction === 'right' ? 1 : -1)
    if (direction === 'right') {
      setMatches(prev => [...prev, currentUser])
      // Simulate receiving a request
      setRequests(prev => [...prev, currentUser])
    }
    setCurrentIndex(prev => prev + 1)
  }

  const handleViewProfile = (user: UserProfile) => {
    setSelectedUser(user)
    setShowProfile(true)
  }

  const handleCloseProfile = () => {
    setShowProfile(false)
    setSelectedUser(null)
  }

  const handleAcceptRequest = (user: UserProfile) => {
    setRequests(prev => prev.filter(u => u.id !== user.id))
    setMatches(prev => [...prev, user])
  }

  const handleRejectRequest = (user: UserProfile) => {
    setRequests(prev => prev.filter(u => u.id !== user.id))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4 pb-20">
        <div className="w-full max-w-md">
          {activeTab === 'discover' && (
            <>
              {currentIndex < users.length ? (
                <div className="relative h-[600px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={currentUser.id}
                      className="absolute w-full h-full"
                      style={{ x, rotate, opacity, scale }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={handleDragEnd}
                      initial={{ 
                        x: direction > 0 ? 1000 : -1000,
                        opacity: 0,
                        scale: 0.8
                      }}
                      animate={{ 
                        x: 0,
                        opacity: 1,
                        scale: 1
                      }}
                      exit={{ 
                        x: direction > 0 ? -1000 : 1000,
                        opacity: 0,
                        scale: 0.8
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-white rounded-3xl shadow-xl overflow-hidden h-full relative">
                        {/* Profile Image with Gradient Overlay */}
                        <div className="relative h-1/2">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#1e1894] to-[#4361ee] flex items-center justify-center">
                            <span className="text-8xl">{currentUser.avatar}</span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          
                          {/* Instagram-style Profile Header */}
                          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                                <span className="text-2xl">{currentUser.avatar}</span>
                              </div>
                              <div>
                                <h2 className="text-white font-semibold">{currentUser.name}</h2>
                                <p className="text-white/80 text-sm">{currentUser.experience} experience</p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleViewProfile(currentUser)}
                              className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
                            >
                              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                              </svg>
                            </button>
                          </div>
                          
                          {/* Swipe indicators - show when dragging */}
                          <div 
                            className="absolute top-1/2 left-6 -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-3" 
                            style={{ opacity: leftIndicatorOpacity as unknown as number }}
                          >
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                          
                          <div 
                            className="absolute top-1/2 right-6 -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-3" 
                            style={{ opacity: rightIndicatorOpacity as unknown as number }}
                          >
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </div>
                        </div>

                        {/* Profile Info */}
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900">{currentUser.name}</h2>
                              <p className="text-gray-600">{currentUser.experience} experience</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Timezone</p>
                              <p className="font-medium">{currentUser.timezone}</p>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4">{currentUser.bio}</p>

                          {/* Skills */}
                          <div className="mb-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-2">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                              {currentUser.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-[#1e1894]/10 text-[#1e1894] rounded-full text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Looking For */}
                          <div className="mb-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-2">Looking For</h3>
                            <div className="flex flex-wrap gap-2">
                              {currentUser.lookingFor.map((role, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                >
                                  {role}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Tinder-style Action Buttons */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
                          <div className="flex justify-center gap-4">
                            <button
                              onClick={() => handleSwipe('left')}
                              className="p-4 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
                            >
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleViewProfile(currentUser)}
                              className="p-4 rounded-full bg-[#1e1894]/10 text-[#1e1894] hover:bg-[#1e1894]/20 transition-colors"
                            >
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleSwipe('right')}
                              className="p-4 rounded-full bg-green-100 text-green-500 hover:bg-green-200 transition-colors"
                            >
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">No more profiles to show!</h2>
                  <p className="text-gray-600 mb-8">Check your matches to connect with potential teammates.</p>
                  <button
                    onClick={() => setCurrentIndex(0)}
                    className="px-6 py-3 bg-[#1e1894] text-white rounded-full hover:bg-[#1e1894]/90 transition-colors"
                  >
                    Start Over
                  </button>
                </div>
              )}

              {/* Instagram-style Matches Section */}
              {matches.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Your Matches</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {matches.map((match) => (
                      <div
                        key={match.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden"
                      >
                        <div className="aspect-square bg-gradient-to-br from-[#1e1894] to-[#4361ee] flex items-center justify-center">
                          <span className="text-4xl">{match.avatar}</span>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900">{match.name}</h3>
                          <p className="text-sm text-gray-600">{match.experience} experience</p>
                        </div>
                        <button
                          onClick={() => handleViewProfile(match)}
                          className="w-full p-2 text-[#1e1894] hover:bg-[#1e1894]/10 transition-colors"
                        >
                          View Profile
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'requests' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Team Requests</h2>
              {requests.length > 0 ? (
                requests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1e1894] to-[#4361ee] flex items-center justify-center">
                      <span className="text-3xl">{request.avatar}</span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900">{request.name}</h3>
                      <p className="text-sm text-gray-600">{request.experience} experience</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAcceptRequest(request)}
                        className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleRejectRequest(request)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No pending team requests</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1e1894] to-[#4361ee] flex items-center justify-center">
                  <span className="text-4xl">👨‍💻</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
                  <p className="text-gray-600">Edit your profile to find better matches</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                  <p className="text-gray-700">Full-stack developer passionate about AI and web3. Looking for teammates for hackathons!</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#1e1894]/10 text-[#1e1894] rounded-full text-sm">React</span>
                    <span className="px-3 py-1 bg-[#1e1894]/10 text-[#1e1894] rounded-full text-sm">Node.js</span>
                    <span className="px-3 py-1 bg-[#1e1894]/10 text-[#1e1894] rounded-full text-sm">Python</span>
                    <span className="px-3 py-1 bg-[#1e1894]/10 text-[#1e1894] rounded-full text-sm">TensorFlow</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Looking For</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Frontend Developer</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">UI/UX Designer</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Backend Developer</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Availability</h3>
                    <p className="text-gray-900">Full-time during hackathons</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Timezone</h3>
                    <p className="text-gray-900">UTC+8</p>
                  </div>
                </div>

                <button className="w-full py-3 bg-[#1e1894] text-white rounded-xl hover:bg-[#1e1894]/90 transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Instagram-style Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-md mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            <button
              onClick={() => setActiveTab('discover')}
              className={`p-2 rounded-full transition-colors ${
                activeTab === 'discover' ? 'text-[#1e1894]' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`p-2 rounded-full transition-colors relative ${
                activeTab === 'requests' ? 'text-[#1e1894]' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {requests.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {requests.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`p-2 rounded-full transition-colors ${
                activeTab === 'profile' ? 'text-[#1e1894]' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Instagram-style Profile Modal */}
      <AnimatePresence>
        {showProfile && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={handleCloseProfile}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-6xl">{selectedUser.avatar}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h2>
                      <p className="text-gray-600">{selectedUser.experience} experience</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseProfile}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                    <p className="text-gray-700">{selectedUser.bio}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#1e1894]/10 text-[#1e1894] rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Looking For</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.lookingFor.map((role, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Preferred Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.preferredTechStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#1e1894]/10 text-[#1e1894] rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Availability</h3>
                      <p className="text-gray-900">{selectedUser.availability}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Timezone</h3>
                      <p className="text-gray-900">{selectedUser.timezone}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {selectedUser.github && (
                      <a
                        href={selectedUser.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.24.73-.53v-1.85c-3.03.66-3.67-1.45-3.67-1.45-.5-1.27-1.21-1.6-1.21-1.6-.99-.68.07-.66.07-.66 1.09.08 1.67 1.12 1.67 1.12.97 1.66 2.54 1.18 3.16.9.1-.7.38-1.18.69-1.45-2.42-.28-4.96-1.21-4.96-5.38 0-1.19.42-2.16 1.12-2.92-.11-.28-.49-1.4.11-2.91 0 0 .92-.29 3 1.12a10.44 10.44 0 015.5 0c2.08-1.41 3-.12 3-.12.6 1.51.22 2.63.11 2.91.7.76 1.12 1.73 1.12 2.92 0 4.18-2.55 5.1-4.98 5.37.39.34.74 1.01.74 2.03v3.01c0 .29.19.63.74.53A11 11 0 0012 1.27" />
                        </svg>
                        GitHub
                      </a>
                    )}
                    {selectedUser.linkedin && (
                      <a
                        href={selectedUser.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[#1e1894]/10 text-[#1e1894] rounded-full hover:bg-[#1e1894]/20 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                      </a>
                    )}
                    {selectedUser.portfolio && (
                      <a
                        href={selectedUser.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        Portfolio
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
