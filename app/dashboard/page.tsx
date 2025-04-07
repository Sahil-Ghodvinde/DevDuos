"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { createClient } from '@supabase/supabase-js';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [showProfilePrompt, setShowProfilePrompt] = useState(false);

  // Create admin Supabase client with service role (bypasses RLS)
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
    // Redirect to home if not authenticated
    if (!user) {
      router.push("/");
      return;
    }
    
    // Fetch profile completion status
    const fetchProfileStatus = async () => {
      try {
        if (!user?.id) {
          console.log("No user ID found");
          return;
        }
        console.log("Fetching profile status for user:", user.id);

        // First check profiles table
        const { data: profileData, error: profileError } = await adminSupabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error("Error fetching from profiles table:", profileError);
          return;
        }
        console.log("Profile data from profiles table:", profileData);

        // Check user_profiles table
        const { data: userProfileData, error: userProfileError } = await adminSupabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (userProfileError) {
          console.error("Error fetching from user_profiles table:", userProfileError);
          return;
        }
        console.log("Profile data from user_profiles table:", userProfileData);

        // Check if profile is marked as complete in either table
        const isCompleteInProfiles = profileData?.is_profile_complete || false;
        const isCompleteInUserProfiles = userProfileData?.is_profile_complete || false;
        console.log("Profile completion status:", {
          isCompleteInProfiles,
          isCompleteInUserProfiles
        });

        if (isCompleteInProfiles || isCompleteInUserProfiles) {
          console.log("Profile is marked as complete in at least one table");
          setProfileCompletion(100);
          setIsProfileComplete(true);
          return;
        }

        // If not marked as complete, calculate completion percentage
        if (userProfileData) {
          // These are the minimum required fields that must be filled
          const requiredFields = [
            'full_name',
            'email',
            'phone_number',
            'location',
            'current_role',
            'education_details',
            'skills',
            'areas_of_interest',
            'hackathon_experience',
            'preferred_team_size'
          ];

          console.log("Checking required fields...");
          const filledFields = requiredFields.filter(field => {
            const value = userProfileData[field];
            const isFilled = value !== null && value !== undefined && value !== '';
            
            // Special handling for arrays and booleans
            if (Array.isArray(value)) {
              const isFilledArray = value && value.length > 0;
              console.log(`Array field ${field}: ${isFilledArray ? 'filled' : 'empty'}, value:`, value);
              return isFilledArray;
            } else if (typeof value === 'boolean') {
              console.log(`Boolean field ${field}: ${value ? 'filled' : 'empty'}`);
              return true; // Consider boolean fields as filled regardless of value
            } else {
              console.log(`Field ${field}: ${isFilled ? 'filled' : 'empty'}, value:`, value);
              return isFilled;
            }
          });

          const completionPercentage = Math.round((filledFields.length / requiredFields.length) * 100);
          console.log(`Completion percentage calculated: ${completionPercentage}%`, {
            filledFields: filledFields.length,
            totalRequired: requiredFields.length,
            filledFieldNames: filledFields
          });

          setProfileCompletion(completionPercentage);
          setIsProfileComplete(completionPercentage === 100);

          // Show profile prompt if completion is less than 30%
          if (completionPercentage < 30) {
            setShowProfilePrompt(true);
          }

          // If profile is complete, update both tables
          if (completionPercentage === 100) {
            console.log("Profile is 100% complete, updating both tables");
            
            // Update user_profiles table
            const { error: userProfileUpdateError } = await adminSupabase
              .from('user_profiles')
              .update({ is_profile_complete: true })
              .eq('user_id', user.id);

            if (userProfileUpdateError) {
              console.error("Error updating user_profiles completion status:", userProfileUpdateError);
            }

            // Update profiles table
            const { error: profileUpdateError } = await adminSupabase
              .from('profiles')
              .update({ is_profile_complete: true })
              .eq('id', user.id);

            if (profileUpdateError) {
              console.error("Error updating profiles completion status:", profileUpdateError);
            }
          }
        } else {
          console.log("No user profile data found");
          setProfileCompletion(0);
          setIsProfileComplete(false);
        }
      } catch (error) {
        console.error("Error in fetchProfileStatus:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileStatus();
  }, [user, router, adminSupabase]);

  const handleSkipProfile = () => {
    setShowProfilePrompt(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Profile Completion Prompt */}
      {showProfilePrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Complete Your Profile</h3>
            <p className="text-gray-600 mb-6">
              Your profile is less than 30% complete. Complete your profile to unlock all features and get better matches with potential teammates!
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleSkipProfile}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Skip for Now
              </button>
              <Link
                href="/complete-profile"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Complete Profile
              </Link>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
          </div>

          {/* Rest of the dashboard content */}
          <div className="py-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Profile Completion Card */}
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Profile Completion</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {isProfileComplete 
                        ? "Your profile is complete!" 
                        : "Complete your profile to find better matches."}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {profileCompletion}%
                  </span>
                </div>
                <div className="mt-6">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${profileCompletion}%` }}
                    ></div>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href="/complete-profile"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {isProfileComplete ? "Update Profile" : "Complete Profile"}
                  </Link>
                </div>
              </div>

              {/* Other dashboard cards... */}
              {/* You can add more cards here */}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 