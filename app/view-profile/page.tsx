"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { createClient } from '@supabase/supabase-js';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

interface UserProfileData {
  full_name: string | null;
  email: string | null;
  phone_number: string | null;
  location: string | null;
  current_role: string | null;
  education_details: string | null;
  skills: string[] | null;
  areas_of_interest: string[] | null;
  hackathon_experience: boolean | null;
  previous_hackathons: string[] | null;
  preferred_team_size: string | null;
  portfolio_links: string | null;
  linkedin_url: string | null;
  time_zone: string | null;
}

export default function ViewProfile() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);

  // Create admin Supabase client
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
    if (!user) {
      router.push("/");
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await adminSupabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          return;
        }

        setProfileData(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, router, adminSupabase]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

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

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Your Profile</h3>
                <button
                  onClick={() => router.push('/complete-profile')}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              </div>

              {profileData ? (
                <div className="space-y-8">
                  {/* Personal Information */}
                  <section>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Full Name</p>
                        <p className="mt-1">{profileData.full_name || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="mt-1">{profileData.email || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone Number</p>
                        <p className="mt-1">{profileData.phone_number || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p className="mt-1">{profileData.location || 'Not provided'}</p>
                      </div>
                    </div>
                  </section>

                  {/* Professional Information */}
                  <section>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Current Role</p>
                        <p className="mt-1">{profileData.current_role || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Education Details</p>
                        <p className="mt-1">{profileData.education_details || 'Not provided'}</p>
                      </div>
                    </div>
                  </section>

                  {/* Skills and Interests */}
                  <section>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Skills and Interests</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Skills</p>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {profileData?.skills && profileData.skills.length > 0 ? (
                            profileData.skills.map((skill: string, index: number) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                              >
                                {skill}
                              </span>
                            ))
                          ) : (
                            <p className="text-gray-500">No skills listed</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Areas of Interest</p>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {profileData?.areas_of_interest && profileData.areas_of_interest.length > 0 ? (
                            profileData.areas_of_interest.map((interest: string, index: number) => (
                              <span
                                key={index}
                                className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                              >
                                {interest}
                              </span>
                            ))
                          ) : (
                            <p className="text-gray-500">No interests listed</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Hackathon Experience */}
                  <section>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Hackathon Experience</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Previous Hackathons</p>
                        <div className="mt-1">
                          {profileData?.previous_hackathons && profileData.previous_hackathons.length > 0 ? (
                            <ul className="list-disc list-inside space-y-1">
                              {profileData.previous_hackathons.map((hackathon: string, index: number) => (
                                <li key={index}>{hackathon}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500">No previous hackathons</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Preferred Team Size</p>
                        <p className="mt-1">{profileData.preferred_team_size || 'Not specified'}</p>
                      </div>
                    </div>
                  </section>

                  {/* Additional Information */}
                  <section>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Portfolio Links</p>
                        <p className="mt-1">{profileData.portfolio_links || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">LinkedIn</p>
                        <p className="mt-1">{profileData.linkedin_url || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Time Zone</p>
                        <p className="mt-1">{profileData.time_zone || 'Not provided'}</p>
                      </div>
                    </div>
                  </section>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You haven&apos;t completed your profile yet.</p>
                  <button
                    onClick={() => router.push('/complete-profile')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                  >
                    Complete Your Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 