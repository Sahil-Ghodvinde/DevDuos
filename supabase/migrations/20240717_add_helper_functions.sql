-- Function to check if a column exists in a table
CREATE OR REPLACE FUNCTION column_exists(table_name text, column_name text)
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM information_schema.columns c
        WHERE c.table_name = $1
        AND c.column_name = $2
        AND c.table_schema = 'public'
    );
END;
$$ LANGUAGE plpgsql;

-- Function to get all columns in a table
CREATE OR REPLACE FUNCTION get_table_columns(table_name text)
RETURNS TABLE (column_name text, data_type text) AS $$
BEGIN
    RETURN QUERY
    SELECT c.column_name::text, c.data_type::text
    FROM information_schema.columns c
    WHERE c.table_name = $1
    AND c.table_schema = 'public';
END;
$$ LANGUAGE plpgsql;

-- Function to add a column to a table if it doesn't exist
CREATE OR REPLACE FUNCTION add_column_if_not_exists(
    table_name text,
    column_name text,
    column_type text
)
RETURNS void AS $$
BEGIN
    IF NOT column_exists(table_name, column_name) THEN
        EXECUTE format('ALTER TABLE %I ADD COLUMN %I %s', table_name, column_name, column_type);
        RAISE NOTICE 'Column % added to table %', column_name, table_name;
    ELSE
        RAISE NOTICE 'Column % already exists in table %', column_name, table_name;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to create the user_profiles table if it doesn't exist
CREATE OR REPLACE FUNCTION create_user_profiles_table()
RETURNS void AS $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_profiles') THEN
        CREATE TABLE user_profiles (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
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
            hackathon_experience BOOLEAN,
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
            travel_relocation_preference BOOLEAN,
            motivation_statement TEXT,
            project_ideas TEXT,
            additional_notes TEXT,
            is_profile_complete BOOLEAN DEFAULT false,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Create RLS policies
        ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

        -- Allow users to read their own profile
        CREATE POLICY "Users can read their own profile"
            ON user_profiles FOR SELECT
            USING (auth.uid() = user_id);

        -- Allow users to update their own profile
        CREATE POLICY "Users can update their own profile"
            ON user_profiles FOR UPDATE
            USING (auth.uid() = user_id);

        -- Allow users to insert their own profile
        CREATE POLICY "Users can insert their own profile"
            ON user_profiles FOR INSERT
            WITH CHECK (auth.uid() = user_id);

        RAISE NOTICE 'user_profiles table created successfully';
    ELSE
        RAISE NOTICE 'user_profiles table already exists';
    END IF;
END;
$$ LANGUAGE plpgsql; 