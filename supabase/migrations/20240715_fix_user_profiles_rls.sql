-- Enable Row Level Security for user_profiles table
ALTER TABLE IF EXISTS user_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own user_profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own user_profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own user_profile" ON user_profiles;

-- Create policies that allow users to interact with their own profile
CREATE POLICY "Users can view their own user_profile" 
ON user_profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own user_profile" 
ON user_profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own user_profile" 
ON user_profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Add service role access policy if needed for admin functions
CREATE POLICY "Service role can access all user_profiles" 
ON user_profiles 
USING (auth.jwt() ? auth.jwt()->>'role' = 'service_role' : false);

-- Allow public to view some profile data (optional, comment out if not needed)
-- CREATE POLICY "User profiles are viewable by everyone" 
-- ON user_profiles FOR SELECT 
-- USING (true); 