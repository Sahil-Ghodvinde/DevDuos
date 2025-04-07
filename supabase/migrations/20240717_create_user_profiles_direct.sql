-- Create the user_profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone_number TEXT,
  location TEXT,
  "current_role" TEXT,
  education_details TEXT,
  certifications TEXT[],
  skills TEXT[],
  skill_levels JSONB,
  areas_of_interest TEXT[],
  tools_frameworks TEXT[],
  hackathon_experience BOOLEAN DEFAULT FALSE,
  previous_hackathons TEXT[],
  hackathon_goals TEXT[],
  preferred_team_size TEXT,
  preferred_role TEXT,
  leadership_preference TEXT,
  collaboration_style TEXT,
  work_mode_preference TEXT,
  personality_scale INTEGER,
  conflict_resolution_style TEXT,
  time_management_style TEXT,
  adaptability_rating INTEGER,
  cv_file_path TEXT,
  portfolio_links TEXT,
  code_repo_links TEXT,
  linkedin_url TEXT,
  personal_website_url TEXT,
  time_zone TEXT,
  available_hours TEXT[],
  contact_method TEXT,
  travel_relocation_preference BOOLEAN DEFAULT FALSE,
  motivation_statement TEXT,
  project_ideas TEXT,
  additional_notes TEXT,
  is_profile_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Add comment to table
COMMENT ON TABLE public.user_profiles IS 'Extended profile information for users';

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS user_profiles_user_id_idx ON public.user_profiles(user_id);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view all user_profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update their own user_profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert their own user_profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Service role can access all user_profiles" ON public.user_profiles;

-- Create policies
CREATE POLICY "Users can view all user_profiles" 
ON public.user_profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own user_profile" 
ON public.user_profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own user_profile" 
ON public.user_profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can access all user_profiles" 
ON public.user_profiles 
USING (
  (current_setting('role', true) = 'service_role') 
  OR 
  (CASE WHEN auth.jwt() IS NOT NULL THEN auth.jwt()->>'role' = 'service_role' ELSE false END)
); 