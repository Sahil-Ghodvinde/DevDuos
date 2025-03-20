"use client"

import { useState } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Social auth icons
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
)

const GitHubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.24.73-.53v-1.85c-3.03.66-3.67-1.45-3.67-1.45-.5-1.27-1.21-1.6-1.21-1.6-.99-.68.07-.66.07-.66 1.09.08 1.67 1.12 1.67 1.12.97 1.66 2.54 1.18 3.16.9.1-.7.38-1.18.69-1.45-2.42-.28-4.96-1.21-4.96-5.38 0-1.19.42-2.16 1.12-2.92-.11-.28-.49-1.4.11-2.91 0 0 .92-.29 3 1.12a10.44 10.44 0 015.5 0c2.08-1.41 3-.12 3-.12.6 1.51.22 2.63.11 2.91.7.76 1.12 1.73 1.12 2.92 0 4.18-2.55 5.1-4.98 5.37.39.34.74 1.01.74 2.03v3.01c0 .29.19.63.74.53A11 11 0 0012 1.27"
    />
  </svg>
)

interface LoginData {
  identifier: string
  password: string
}

export default function Login() {
  const [formData, setFormData] = useState<LoginData>({
    identifier: "",
    password: ""
  })
  const [showManualLogin, setShowManualLogin] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSocialAuth = async (provider: 'google' | 'github') => {
    console.log(`Authenticating with ${provider}`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.identifier || !formData.password) {
      alert('Please fill in all required fields')
      return
    }
    console.log('Login attempt with:', { ...formData, rememberMe })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white p-6 shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Welcome Back</h2>

            {/* Social Auth Buttons */}
            <div className="space-y-3 mb-6">
              <button
                type="button"
                onClick={() => handleSocialAuth('google')}
                className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e1894] transition-all duration-200"
              >
                <GoogleIcon />
                <span className="ml-2">Continue with Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialAuth('github')}
                className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e1894] transition-all duration-200"
              >
                <GitHubIcon />
                <span className="ml-2">Continue with GitHub</span>
              </button>
            </div>

            {/* Manual Login Toggle */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <button
                  type="button"
                  onClick={() => setShowManualLogin(!showManualLogin)}
                  className="px-4 bg-white text-[#1e1894] hover:text-[#1e1894]/80 font-medium focus:outline-none transition-colors duration-200"
                >
                  {showManualLogin ? 'Hide manual login' : 'Login with email/username instead'}
                </button>
              </div>
            </div>

            {/* Manual Login Form */}
            {showManualLogin && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
                    Email or Username
                  </label>
                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    value={formData.identifier}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1e1894] focus:border-[#1e1894] transition-all duration-200"
                    required
                    placeholder="Enter your email or username"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1e1894] focus:border-[#1e1894] transition-all duration-200"
                    required
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-[#1e1894] focus:ring-[#1e1894] border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link href="/forgot-password" className="font-medium text-[#1e1894] hover:text-[#1e1894]/80 transition-colors duration-200">
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#1e1894] hover:bg-[#1e1894]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e1894] transition-all duration-200"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-medium text-[#1e1894] hover:text-[#1e1894]/80 transition-colors duration-200">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

