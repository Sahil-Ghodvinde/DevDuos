"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { createClient } from '@supabase/supabase-js';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import PersonalInfo from "./components/PersonalInfo";
import ProfessionalInfo from "./components/ProfessionalInfo";
import TechnicalSkills from "./components/TechnicalSkills";
import HackathonExperience from "./components/HackathonExperience";
import TeamPreferences from "./components/TeamPreferences";
import PersonalityWorkStyle from "./components/PersonalityWorkStyle";
import DocumentUploads from "./components/DocumentUploads";
import AvailabilityPreferences from "./components/AvailabilityPreferences";
import AdditionalInfo from "./components/AdditionalInfo";
import ReviewSubmit from "./components/ReviewSubmit";
import { UserProfile, InsertUserProfile } from "../../lib/database.types";

// Define type for profile form data - extend from our database type
interface FormData extends Omit<UserProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'> {
  // Add index signature for dynamic access
  [key: string]: any;
}

// Define the step names
const steps = [
  "Personal Information",
  "Professional & Education",
  "Technical Skills",
  "Hackathon Experience",
  "Team Preferences",
  "Personality & Work Style",
  "Documents & Links",
  "Availability",
  "Additional Info",
  "Review & Submit"
];

// Initial form data
const initialFormData: FormData = {
  // Personal Information
  full_name: "",
  email: "",
  phone_number: "",
  location: "",
  
  // Professional & Educational Background
  current_role: "",
  education_details: "",
  certifications: [],
  
  // Technical Skills & Expertise
  skills: [],
  skill_levels: {},
  areas_of_interest: [],
  tools_frameworks: [],
  
  // Hackathon Experience & Goals
  hackathon_experience: false,
  previous_hackathons: [],
  hackathon_goals: [],
  preferred_team_size: "",
  
  // Team Role Preferences & Collaboration Style
  preferred_role: "",
  leadership_preference: "",
  collaboration_style: "",
  work_mode_preference: "",
  
  // Personality & Work Style
  personality_scale: 5,
  conflict_resolution_style: "",
  time_management_style: "",
  adaptability_rating: 3,
  
  // Document Uploads & External Profiles
  cv_file_path: "",
  portfolio_links: "",
  code_repo_links: "",
  linkedin_url: "",
  personal_website_url: "",
  
  // Availability & Contact Preferences
  time_zone: "",
  available_hours: [],
  contact_method: "",
  travel_relocation_preference: false,
  
  // Additional Information
  motivation_statement: "",
  project_ideas: "",
  additional_notes: "",
  
  // Profile completion status
  is_profile_complete: false
};

