# Supabase Database Structure

This document outlines the database structure used in the ProjectHackathon application.

## Tables

### `profiles` (Built-in Table)
This is a table automatically created by Supabase to store basic user profile information:
- `id` (UUID): Primary key, references auth.users(id)
- `username` (text): Username 
- `full_name` (text): User's full name
- `avatar_url` (text): URL to user's avatar
- `updated_at` (timestamp): Last update timestamp
- `is_profile_complete` (boolean): Flag indicating if the detailed profile has been completed

### `user_profiles` (Custom Table)
This table extends the basic user profile with detailed information needed for hackathon team matching:

#### Personal Information
- `full_name` (text): User's full name
- `email` (text): Email address
- `phone_number` (text): Contact phone number
- `location` (text): Physical location

#### Professional & Educational Background
- `current_role` (text): Current job role
- `education_details` (text): Education history
- `certifications` (text[]): Array of certifications

#### Technical Skills & Expertise
- `skills` (text[]): Array of skills
- `skill_levels` (jsonb): JSON mapping skills to proficiency levels
- `areas_of_interest` (text[]): Areas of interest
- `tools_frameworks` (text[]): Tools and frameworks

#### Hackathon Experience & Goals
- `hackathon_experience` (boolean): Has previous hackathon experience
- `previous_hackathons` (text[]): List of previous hackathons
- `hackathon_goals` (text[]): Goals for participating
- `preferred_team_size` (text): Preferred team size

#### Team Role Preferences & Collaboration Style
- `preferred_role` (text): Preferred role in a team
- `leadership_preference` (text): Leadership preference
- `collaboration_style` (text): Collaboration style
- `work_mode_preference` (text): Work mode preference

#### Personality & Work Style
- `personality_scale` (integer): Introvert/Extrovert scale (1-10)
- `conflict_resolution_style` (text): Conflict resolution approach
- `time_management_style` (text): Time management style
- `adaptability_rating` (integer): Adaptability rating (1-5)

#### Document Uploads & External Profiles
- `cv_file_path` (text): Path to uploaded CV/resume
- `portfolio_links` (text): Portfolio links
- `code_repo_links` (text): Code repository links
- `linkedin_url` (text): LinkedIn profile URL
- `personal_website_url` (text): Personal website URL

#### Availability & Contact Preferences
- `time_zone` (text): Time zone
- `available_hours` (text[]): Available hours
- `contact_method` (text): Preferred contact method
- `travel_relocation_preference` (boolean): Willing to travel/relocate

#### Additional Information
- `motivation_statement` (text): Motivation for joining hackathons
- `project_ideas` (text): Project ideas
- `additional_notes` (text): Any other information

#### Metadata
- `is_profile_complete` (boolean): Profile completion status
- `created_at` (timestamptz): Creation timestamp
- `updated_at` (timestamptz): Last update timestamp

## Setting Up the Database

To set up the database structure:

1. Create a Supabase project through the Supabase dashboard
2. Set up auth providers (Email, Google, GitHub) in the Auth section
3. Run the migration in `migrations/20230723_create_user_profiles.sql` to create the tables

You can run the migration either:
- Through the SQL Editor in the Supabase dashboard
- Using the Supabase CLI: `supabase db push`

## Row Level Security (RLS) Policies

The following RLS policies are applied to the `user_profiles` table:

- Users can only view their own profile data
- Users can only insert their own profile data
- Users can only update their own profile data

This ensures data privacy and security while allowing users to manage their own information.

## Triggers

- An `updated_at` trigger automatically updates the timestamp whenever a profile is modified 