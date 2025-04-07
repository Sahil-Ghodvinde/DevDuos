"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AuthSuccess() {
  const router = useRouter();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const authType = searchParams.get("type"); // "login" or "signup"
  const [loading, setLoading] = useState(true);
  const [redirectCountdown, setRedirectCountdown] = useState(3);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      router.push("/login");
      return;
    }
    
    // If no auth type specified, assume login and redirect
    if (!authType) {
      router.push("/auth-success?type=login");
      return;
    }
    
    setLoading(false);
  }, [user, router, authType]);
  
  // Handle countdown and redirection
  useEffect(() => {
    if (loading) return;
    
    let timer: NodeJS.Timeout;
    
    // If authType is signup, start a timer to auto-redirect to complete-profile
    if (authType === "signup" && redirectCountdown > 0) {
      timer = setTimeout(() => {
        setRedirectCountdown(prev => prev - 1);
      }, 1000);
    } else if (authType === "signup" && redirectCountdown === 0) {
      router.push("/complete-profile");
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loading, authType, redirectCountdown, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
        >
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10 text-blue-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              {authType === "signup" ? "Sign Up Successful!" : "Welcome Back!"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {authType === "signup" 
                ? "Your account has been created successfully." 
                : "You&apos;ve successfully logged in to your account."}
            </p>
            {authType === "signup" && (
              <p className="mt-2 text-xs text-blue-600">
                Redirecting to profile completion in {redirectCountdown} seconds...
              </p>
            )}
          </div>

          <div className="mt-8 space-y-4">
            {authType === "signup" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Link 
                  href="/complete-profile"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#1e1894] hover:bg-[#1e1894]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e1894] transition-all duration-200"
                >
                  Complete Your Profile
                </Link>
                <p className="mt-2 text-xs text-center text-gray-500">
                  Enhance your experience by completing your profile with additional information.
                </p>
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link 
                href="/dashboard"
                className={`w-full flex justify-center py-3 px-4 border ${
                  authType === "signup" 
                    ? "border-gray-300 text-gray-700 bg-white hover:bg-gray-50" 
                    : "border-transparent text-white bg-[#1e1894] hover:bg-[#1e1894]/90"
                } rounded-xl shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e1894] transition-all duration-200`}
              >
                Continue to Dashboard
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link 
                href="/"
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e1894] transition-all duration-200"
              >
                Go to Homepage
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
} 