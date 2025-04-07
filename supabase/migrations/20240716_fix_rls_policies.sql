-- Fix RLS policies for profiles table
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Service role can access all profiles" ON public.profiles;

-- Create more permissive policies for profiles table
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (true);  -- Allow all users to view profiles

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Service role can access all profiles" 
ON public.profiles 
USING (
  (SELECT current_setting('role', true) = 'service_role') 
  OR 
  (auth.jwt() ? auth.jwt()->>'role' = 'service_role' : false)
);

-- Fix RLS policies for user_profiles table
ALTER TABLE IF EXISTS public.user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own user_profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update their own user_profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert their own user_profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Service role can access all user_profiles" ON public.user_profiles;

-- Create more permissive policies for user_profiles table
CREATE POLICY "Users can view all user_profiles" 
ON public.user_profiles FOR SELECT 
USING (true);  -- Allow all users to view user_profiles

CREATE POLICY "Users can update their own user_profile" 
ON public.user_profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own user_profile" 
ON public.user_profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can access all user_profiles" 
ON public.user_profiles 
USING (
  (SELECT current_setting('role', true) = 'service_role') 
  OR 
  (auth.jwt() ? auth.jwt()->>'role' = 'service_role' : false)
); 