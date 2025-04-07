"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo, useAnimation } from "framer-motion"
import { FiHome, FiSearch, FiUser, FiMessageSquare, FiBookmark, FiX } from "react-icons/fi"
import { BsGrid3X3, BsBookmark, BsPerson, BsChat, BsBell, BsHeart, BsX } from "react-icons/bs"
import { IoMdClose } from "react-icons/io"

interface User {
  id: number
  name: string
  role: string
  skills: string[]
  experience: string
  bio: string
  avatar: string
  location: string
  education: string
  connections: number
  posts: number
}

// Dummy data
const dummyUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Frontend Developer",
    skills: ["React", "TypeScript", "Tailwind"],
    experience: "3 years",
    bio: "Passionate about creating beautiful user interfaces and building scalable web applications. Always looking to learn new technologies and improve my skills.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    location: "San Francisco, CA",
    education: "Stanford University",
    connections: 500,
    posts: 120
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Backend Developer",
    skills: ["Node.js", "Python", "MongoDB"],
    experience: "4 years",
    bio: "Love building scalable backend systems and solving complex problems. Experienced in cloud architecture and microservices.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    location: "New York, NY",
    education: "MIT",
    connections: 750,
    posts: 85
  },
  {
    id: 3,
    name: "Alex Johnson",
    role: "Full Stack Developer",
    skills: ["React", "Node.js", "AWS", "Docker"],
    experience: "5 years",
    bio: "Full stack developer with a passion for DevOps and cloud technologies. Building the future of web applications.",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    location: "Seattle, WA",
    education: "University of Washington",
    connections: 1200,
    posts: 210
  },
  {
    id: 4,
    name: "Sarah Williams",
    role: "UI/UX Designer",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    experience: "3 years",
    bio: "Creating beautiful and intuitive user experiences. Focused on accessibility and inclusive design principles.",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    location: "Austin, TX",
    education: "Parsons School of Design",
    connections: 450,
    posts: 95
  }
]