export default function CompleteProfile() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [fetchingProfile, setFetchingProfile] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [progress, setProgress] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

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
    
    // If we have user info, pre-fill the email
    if (user.email) {
      setFormData(prev => ({ ...prev, email: user.email || null }));
    }
    
    // Fetch existing profile data from Supabase
    const fetchProfileData = async () => {
      setFetchingProfile(true);
      try {
        console.log("Starting profile fetch for user:", user?.id);
        if (user?.id) {
          try {
            // First check if user has a profile
            const { data: existingProfile, error } = await adminSupabase
              .from('user_profiles')
              .select('*')
              .eq('user_id', user.id)
              .single();
            
            if (error) {
              // Check if the error is related to missing table
              if (error.message && error.message.includes("does not exist")) {
                console.error('The user_profiles table does not exist in the database. Please run the migration script.');
                
                // Create the user_profiles table directly
                try {
                  console.log('Attempting to create user_profiles table...');
                  await adminSupabase.rpc('create_user_profiles_table');
                  console.log('Table creation attempted. Please refresh the page.');
                } catch (createError) {
                  console.error('Failed to create table automatically:', createError);
                }
              } else if (error.code !== 'PGRST116') {
                // PGRST116 is a "not found" error, which is expected
                console.error('Error fetching profile:', error.message, error);
              }
            }
            
            if (existingProfile) {
              console.log("Found existing profile for user", user.id);
              // Map Supabase data to form format
              const mappedData: FormData = {
                ...initialFormData,
                full_name: existingProfile.full_name || "",
                email: existingProfile.email || user.email || "",
                phone_number: existingProfile.phone_number || "",
                location: existingProfile.location || "",
                current_role: existingProfile.current_role || "",
                education_details: existingProfile.education_details || "",
                certifications: existingProfile.certifications || [],
                skills: existingProfile.skills || [],
                skill_levels: existingProfile.skill_levels || {},
                areas_of_interest: existingProfile.areas_of_interest || [],
                tools_frameworks: existingProfile.tools_frameworks || [],
                hackathon_experience: existingProfile.hackathon_experience || false,
                previous_hackathons: existingProfile.previous_hackathons || [],
                hackathon_goals: existingProfile.hackathon_goals || [],
                preferred_team_size: existingProfile.preferred_team_size || "",
                preferred_role: existingProfile.preferred_role || "",
                leadership_preference: existingProfile.leadership_preference || "",
                collaboration_style: existingProfile.collaboration_style || "",
                work_mode_preference: existingProfile.work_mode_preference || "",
                personality_scale: existingProfile.personality_scale || 5,
                conflict_resolution_style: existingProfile.conflict_resolution_style || "",
                time_management_style: existingProfile.time_management_style || "",
                adaptability_rating: existingProfile.adaptability_rating || 3,
                cv_file_path: existingProfile.cv_file_path || "",
                portfolio_links: existingProfile.portfolio_links || "",
                code_repo_links: existingProfile.code_repo_links || "",
                linkedin_url: existingProfile.linkedin_url || "",
                personal_website_url: existingProfile.personal_website_url || "",
                time_zone: existingProfile.time_zone || "",
                available_hours: existingProfile.available_hours || [],
                contact_method: existingProfile.contact_method || "",
                travel_relocation_preference: existingProfile.travel_relocation_preference || false,
                motivation_statement: existingProfile.motivation_statement || "",
                project_ideas: existingProfile.project_ideas || "",
                additional_notes: existingProfile.additional_notes || "",
                is_profile_complete: existingProfile.is_profile_complete || false
              };
              
              setFormData(mappedData);
            } else {
              // No existing profile, try to get some basic user info from auth.users or profiles table
              console.log("No existing profile, fetching basic user data");
              const { data: basicUserData, error: basicUserError } = await adminSupabase
                .from('profiles')
                .select('full_name, username')
                .eq('id', user.id)
                .single();
                
              if (basicUserError) {
                console.error('Error fetching basic user data:', basicUserError.message, basicUserError);
              }
              
              if (basicUserData) {
                console.log("Found basic user data for user", user.id);
                setFormData(prev => ({
                  ...prev, 
                  full_name: basicUserData.full_name || prev.full_name || ""
                }));
              }
            }
          } catch (err) {
            console.error('Error in profile data fetch:', err);
          }
        }
      } catch (err) {
        console.error('Error in profile data fetch:', err);
      } finally {
        setFetchingProfile(false);
        setLoading(false);
      }
    };
    
    fetchProfileData();
    
    // Attempt to load any saved form data from local storage
    const savedFormData = localStorage.getItem("profileFormData");
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(prev => ({ ...prev, ...parsedData }));
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }
    
  }, [user, router]);

  // Save form data to local storage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("profileFormData", JSON.stringify(formData));
    }
  }, [formData, loading]);

  // Calculate progress based on required fields
  useEffect(() => {
    // Count required fields that are filled
    const requiredFields = ["full_name", "email", "phone_number", "location"];
    const filledCount = requiredFields.filter(field => formData[field]).length;
    const calculatedProgress = Math.min(100, Math.floor((filledCount / requiredFields.length) * 100));
    
    // Add bonus progress for optional sections
    const optionalSections = [
      ["current_role", "education_details"], // Professional info
      ["skills", "areas_of_interest"], // Technical skills
      ["hackathon_experience"], // Hackathon exp
      ["preferred_role"], // Team preferences
      ["personality_scale"], // Personality
      ["linkedin_url"], // Documents
      ["time_zone"], // Availability
      ["motivation_statement"] // Additional
    ];
    
    let bonusProgress = 0;
    for (const section of optionalSections) {
      const hasSomeData = section.some(field => {
        const value = formData[field];
        return Array.isArray(value) ? value.length > 0 : !!value;
      });
      if (hasSomeData) {
        bonusProgress += 5; // 5% per optional section
      }
    }
    
    setProgress(Math.min(100, calculatedProgress + bonusProgress));
  }, [formData]);

  // Handle form updates
  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => {
      // Ensure we don't introduce undefined values into the form data
      const safeUpdates = Object.fromEntries(
        Object.entries(updates).map(([key, value]) => [key, value === undefined ? prev[key] : value])
      ) as Partial<FormData>;
      
      return { ...prev, ...safeUpdates };
    });
    // Auto-save to Supabase after each field update
    autoSaveToSupabase({ ...formData, ...updates });
  };
  
  // Auto-save function with debounce logic
  const autoSaveToSupabase = async (currentFormData: FormData) => {
    if (!user?.id) return;
    
    setSaveMessage("Saving...");
    try {
      // Create a safe copy of the data to avoid undefined values
      const safeFormData = Object.fromEntries(
        Object.entries(currentFormData).map(([key, value]) => [key, value === undefined ? "" : value])
      ) as FormData;
      
      // Prepare the data for Supabase (matching the user_profiles table structure)
      const profileData = {
        user_id: user.id,
        full_name: safeFormData.full_name,
        email: safeFormData.email,
        phone_number: safeFormData.phone_number,
        location: safeFormData.location,
        current_role: safeFormData.current_role,
        education_details: safeFormData.education_details,
        certifications: safeFormData.certifications,
        skills: safeFormData.skills,
        skill_levels: safeFormData.skill_levels,
        areas_of_interest: safeFormData.areas_of_interest,
        tools_frameworks: safeFormData.tools_frameworks,
        hackathon_experience: safeFormData.hackathon_experience,
        previous_hackathons: safeFormData.previous_hackathons,
        hackathon_goals: safeFormData.hackathon_goals,
        preferred_team_size: safeFormData.preferred_team_size,
        preferred_role: safeFormData.preferred_role,
        leadership_preference: safeFormData.leadership_preference,
        collaboration_style: safeFormData.collaboration_style,
        work_mode_preference: safeFormData.work_mode_preference,
        personality_scale: safeFormData.personality_scale,
        conflict_resolution_style: safeFormData.conflict_resolution_style,
        time_management_style: safeFormData.time_management_style,
        adaptability_rating: safeFormData.adaptability_rating,
        cv_file_path: safeFormData.cv_file_path,
        portfolio_links: safeFormData.portfolio_links,
        code_repo_links: safeFormData.code_repo_links,
        linkedin_url: safeFormData.linkedin_url,
        personal_website_url: safeFormData.personal_website_url,
        time_zone: safeFormData.time_zone,
        available_hours: safeFormData.available_hours,
        contact_method: safeFormData.contact_method,
        travel_relocation_preference: safeFormData.travel_relocation_preference,
        motivation_statement: safeFormData.motivation_statement,
        project_ideas: safeFormData.project_ideas,
        additional_notes: safeFormData.additional_notes,
        updated_at: new Date().toISOString()
      };
      
      // Check if the profile exists
      const { data: existingProfile, error: checkError } = await adminSupabase
        .from('user_profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
        
      if (checkError) {
        console.error("Error checking existing profile:", checkError);
        setSaveMessage("Error saving");
        return;
      }
      
      let result;
      if (existingProfile) {
        // Update existing profile
        result = await adminSupabase
          .from('user_profiles')
          .update(profileData)
          .eq('user_id', user.id);
      } else {
        // Insert new profile
        const newProfileData = {
          ...profileData,
          created_at: new Date().toISOString()
        };
        result = await adminSupabase
          .from('user_profiles')
          .insert([newProfileData]);
      }
      
      if (result.error) {
        console.error("Error saving profile:", result.error);
        setSaveMessage("Error saving");
      } else {
        setSaveMessage("Saved");
        // Clear the message after 2 seconds
        setTimeout(() => setSaveMessage(""), 2000);
      }
    } catch (error) {
      console.error("Exception during save:", error);
      setSaveMessage("Error saving");
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }
      
      console.log("Submitting profile for user:", user.id);
      
      // Final submission to Supabase
      const { error } = await adminSupabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          full_name: formData.full_name,
          email: formData.email, 
          phone_number: formData.phone_number,
          location: formData.location,
          current_role: formData.current_role,
          education_details: formData.education_details,
          certifications: formData.certifications,
          skills: formData.skills,
          skill_levels: formData.skill_levels,
          areas_of_interest: formData.areas_of_interest,
          tools_frameworks: formData.tools_frameworks,
          hackathon_experience: formData.hackathon_experience,
          previous_hackathons: formData.previous_hackathons,
          hackathon_goals: formData.hackathon_goals,
          preferred_team_size: formData.preferred_team_size,
          preferred_role: formData.preferred_role,
          leadership_preference: formData.leadership_preference,
          collaboration_style: formData.collaboration_style,
          work_mode_preference: formData.work_mode_preference,
          personality_scale: formData.personality_scale,
          conflict_resolution_style: formData.conflict_resolution_style,
          time_management_style: formData.time_management_style,
          adaptability_rating: formData.adaptability_rating,
          cv_file_path: formData.cv_file_path,
          portfolio_links: formData.portfolio_links,
          code_repo_links: formData.code_repo_links,
          linkedin_url: formData.linkedin_url,
          personal_website_url: formData.personal_website_url,
          time_zone: formData.time_zone,
          available_hours: formData.available_hours,
          contact_method: formData.contact_method,
          travel_relocation_preference: formData.travel_relocation_preference,
          motivation_statement: formData.motivation_statement,
          project_ideas: formData.project_ideas,
          additional_notes: formData.additional_notes,
          is_profile_complete: true,
          updated_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
      
      if (error) {
        console.error("Error upserting user profile:", error);
        throw error;
      }
      
      console.log("Successfully upserted user profile");
      
      // Also update the main profiles table
      console.log("Updating main profiles table");
      const { error: profileUpdateError } = await adminSupabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          updated_at: new Date().toISOString(),
          is_profile_complete: true
        })
        .eq('id', user.id);
        
      if (profileUpdateError) {
        console.error("Warning: Could not update main profile:", profileUpdateError);
        
        // Try to add the column if it doesn't exist
        try {
          console.log("Attempting to add is_profile_complete column to profiles table");
          await adminSupabase.rpc('add_column_if_not_exists', {
            table_name: 'profiles',
            column_name: 'is_profile_complete',
            column_type: 'BOOLEAN DEFAULT false'
          });
          
          // Retry the update with the is_profile_complete field
          console.log("Retrying update to profiles table");
          const { error: retryError } = await adminSupabase
            .from('profiles')
            .update({
              full_name: formData.full_name,
              updated_at: new Date().toISOString(),
              is_profile_complete: true
            })
            .eq('id', user.id);
            
          if (retryError) {
            console.error("Still could not update main profile:", retryError);
          } else {
            console.log("Successfully updated profiles table on retry");
          }
        } catch (addColumnError) {
          console.error("Error adding column:", addColumnError);
        }
      } else {
        console.log("Successfully updated profiles table");
      }
      
      // Clear saved form data from localStorage
      localStorage.removeItem('profileFormData');
      
      // Redirect to dashboard
      console.log("Redirecting to dashboard");
      router.push('/dashboard');
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("There was an error saving your profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const goToNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    window.scrollTo(0, 0);
  };

  const goToPreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    window.scrollTo(0, 0);
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };

  if (loading || fetchingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Render the current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfo formData={formData} updateFormData={updateFormData} />;
      case 1:
        return <ProfessionalInfo formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <TechnicalSkills formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <HackathonExperience formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <TeamPreferences formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <PersonalityWorkStyle formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <DocumentUploads formData={formData} updateFormData={updateFormData} />;
      case 7:
        return <AvailabilityPreferences formData={formData} updateFormData={updateFormData} />;
      case 8:
        return <AdditionalInfo formData={formData} updateFormData={updateFormData} />;
      case 9:
        return <ReviewSubmit formData={formData} />;
      default:
        return <PersonalInfo formData={formData} updateFormData={updateFormData} />;
    }
  };

  // Check if the user can proceed to the next step
  const canProceed = () => {
    // Only block proceeding past step 0 if required fields are not filled
    if (currentStep === 0) {
      return formData.full_name && formData.email && formData.phone_number && formData.location;
    }
    return true;
  };

  const calculateProfileCompletion = (profile: UserProfile | null) => {
    if (!profile) return 0;
    
    const requiredFields = [
      'full_name',
      'email',
      'phone',
      'current_role',
      'years_of_experience',
      'skills',
      'interests',
      'bio'
    ];
    
    const completedFields = requiredFields.filter(field => {
      const value = profile[field as keyof UserProfile];
      if (field === 'skills' || field === 'interests') {
        return Array.isArray(value) && value.length > 0;
      }
      return value !== null && value !== undefined && value !== '';
    });
    
    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Complete Your Profile</h1>
            <p className="mt-2 text-sm text-gray-600">
              Let&apos;s get to know you better so we can help you find the perfect team for your next hackathon.
            </p>
            
            {/* Progress indicator */}
            <div className="mt-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-600">{progress}% complete</span>
                {saveMessage && (
                  <span className="text-sm text-gray-500">{saveMessage}</span>
                )}
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Step navigation */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex space-x-2 min-w-max">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={`px-3 py-2 text-sm rounded-md whitespace-nowrap transition-colors ${
                    currentStep === index
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {index + 1}. {step}
                </button>
              ))}
            </div>
          </div>
          
          {/* Main content area */}
          <div className="bg-white shadow rounded-lg p-6">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderCurrentStep()}
            </motion.div>
            
            {/* Navigation buttons */}
            <div className="mt-8 pt-5 border-t border-gray-200 flex justify-between">
              <button
                type="button"
                onClick={goToPreviousStep}
                disabled={currentStep === 0}
                className={`py-2 px-4 rounded-md text-sm font-medium ${
                  currentStep === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Previous
              </button>
              
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={goToNextStep}
                  disabled={!canProceed()}
                  className={`py-2 px-4 rounded-md text-sm font-medium ${
                    !canProceed()
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSaving}
                  className="py-2 px-4 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center"
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Profile"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 