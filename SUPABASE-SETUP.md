# Supabase Integration for DevDuos Hackathon Platform

## Setup Instructions

1. **Configure Environment Variables**

   Edit the `.env.local` file in the root directory and add your Supabase credentials:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

   You can find these values in your Supabase project dashboard under Project Settings > API.

2. **Database Schema**

   The current implementation expects a `hackathons` table with the following structure:

   ```sql
   CREATE TABLE hackathons (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     name TEXT NOT NULL,
     description TEXT,
     url TEXT,
     location TEXT,
     mode TEXT,
     start_date TIMESTAMP WITH TIME ZONE,
     end_date TIMESTAMP WITH TIME ZONE,
     registration_deadline TIMESTAMP WITH TIME ZONE,
     prize_amount TEXT,
     organizer TEXT,
     tags TEXT[],
     source_platform TEXT,
     banner_image_url TEXT,
     logo_image_url TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

3. **Row Level Security**

   Make sure RLS is enabled on your table with appropriate policies:

   ```sql
   -- Enable Row Level Security
   ALTER TABLE hackathons ENABLE ROW LEVEL SECURITY;

   -- Create a policy that allows anyone to read the hackathons data
   CREATE POLICY "Anyone can read hackathons" 
   ON hackathons FOR SELECT 
   TO authenticated, anon
   USING (true);
   ```

## Implementation Details

1. **Data Fetching**
   - The application fetches hackathon data from Supabase when the main page loads
   - One dummy hackathon is retained and combined with Supabase data
   - If there's an error fetching from Supabase, the app falls back to dummy data

2. **Data Mapping**
   - Supabase data is mapped to the frontend format in `lib/supabase.ts`
   - Date formatting is handled automatically

3. **Detail Pages**
   - Hackathon detail pages fetch specific hackathon data by ID

4. **Testing**
   - Check the console for any errors during data fetching
   - If using the fallback data, verify your Supabase connection settings 