export default function FindTeammate() {
  const [isMobile, setIsMobile] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('discover')
  const [showProfile, setShowProfile] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [savedUsers, setSavedUsers] = useState<User[]>([])
  const [requests, setRequests] = useState<User[]>([])
  const [showSidebar, setShowSidebar] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  // Motion values for swipe animation
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-30, 30])
  const cardOpacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5])
  const cardScale = useTransform(x, [-200, 0, 200], [0.8, 1, 0.8])
  const likeOpacity = useTransform(x, [0, 100], [0, 1])
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0])
  const saveOpacity = useTransform(y, [0, 100], [0, 1])
  
  // Animation controls
  const controls = useAnimation()
  const refreshControls = useAnimation()
  
  // Refs for swipe gestures
  const swipeConstraintsRef = useRef(null)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set default to mobile first approach
    setIsMobile(true)
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true)
    }
    
    // Add a small delay to ensure smooth transition
    const timer = setTimeout(() => {
      checkMobile()
      setIsLoading(false)
    }, 50)
    
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timer)
    }
  }, [])

  // Add keyboard navigation for desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMobile || isAnimating || showProfile) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          handleSwipeWithAnimation('left');
          break;
        case 'ArrowRight':
          handleSwipeWithAnimation('right');
          break;
        case 'ArrowDown':
          handleSaveWithAnimation();
          break;
        case 's':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleSaveForLater(dummyUsers[currentIndex]);
          }
          break;
        case 'Escape':
          if (showProfile) handleCloseProfile();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobile, isAnimating, currentIndex, showProfile]);

  // Pull to refresh functionality
  const handlePullToRefresh = (info: PanInfo) => {
    if (info.offset.y > 100 && !isRefreshing) {
      setIsRefreshing(true);
      refreshControls.start({
        rotate: 360,
        transition: { duration: 1, repeat: Infinity, ease: "linear" }
      });
      
      // Simulate refresh with timeout
      setTimeout(() => {
        setIsRefreshing(false);
        refreshControls.stop();
        // Reset the users - in a real app you'd fetch new data here
        setCurrentIndex(0);
      }, 1500);
    }
  };

  const handleSwipeWithAnimation = (direction: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSwipeDirection(direction);
    
    controls.start({
      x: direction === 'right' ? 500 : -500,
      rotate: direction === 'right' ? 30 : -30,
      opacity: 0,
      transition: { duration: 0.3, type: "tween" }
    }).then(() => {
      if (direction === 'right' || direction === 'left') {
        handleSwipe(direction as 'left' | 'right');
      }
      setIsAnimating(false);
      setSwipeDirection(null);
      controls.set({ x: 0, y: 0, rotate: 0, opacity: 1 });
    });
  };

  const handleSaveWithAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSwipeDirection('down');
    
    controls.start({
      y: 500,
      opacity: 0,
      transition: { duration: 0.3 }
    }).then(() => {
      handleSaveForLater(dummyUsers[currentIndex]);
      setIsAnimating(false);
      setSwipeDirection(null);
      controls.set({ x: 0, y: 0, rotate: 0, opacity: 1 });
    });
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const xThreshold = 100;
    const yThreshold = 50;

    // Check for pull to refresh
    if (info.offset.y > 100 && info.velocity.y > 300 && activeTab === 'discover') {
      handlePullToRefresh(info);
      controls.start({
        x: 0,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      });
      return;
    }

    if (Math.abs(info.offset.x) > xThreshold) {
      // Left or right swipe
      const direction = info.offset.x > 0 ? 'right' : 'left';
      handleSwipeWithAnimation(direction);
    } else if (info.offset.y > yThreshold) {
      // Down swipe
      handleSaveWithAnimation();
    } else {
      // Reset position with spring animation for natural feel
      controls.start({
        x: 0,
        y: 0,
        rotate: 0,
        transition: { 
          type: "spring", 
          stiffness: 400, 
          damping: 30,
          velocity: Math.max(info.velocity.x, info.velocity.y)
        }
      });
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      // Send team request
      console.log('Team request sent to:', dummyUsers[currentIndex].name)
      setRequests(prev => [...prev, dummyUsers[currentIndex]])
    }
    setCurrentIndex(prev => (prev + 1) % dummyUsers.length)
  }

  const handleSaveForLater = (user: User) => {
    console.log('Saved for later:', user.name)
    setSavedUsers(prev => [...prev, user])
    setCurrentIndex(prev => (prev + 1) % dummyUsers.length)
  }

  const handleProfileOpen = (user: User) => {
    setSelectedUser(user)
    setShowProfile(true)
  }

  const handleSendRequest = (user: User) => {
    console.log('Team request sent to:', user.name)
    setRequests(prev => [...prev, user])
  }

  const handleCloseProfile = () => {
    setShowProfile(false)
    setSelectedUser(null)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  // Add useEffect for client-side mounting
  useEffect(() => {
    setMounted(true);
    // Set loading to false after a short delay to simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Instagram-style mobile header with dark mode support
  const MobileHeader = () => (
    <div className={`sticky top-0 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b flex justify-between items-center px-4 py-3 z-40 shadow-sm`}>
      <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Devkstra Teams</h1>
      <div className="flex items-center space-x-4">
        <button className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} focus:outline-none`} 
                onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg> :
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          }
        </button>
        <button className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} focus:outline-none relative`}>
          <BsBell className="text-xl" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <button className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} focus:outline-none relative`}>
          <FiMessageSquare className="text-xl" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-blue-500 rounded-full"></span>
        </button>
      </div>
    </div>
  );

  // Mobile Discover View optimized with haptic feedback and smooth animations
  const MobileDiscoverView = () => (
    <div className="h-full pb-16" ref={mainRef}>
      {isRefreshing && (
        <div className="flex justify-center items-center py-2 text-blue-500">
          <motion.div 
            animate={refreshControls} 
            className="mr-2"
          >
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </motion.div>
          <span className="text-sm font-medium">Refreshing...</span>
        </div>
      )}
      
      {currentIndex < dummyUsers.length ? (
        <div className="relative flex justify-center items-center" style={{ height: 'calc(100vh - 9rem)' }}>
          <AnimatePresence>
                    <motion.div
              ref={swipeConstraintsRef}
              className="absolute w-[90%] max-w-md"
              style={{ 
                x, 
                y, 
                rotate, 
                opacity: cardOpacity, 
                scale: cardScale,
                zIndex: 10,
                height: 'calc(100% - 1rem)'
              }}
              drag={!isAnimating}
              dragConstraints={swipeConstraintsRef}
                      dragElastic={0.2}
                      onDragEnd={handleDragEnd}
              animate={controls}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl h-full overflow-hidden relative flex flex-col`}>
                <div className="h-[45%] md:h-[50%] bg-gradient-to-br from-blue-500 to-purple-600 relative flex-shrink-0">
                  <img 
                    src={dummyUsers[currentIndex].avatar} 
                    alt={dummyUsers[currentIndex].name} 
                    className="h-full w-full object-cover opacity-90"
                    loading="eager" // Ensure images load quickly
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center space-x-3">
                              <div>
                        <h2 className="text-xl font-bold drop-shadow-sm">{dummyUsers[currentIndex].name}</h2>
                        <p className="text-white/90 drop-shadow-sm flex items-center">
                          {dummyUsers[currentIndex].role}
                          <span className="inline-block w-1 h-1 rounded-full bg-white/70 mx-2"></span>
                          <span className="text-sm">{dummyUsers[currentIndex].location}</span>
                        </p>
                              </div>
                            </div>
                          </div>
                          
                  {/* Fix animated swipe indicators */}
                  <motion.div 
                    className="absolute top-6 left-6 bg-red-500 text-white px-3 py-1 rounded-lg font-bold text-lg transform -rotate-12 border-2 border-white shadow-lg z-30"
                    animate={{ 
                      opacity: swipeDirection === 'left' ? 1 : Number(nopeOpacity.get()), 
                      scale: swipeDirection === 'left' ? 1.1 : 1 
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    NOPE
                  </motion.div>
                  <motion.div 
                    className="absolute top-6 right-6 bg-green-500 text-white px-3 py-1 rounded-lg font-bold text-lg transform rotate-12 border-2 border-white shadow-lg z-30"
                    animate={{ 
                      opacity: swipeDirection === 'right' ? 1 : Number(likeOpacity.get()), 
                      scale: swipeDirection === 'right' ? 1.1 : 1 
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    LIKE
                  </motion.div>
                  <motion.div 
                    className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-lg font-bold text-lg border-2 border-white shadow-lg z-30"
                    animate={{ 
                      opacity: swipeDirection === 'down' ? 1 : Number(saveOpacity.get()), 
                      scale: swipeDirection === 'down' ? 1.1 : 1 
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    SAVE
                  </motion.div>
                          </div>
                <div className={`p-4 flex-grow overflow-y-auto ${isDarkMode ? 'text-gray-200 scrollbar-dark' : 'text-gray-800 scrollbar-light'}`}>
                  <div className="mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                    <h3 className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>About</h3>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-800'} text-sm leading-relaxed`}>
                      {dummyUsers[currentIndex].bio}
                    </p>
                        </div>
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Skills</h3>
                      <span className={`text-xs ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                        {dummyUsers[currentIndex].experience} exp.
                      </span>
                            </div>
                    <div className="flex flex-wrap gap-1">
                      {dummyUsers[currentIndex].skills.map((skill, i) => (
                                <span
                          key={i} 
                          className={`px-2 py-1 ${isDarkMode ? 
                            'bg-blue-900/30 text-blue-300' : 
                            'bg-blue-50 text-blue-700'} rounded-full text-xs`}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                  <div className="mb-3">
                    <h3 className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Education</h3>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-800'} text-sm`}>
                      {dummyUsers[currentIndex].education}
                    </p>
                            </div>
                  <div className={`flex justify-between text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-auto pt-2 border-t border-gray-200 dark:border-gray-700`}>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="font-medium">{dummyUsers[currentIndex].connections}</span> connections
                          </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      <span className="font-medium">{dummyUsers[currentIndex].posts}</span> posts
                        </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Improved Swipe Instructions (visible on first load) */}
          <motion.div 
            className={`absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none bg-gradient-to-b ${isDarkMode ? 'from-gray-900/70 to-gray-900/70' : 'from-white/70 to-white/70'}`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 3, duration: 1.5 }}
          >
            <div className={`text-center p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} shadow-xl mb-8`}>
              <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to use</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col items-center">
                  <motion.div 
                    className="mb-3 text-red-500"
                    animate={{ x: [-15, 0] }}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                  </motion.div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Swipe left</div>
                  <div className="text-red-500 font-medium">Skip</div>
                </div>
                <div className="flex flex-col items-center">
                  <motion.div 
                    className="mb-3 text-blue-500"
                    animate={{ y: [0, 15] }}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                  </motion.div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Swipe down</div>
                  <div className="text-blue-500 font-medium">Save</div>
                </div>
                <div className="flex flex-col items-center">
                  <motion.div 
                    className="mb-3 text-green-500"
                    animate={{ x: [0, 15] }}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                  </motion.div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Swipe right</div>
                  <div className="text-green-500 font-medium">Connect</div>
                          </div>
                        </div>
              <motion.div 
                className={`mt-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                animate={{ opacity: [0.5, 1] }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
              >
                Tap to begin
              </motion.div>
                      </div>
                    </motion.div>
          
          {/* Improved action buttons with haptic feedback */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-8">
            <motion.button 
              className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-3 rounded-full shadow-lg text-red-500 border-2 border-red-500 focus:outline-none active:scale-95 transform`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleSwipeWithAnimation('left')}
            >
              <BsX className="text-2xl" />
            </motion.button>
            <motion.button 
              className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-3 rounded-full shadow-lg text-blue-500 border-2 border-blue-500 focus:outline-none active:scale-95 transform`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleSaveWithAnimation()}
            >
              <BsBookmark className="text-2xl" />
            </motion.button>
            <motion.button 
              className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-3 rounded-full shadow-lg text-green-500 border-2 border-green-500 focus:outline-none active:scale-95 transform`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleSwipeWithAnimation('right')}
            >
              <BsHeart className="text-2xl" />
            </motion.button>
          </div>
                </div>
              ) : (
        <div className={`flex flex-col items-center justify-center h-[calc(100vh-8rem)] text-center px-4 ${isDarkMode ? 'text-white' : ''}`}>
          <div className={`${isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'} p-4 rounded-full mb-4`}>
            <FiUser className="text-4xl" />
          </div>
          <h2 className="text-xl font-bold mb-2">No more profiles</h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>You&apos;ve seen all the available profiles. Check back later for more!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentIndex(0)}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Start Over
          </motion.button>
                </div>
              )}
    </div>
  );

  // Enhanced Mobile Navigation Bar
  const MobileNavBar = () => (
    <div className={`fixed bottom-0 left-0 right-0 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t flex justify-around items-center h-16 z-50 px-2 shadow-md`}>
      {[
        { id: 'discover', icon: BsGrid3X3, label: 'Discover' },
        { id: 'saved', icon: BsBookmark, label: 'Saved' },
        { id: 'requests', icon: BsChat, label: 'Requests' },
        { id: 'profile', icon: BsPerson, label: 'Profile' }
      ].map(item => (
        <motion.button 
          key={item.id}
          onClick={() => handleTabChange(item.id)}
          className={`flex flex-col items-center justify-center w-full h-full 
            ${activeTab === item.id ? 
              (isDarkMode ? 'text-blue-400' : 'text-blue-500') : 
              (isDarkMode ? 'text-gray-500' : 'text-gray-500')}`}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            y: activeTab === item.id ? -5 : 0,
            scale: activeTab === item.id ? 1.1 : 1
          }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <item.icon className={`text-xl ${activeTab === item.id ? 'mb-0' : 'mb-1'}`} />
          <span className={`text-xs transition-all ${activeTab === item.id ? 'font-medium' : ''}`}>
            {item.label}
          </span>
          {/* Only render the active indicator on client side */}
          {mounted && activeTab === item.id && (
            <motion.div 
              layoutId="navIndicator"
              className={`absolute bottom-0 w-1 h-1 rounded-full ${isDarkMode ? 'bg-blue-400' : 'bg-blue-500'}`}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
                        </div>
  );

  // Mobile Saved View
  const MobileSavedView = () => (
    <div className="pb-16">
      {savedUsers.length > 0 ? (
        <div className="grid grid-cols-3 gap-1">
          {savedUsers.map((user) => (
            <div key={user.id} className="aspect-square relative group">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                  onClick={() => handleProfileOpen(user)}
                  className="text-white text-sm font-medium"
                        >
                          View Profile
                        </button>
              </div>
                      </div>
                    ))}
                  </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] text-center px-4">
          <div className="bg-blue-100 text-blue-800 p-4 rounded-full mb-4">
            <BsBookmark className="text-4xl" />
          </div>
          <h2 className="text-xl font-bold mb-2">No saved profiles</h2>
          <p className="text-gray-600">Swipe down on profiles to save them for later.</p>
                </div>
              )}
    </div>
  )

  // Mobile Requests View
  const MobileRequestsView = () => (
    <div className="pb-16">
              {requests.length > 0 ? (
        <div className="space-y-4 p-4">
          {requests.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                    </div>
                <div className="flex-1">
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.role}</p>
                    </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                    Accept
                      </button>
                  <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                    Decline
                      </button>
                    </div>
                  </div>
            </div>
          ))}
        </div>
              ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] text-center px-4">
          <div className="bg-blue-100 text-blue-800 p-4 rounded-full mb-4">
            <BsChat className="text-4xl" />
                </div>
          <h2 className="text-xl font-bold mb-2">No requests</h2>
          <p className="text-gray-600">When someone sends you a team request, it will appear here.</p>
            </div>
          )}
    </div>
  )

  // Mobile Profile View
  const MobileProfileView = () => (
    <div className="pb-16">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="px-4 -mt-12">
          <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden mx-auto">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Your Profile" className="h-full w-full object-cover" />
                </div>
          <div className="text-center mt-2">
            <h2 className="text-xl font-bold">Your Name</h2>
            <p className="text-gray-600">Full Stack Developer</p>
                </div>
          <div className="flex justify-center space-x-4 my-4">
            <div className="text-center">
              <div className="font-bold">120</div>
              <div className="text-sm text-gray-500">Connections</div>
              </div>
            <div className="text-center">
              <div className="font-bold">45</div>
              <div className="text-sm text-gray-500">Saved</div>
                </div>
            <div className="text-center">
              <div className="font-bold">12</div>
              <div className="text-sm text-gray-500">Requests</div>
                  </div>
                </div>
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">React</span>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">Node.js</span>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">TypeScript</span>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">MongoDB</span>
                  </div>
                </div>
                  </div>
                  </div>
                </div>
  )

  // Mobile Sidebar - Adding the missing component
  const MobileSidebar = () => (
    <AnimatePresence>
      {showSidebar && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className={`fixed inset-y-0 left-0 w-64 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} z-50 shadow-lg`}
        >
          <div className={`p-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} flex justify-between items-center`}>
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Menu</h2>
            <button onClick={() => setShowSidebar(false)} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} focus:outline-none`}>
              <FiX className="text-xl" />
                </button>
              </div>
          <div className="p-4">
            <div className="space-y-4">
            <button
                onClick={() => {
                  handleTabChange('discover')
                  setShowSidebar(false)
                }}
                className={`w-full p-3 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'discover' ? 
                    (isDarkMode ? 'bg-blue-900/30 text-blue-300 font-medium' : 'bg-blue-50 text-blue-600 font-medium') : 
                    (isDarkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-50 text-gray-700')
                }`}
              >
                <FiHome className="text-xl" />
                <span>Discover</span>
            </button>
            <button
                onClick={() => {
                  handleTabChange('saved')
                  setShowSidebar(false)
                }}
                className={`w-full p-3 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'saved' ? 
                    (isDarkMode ? 'bg-blue-900/30 text-blue-300 font-medium' : 'bg-blue-50 text-blue-600 font-medium') : 
                    (isDarkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-50 text-gray-700')
                }`}
              >
                <FiBookmark className="text-xl" />
                <span>Saved</span>
                {savedUsers.length > 0 && (
                  <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                    isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {savedUsers.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  handleTabChange('requests')
                  setShowSidebar(false)
                }}
                className={`w-full p-3 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'requests' ? 
                    (isDarkMode ? 'bg-blue-900/30 text-blue-300 font-medium' : 'bg-blue-50 text-blue-600 font-medium') : 
                    (isDarkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-50 text-gray-700')
                }`}
              >
                <FiMessageSquare className="text-xl" />
                <span>Requests</span>
              {requests.length > 0 && (
                  <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                    isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-600'
                  }`}>
                  {requests.length}
                </span>
              )}
            </button>
            <button
                onClick={() => {
                  handleTabChange('profile')
                  setShowSidebar(false)
                }}
                className={`w-full p-3 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'profile' ? 
                    (isDarkMode ? 'bg-blue-900/30 text-blue-300 font-medium' : 'bg-blue-50 text-blue-600 font-medium') : 
                    (isDarkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-50 text-gray-700')
                }`}
              >
                <FiUser className="text-xl" />
                <span>Profile</span>
            </button>
          </div>
        </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Desktop Saved View - Adding missing component
  const DesktopSavedView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {savedUsers.length > 0 ? (
        savedUsers.map((user) => (
          <motion.div
            key={user.id} 
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
          >
            <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <div className="px-4 -mt-12">
              <div className="h-20 w-20 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden mx-auto">
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              </div>
              <div className="text-center mt-2">
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</h2>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.role}</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{user.location}</p>
              </div>
              <div className="mt-6 flex space-x-2">
                <motion.button 
                  onClick={() => handleProfileOpen(user)}
                  className={`flex-1 px-4 py-2 ${
                    isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'
                  } rounded-lg text-sm font-medium transition-colors`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Profile
                </motion.button>
                <motion.button 
                  onClick={() => handleSendRequest(user)}
                  className={`flex-1 px-4 py-2 ${
                    isDarkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-600 text-white hover:bg-green-700'
                  } rounded-lg text-sm font-medium transition-colors`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Send Request
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <div className={`${isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'} p-4 rounded-full mb-4`}>
            <BsBookmark className="text-4xl" />
          </div>
          <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>No saved profiles</h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-md`}>Save profiles you&apos;re interested in to review them later and send team requests when you&apos;re ready.</p>
        </div>
      )}
    </div>
  );

  // Desktop Requests View - Adding missing component
  const DesktopRequestsView = () => (
    <div className="space-y-4">
      {requests.length > 0 ? (
        requests.map((user) => (
            <motion.div
            key={user.id} 
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                    </div>
              <div className="flex-1">
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.role}</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{user.location}</p>
                  </div>
              <div className="flex space-x-3">
                <motion.button 
                  className={`px-4 py-2 ${
                    isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'
                  } rounded-lg font-medium transition-colors`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Accept
                </motion.button>
                <motion.button 
                  className={`px-4 py-2 ${
                    isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } rounded-lg font-medium transition-colors`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Decline
                </motion.button>
                </div>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className={`${isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'} p-4 rounded-full mb-4`}>
            <BsChat className="text-4xl" />
          </div>
          <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>No requests</h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-md`}>When someone sends you a team request, it will appear here for you to accept or decline.</p>
        </div>
      )}
    </div>
  );

  // Desktop Profile View - Adding missing component
  const DesktopProfileView = () => (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm overflow-hidden`}>
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      <div className="px-6 -mt-16">
        <div className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Your Profile" className="h-full w-full object-cover" />
        </div>
        <div className="mt-4">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Your Name</h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Full Stack Developer</p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>San Francisco, CA</p>
        </div>
        <div className="flex space-x-6 my-6">
                  <div>
            <div className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>120</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Connections</div>
                  </div>
                  <div>
            <div className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>45</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Saved</div>
          </div>
          <div>
            <div className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>12</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Requests</div>
          </div>
        </div>
        <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pt-6`}>
          <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About</h3>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
            Passionate about creating beautiful user interfaces and building scalable web applications. 
            Always looking to learn new technologies and improve my skills.
          </p>
          <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills</h3>
                    <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 ${isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'} rounded-full`}>React</span>
            <span className={`px-3 py-1 ${isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'} rounded-full`}>Node.js</span>
            <span className={`px-3 py-1 ${isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'} rounded-full`}>TypeScript</span>
            <span className={`px-3 py-1 ${isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'} rounded-full`}>MongoDB</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile View Content
  const MobileContent = () => {
    switch (activeTab) {
      case 'discover':
        return <MobileDiscoverView />
      case 'saved':
        return <MobileSavedView />
      case 'requests':
        return <MobileRequestsView />
      case 'profile':
        return <MobileProfileView />
      default:
        return <MobileDiscoverView />
    }
  }

  // Desktop View Content
  const DesktopContent = () => {
    switch (activeTab) {
      case 'discover':
        return <DesktopDiscoverView />
      case 'saved':
        return <DesktopSavedView />
      case 'requests':
        return <DesktopRequestsView />
      case 'profile':
        return <DesktopProfileView />
      default:
        return <DesktopDiscoverView />
    }
  }

  // Fix TypeScript error in MobileDiscoverView
  useEffect(() => {
    // We should initialize filteredUsers with dummyUsers
    setFilteredUsers(dummyUsers);
    
    // Monitor searchQuery and update filteredUsers
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      const filtered = dummyUsers.filter(user => 
        user.name.toLowerCase().includes(lowercaseQuery) ||
        user.role.toLowerCase().includes(lowercaseQuery) ||
        user.skills.some(skill => skill.toLowerCase().includes(lowercaseQuery))
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(dummyUsers);
    }
  }, [searchQuery]);

  // Desktop DiscoverView component
  const DesktopDiscoverView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredUsers.length > 0 ? filteredUsers.map((user) => (
        <motion.div 
          key={user.id}
          className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
        >
          <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <div className="px-4 -mt-12">
            <div className="h-20 w-20 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden mx-auto">
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            </div>
            <div className="text-center mt-2">
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</h2>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.role}</p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{user.location}</p>
            </div>
            <div className="mt-4">
              <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>About</h3>
              <p className={`text-sm line-clamp-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{user.bio}</p>
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Skills</h3>
                <span className={`text-xs ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>{user.experience}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.skills.slice(0, 3).map((skill, i) => (
                  <span key={i} className={`px-2 py-1 ${
                    isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'
                  } rounded-full text-xs`}>
                          {skill}
                        </span>
                      ))}
                {user.skills.length > 3 && (
                  <span className={`px-2 py-1 ${
                    isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                  } rounded-full text-xs`}>
                    +{user.skills.length - 3}
                  </span>
                )}
                    </div>
                  </div>
            <div className="mt-6 mb-4 flex space-x-2">
              <motion.button 
                onClick={() => handleSaveForLater(user)}
                className={`flex-1 px-4 py-2 ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } rounded-lg text-sm font-medium transition-colors`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Save
              </motion.button>
              <motion.button 
                onClick={() => handleProfileOpen(user)}
                className={`flex-1 px-4 py-2 ${
                  isDarkMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } rounded-lg text-sm font-medium transition-colors`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Profile
              </motion.button>
                    </div>
                  </div>
        </motion.div>
      )) : (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <div className={`${isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'} p-4 rounded-full mb-4`}>
            <FiSearch className="text-4xl" />
          </div>
          <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>No matches found</h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-md`}>Try adjusting your search criteria to find more potential teammates.</p>
        </div>
      )}
    </div>
  );

  // LinkedIn-style Desktop Header
  const DesktopHeader = () => (
    <div className={`sticky top-0 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b z-40 shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              TeamFinder
            </h1>
                    </div>
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, role, or skills..."
                className={`w-full py-2 px-4 pl-10 ${
                  isDarkMode ? 
                  'bg-gray-800 text-white border-gray-700 focus:bg-gray-700' : 
                  'bg-gray-100 text-gray-900 focus:bg-white'
                } rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className={`absolute left-3 top-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
          </div>
          <div className="flex items-center space-x-5">
            <button className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} focus:outline-none relative`}
                    onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              }
            </button>
            <button className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} focus:outline-none relative`}>
              <BsBell className="text-xl" />
              <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-red-500 text-white text-xs rounded-full">3</span>
            </button>
            <button className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} focus:outline-none relative`}>
              <FiMessageSquare className="text-xl" />
              <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-blue-500 text-white text-xs rounded-full">5</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // LinkedIn-style Desktop Sidebar
  const DesktopSidebar = () => (
    <div className={`w-64 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} rounded-lg shadow-sm p-4 h-full sticky top-20`}>
      <div className="mb-6">
        <div className="h-16 w-16 rounded-full overflow-hidden mx-auto mb-2">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Your Profile" className="h-full w-full object-cover" />
        </div>
        <div className="text-center">
          <p className="font-bold">Your Name</p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Full Stack Developer</p>
        </div>
      </div>
      
      <div className="space-y-1">
        {[
          { id: 'discover', icon: FiHome, label: 'Discover' },
          { id: 'saved', icon: FiBookmark, label: 'Saved', count: savedUsers.length },
          { id: 'requests', icon: FiMessageSquare, label: 'Requests', count: requests.length },
          { id: 'profile', icon: FiUser, label: 'Profile' }
        ].map(item => (
          <motion.button
            key={item.id}
            onClick={() => handleTabChange(item.id)}
            className={`w-full p-3 rounded-lg flex items-center space-x-3 ${
              activeTab === item.id ? 
                (isDarkMode ? 'bg-blue-900/30 text-blue-300 font-medium' : 'bg-blue-50 text-blue-600 font-medium') : 
                (isDarkMode ? 'hover:bg-gray-700/50 text-gray-300' : 'hover:bg-gray-50 text-gray-700')
            }`}
            whileHover={{ x: activeTab === item.id ? 0 : 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <item.icon className="text-xl" />
            <span>{item.label}</span>
            {item.count !== undefined && item.count > 0 && (
              <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                isDarkMode ? 'bg-blue-400/20 text-blue-300' : 'bg-blue-100 text-blue-600'
              }`}>
                {item.count}
                        </span>
            )}
          </motion.button>
                      ))}
                    </div>
                  </div>
  );

  // Profile Modal component
  const ProfileModal = () => (
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
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg max-w-2xl w-full overflow-hidden shadow-xl`}
            onClick={e => e.stopPropagation()}
          >
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
              <button 
                onClick={handleCloseProfile}
                className="absolute top-4 right-4 text-white bg-black/20 rounded-full p-2 hover:bg-black/30 focus:outline-none"
              >
                <IoMdClose className="text-xl" />
              </button>
            </div>
            <div className="px-6 -mt-16">
              <div className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden">
                <img src={selectedUser.avatar} alt={selectedUser.name} className="h-full w-full object-cover" />
              </div>
              <div className="mt-4">
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedUser.name}</h2>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedUser.role}</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{selectedUser.location}</p>
              </div>
              <div className="flex space-x-6 my-6">
                    <div>
                  <div className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedUser.connections}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Connections</div>
                    </div>
                    <div>
                  <div className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedUser.posts}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Posts</div>
                    </div>
                  </div>
              <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pt-6`}>
                <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>{selectedUser.bio}</p>
                <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedUser.skills.map((skill, i) => (
                    <span key={i} className={`px-3 py-1 ${
                      isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'
                    } rounded-full`}>
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleSendRequest(selectedUser)}
                    className={`flex-1 px-4 py-2 ${
                      isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'
                    } rounded-lg font-medium transition-colors`}
                  >
                    Send Request
                  </button>
                  <button 
                    onClick={() => handleSaveForLater(selectedUser)}
                    className={`flex-1 px-4 py-2 ${
                      isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } rounded-lg font-medium transition-colors`}
                  >
                    Save for Later
                  </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Only render UI after client-side hydration */}
      {!mounted ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : isLoading ? (
        // Enhanced Loading State
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading awesome people...</p>
          </div>
        </div>
      ) : isMobile ? (
        <>
          <MobileHeader />
          <main className="flex flex-col flex-1">
            <MobileContent />
          </main>
          <MobileNavBar />
          <MobileSidebar />
        </>
      ) : (
        <>
          <DesktopHeader />
          <main className="container mx-auto px-4 py-8">
            <div className="flex gap-6">
              <DesktopSidebar />
              <div className="flex-1">
                <DesktopContent />
              </div>
            </div>
          </main>
        </>
      )}
      <ProfileModal />
    </div>
  )
}






