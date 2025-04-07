-- Add is_profile_complete column to profiles table if it doesn't exist
SELECT add_column_if_not_exists('profiles', 'is_profile_complete', 'BOOLEAN DEFAULT false');

-- Create policy to allow users to update their own profile completion status
CREATE POLICY "Users can update their own profile completion status"
ON profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Update existing profiles to mark them as complete if they have a user_profile entry
UPDATE profiles p
SET is_profile_complete = true
FROM user_profiles up
WHERE p.id = up.user_id; 