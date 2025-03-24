"use client"

import { useState, useEffect, ReactNode } from "react"

interface NoSSRProps {
  children: ReactNode
  fallback?: ReactNode
}

/**
 * NoSSR component - Prevents hydration errors by only rendering children on the client side
 * 
 * @param children The content to render only on client side
 * @param fallback Optional fallback to show during server-side rendering (defaults to null)
 */
export default function NoSSR({ children, fallback = null }: NoSSRProps) {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  if (!isMounted) {
    return <>{fallback}</>
  }
  
  return <>{children}</>
} 