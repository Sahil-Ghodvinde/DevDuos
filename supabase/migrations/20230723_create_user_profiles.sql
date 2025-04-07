-- Create a user_profiles table with a foreign key to auth.users
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Personal Information
  full_name TEXT,
  email TEXT,
  phone_number TEXT,
  location TEXT,
  
  -- Professional & Educational Background
  current_role TEXT,
  education_details TEXT,
  certifications TEXT[] DEFAULT '{}',
  
  -- Technical Skills & Expertise
  skills TEXT[] DEFAULT '{}',
  skill_levels JSONB DEFAULT '{}'::jsonb,
  areas_of_interest TEXT[] DEFAULT '{}',
  tools_frameworks TEXT[] DEFAULT '{}',
  
  -- Hackathon Experience & Goals
  hackathon_experience BOOLEAN DEFAULT false,
  previous_hackathons TEXT[] DEFAULT '{}',
  hackathon_goals TEXT[] DEFAULT '{}',
  preferred_team_size TEXT,
  
  -- Team Role Preferences & Collaboration Style
  preferred_role TEXT,
  leadership_preference TEXT,
  collaboration_style TEXT,
  work_mode_preference TEXT,
  
  -- Personality & Work Style
  personality_scale INTEGER DEFAULT 5,
  conflict_resolution_style TEXT,
  time_management_style TEXT,
  adaptability_rating INTEGER DEFAULT 3,
  
  -- Document Uploads & External Profiles
  cv_file_path TEXT,
  portfolio_links TEXT,
  code_repo_links TEXT,
  linkedin_url TEXT,
  personal_website_url TEXT,
  
  -- Availability & Contact Preferences
  time_zone TEXT,
  available_hours TEXT[] DEFAULT '{}',
  contact_method TEXT,
  travel_relocation_preference BOOLEAN DEFAULT false,
  
  -- Additional Information
  motivation_statement TEXT,
  project_ideas TEXT,
  additional_notes TEXT,
  
  -- Metadata
  is_profile_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT unique_user_profile UNIQUE (user_id)
);

-- Create an index on the user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- Add a profile_complete column to the profiles table (if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'is_profile_complete'
  ) THEN
    ALTER TABLE profiles ADD COLUMN is_profile_complete BOOLEAN DEFAULT false;
  END IF;
END
$$;

-- Create RLS policies for the user_profiles table
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to select, insert and update their own profile
CREATE POLICY select_own_profile ON user_profiles 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY insert_own_profile ON user_profiles 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY update_own_profile ON user_profiles 
  FOR UPDATE USING (auth.uid() = user_id);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON user_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column(); 