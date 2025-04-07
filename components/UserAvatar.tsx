"use client";

import { useState } from 'react';
import Image from 'next/image';
import { User } from '@supabase/supabase-js';

interface UserAvatarProps {
  user: User | null;
  size?: number;
  className?: string;
}

export default function UserAvatar({ user, size = 40, className = '' }: UserAvatarProps) {
  const [imageError, setImageError] = useState(false);
  
  if (!user) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-200 rounded-full overflow-hidden ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-gray-500 font-medium" style={{ fontSize: size * 0.4 }}>?</span>
      </div>
    );
  }
  
  const avatarUrl = user.user_metadata?.avatar_url;
  const userInitial = user.email?.[0].toUpperCase() || user.user_metadata?.name?.[0]?.toUpperCase() || "U";
  
  if (!avatarUrl || imageError) {
    return (
      <div 
        className={`flex items-center justify-center bg-[#1e1894] text-white font-medium rounded-full overflow-hidden ${className}`}
        style={{ width: size, height: size }}
      >
        <span style={{ fontSize: size * 0.4 }}>{userInitial}</span>
      </div>
    );
  }
  
  return (
    <div 
      className={`rounded-full overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={avatarUrl}
        alt={user.email || "User"}
        width={size}
        height={size}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
} 