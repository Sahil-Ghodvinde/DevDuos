-- First check if the user_profiles table exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'user_profiles'
    ) THEN
        -- Create the user_profiles table if it doesn't exist
        CREATE TABLE public.user_profiles (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
            full_name TEXT,
            email TEXT,
            phone_number TEXT,
            location TEXT,
            current_role TEXT,
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

        -- Add a comment to the table
        COMMENT ON TABLE public.user_profiles IS 'Extended profile information for users';
        
        -- Create index for faster lookups
        CREATE INDEX user_profiles_user_id_idx ON public.user_profiles(user_id);
        
        -- Output message
        RAISE NOTICE 'Created user_profiles table';
    ELSE
        RAISE NOTICE 'user_profiles table already exists';
    END IF;
END
$$; 