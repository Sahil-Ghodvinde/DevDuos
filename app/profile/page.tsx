"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { createClient } from '@supabase/supabase-js';
import { UserProfile } from "@/lib/database.types";
import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [basicProfile, setBasicProfile] = useState<{
    id: string;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
    updated_at: string | null;
    is_profile_complete: boolean | null;
  } | null>(null);
  
  // Create admin client with service role (bypasses RLS)
  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || '',
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      router.push("/login");
      return;
    }
    
    const fetchProfileData = async () => {
      try {
        console.log("Starting profile fetch for user:", user?.id);
        
        // Fetch basic profile from profiles table
        const { data: basicProfileData, error: basicProfileError } = await adminSupabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (basicProfileError) {
          console.error('Error fetching basic profile:', basicProfileError.message, basicProfileError);
        } else {
          console.log("Successfully fetched basic profile");
          setBasicProfile(basicProfileData);
        }
        
        // Fetch detailed user profile if it exists
        const { data: userProfileData, error: userProfileError } = await adminSupabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (userProfileError) {
          console.error('Error fetching user profile:', userProfileError.message, userProfileError);
          
          // Check if user_profiles table exists
          const { data: tables, error: tablesError } = await adminSupabase
            .from('pg_tables')
            .select('tablename')
            .eq('schemaname', 'public')
            .contains('tablename', 'user_profiles');
            
          if (tablesError) {
            console.error('Error checking if user_profiles table exists:', tablesError.message);
          } else {
            console.log('Tables check result:', tables);
          }
        } else if (userProfileData) {
          console.log("Successfully fetched user profile data");
          setProfile(userProfileData);
        } else {
          console.log("No user profile found for user", user.id);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 h-48">
            <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 flex justify-center">
              <div className="bg-white p-1 rounded-full shadow-lg">
                <UserAvatar user={user} size={96} />
              </div>
            </div>
          </div>

          <div className="pt-16 pb-6 px-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {user?.user_metadata?.full_name || basicProfile?.full_name || profile?.full_name || user?.email?.split('@')[0] || "User"}
              </h1>
              <p className="text-gray-500">{user?.email}</p>
              
              {/* Profile badges */}
              <div className="flex items-center justify-center space-x-2 mt-2">
                {user?.app_metadata?.provider && (
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {user.app_metadata.provider}
                  </span>
                )}
                
                {profile?.is_profile_complete ? (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Profile Complete
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    Profile Incomplete
                  </span>
                )}
              </div>
            </div>

            {profile ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h2 className="font-semibold text-lg text-gray-900 mb-3">Personal Information</h2>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Full Name</span>
                      <p className="text-gray-900">{profile.full_name || "-"}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Email</span>
                      <p className="text-gray-900">{profile.email || user?.email || "-"}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Phone</span>
                      <p className="text-gray-900">{profile.phone_number || "-"}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Location</span>
                      <p className="text-gray-900">{profile.location || "-"}</p>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h2 className="font-semibold text-lg text-gray-900 mb-3">Professional Information</h2>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Current Role</span>
                      <p className="text-gray-900">{profile.current_role || "-"}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Education</span>
                      <p className="text-gray-900">{profile.education_details || "-"}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Preferred Role</span>
                      <p className="text-gray-900">{profile.preferred_role || "-"}</p>
                    </div>
                  </div>
                </div>

                {/* Skills & Expertise */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h2 className="font-semibold text-lg text-gray-900 mb-3">Skills & Expertise</h2>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Skills</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {profile.skills && profile.skills.length > 0 ? (
                          profile.skills.map((skill, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm italic">No skills listed</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm font-medium text-gray-500">Areas of Interest</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {profile.areas_of_interest && profile.areas_of_interest.length > 0 ? (
                          profile.areas_of_interest.map((area, index) => (
                            <span key={index} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                              {area}
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm italic">No areas of interest listed</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hackathon Experience */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h2 className="font-semibold text-lg text-gray-900 mb-3">Hackathon Experience</h2>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Experience</span>
                      <p className="text-gray-900">{profile.hackathon_experience ? "Yes" : "No"}</p>
                    </div>
                    {profile.hackathon_experience && (
                      <div>
                        <span className="text-sm font-medium text-gray-500">Previous Hackathons</span>
                        <ul className="list-disc pl-5 mt-1">
                          {profile.previous_hackathons && profile.previous_hackathons.length > 0 ? (
                            profile.previous_hackathons.map((hackathon, index) => (
                              <li key={index} className="text-sm text-gray-700">{hackathon}</li>
                            ))
                          ) : (
                            <li className="text-gray-500 text-sm italic">None listed</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* External Profiles */}
                {(profile.linkedin_url || profile.personal_website_url || profile.code_repo_links) && (
                  <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                    <h2 className="font-semibold text-lg text-gray-900 mb-3">External Profiles</h2>
                    <div className="flex flex-wrap gap-3">
                      {profile.linkedin_url && (
                        <a 
                          href={profile.linkedin_url.startsWith('http') ? profile.linkedin_url : `https://${profile.linkedin_url}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                          LinkedIn
                        </a>
                      )}
                      {profile.personal_website_url && (
                        <a 
                          href={profile.personal_website_url.startsWith('http') ? profile.personal_website_url : `https://${profile.personal_website_url}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-teal-600 hover:underline"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                          Website
                        </a>
                      )}
                      {profile.code_repo_links && (
                        <a 
                          href={profile.code_repo_links.startsWith('http') ? profile.code_repo_links : `https://${profile.code_repo_links}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-gray-600 hover:underline"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Profile not complete</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You haven&apos;t completed your profile yet. Complete your profile to unlock all features.
                </p>
                <div className="mt-6">
                  <Link
                    href="/complete-profile"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Complete Profile
                  </Link>
                </div>
              </div>
            )}
            
            {/* Profile Actions */}
            <div className="flex justify-center mt-8 space-x-3">
              <Link
                href="/complete-profile"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {profile ? "Edit Profile" : "Complete Profile"}
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 