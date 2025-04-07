export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          updated_at: string | null
          is_profile_complete: boolean | null
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
          is_profile_complete?: boolean | null
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
          is_profile_complete?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string | null
          email: string | null
          phone_number: string | null
          location: string | null
          current_role: string | null
          education_details: string | null
          certifications: string[] | null
          skills: string[] | null
          skill_levels: Json | null
          areas_of_interest: string[] | null
          tools_frameworks: string[] | null
          hackathon_experience: boolean | null
          previous_hackathons: string[] | null
          hackathon_goals: string[] | null
          preferred_team_size: string | null
          preferred_role: string | null
          leadership_preference: string | null
          collaboration_style: string | null
          work_mode_preference: string | null
          personality_scale: number | null
          conflict_resolution_style: string | null
          time_management_style: string | null
          adaptability_rating: number | null
          cv_file_path: string | null
          portfolio_links: string | null
          code_repo_links: string | null
          linkedin_url: string | null
          personal_website_url: string | null
          time_zone: string | null
          available_hours: string[] | null
          contact_method: string | null
          travel_relocation_preference: boolean | null
          motivation_statement: string | null
          project_ideas: string | null
          additional_notes: string | null
          is_profile_complete: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          full_name?: string | null
          email?: string | null
          phone_number?: string | null
          location?: string | null
          current_role?: string | null
          education_details?: string | null
          certifications?: string[] | null
          skills?: string[] | null
          skill_levels?: Json | null
          areas_of_interest?: string[] | null
          tools_frameworks?: string[] | null
          hackathon_experience?: boolean | null
          previous_hackathons?: string[] | null
          hackathon_goals?: string[] | null
          preferred_team_size?: string | null
          preferred_role?: string | null
          leadership_preference?: string | null
          collaboration_style?: string | null
          work_mode_preference?: string | null
          personality_scale?: number | null
          conflict_resolution_style?: string | null
          time_management_style?: string | null
          adaptability_rating?: number | null
          cv_file_path?: string | null
          portfolio_links?: string | null
          code_repo_links?: string | null
          linkedin_url?: string | null
          personal_website_url?: string | null
          time_zone?: string | null
          available_hours?: string[] | null
          contact_method?: string | null
          travel_relocation_preference?: boolean | null
          motivation_statement?: string | null
          project_ideas?: string | null
          additional_notes?: string | null
          is_profile_complete?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string | null
          email?: string | null
          phone_number?: string | null
          location?: string | null
          current_role?: string | null
          education_details?: string | null
          certifications?: string[] | null
          skills?: string[] | null
          skill_levels?: Json | null
          areas_of_interest?: string[] | null
          tools_frameworks?: string[] | null
          hackathon_experience?: boolean | null
          previous_hackathons?: string[] | null
          hackathon_goals?: string[] | null
          preferred_team_size?: string | null
          preferred_role?: string | null
          leadership_preference?: string | null
          collaboration_style?: string | null
          work_mode_preference?: string | null
          personality_scale?: number | null
          conflict_resolution_style?: string | null
          time_management_style?: string | null
          adaptability_rating?: number | null
          cv_file_path?: string | null
          portfolio_links?: string | null
          code_repo_links?: string | null
          linkedin_url?: string | null
          personal_website_url?: string | null
          time_zone?: string | null
          available_hours?: string[] | null
          contact_method?: string | null
          travel_relocation_preference?: boolean | null
          motivation_statement?: string | null
          project_ideas?: string | null
          additional_notes?: string | null
          is_profile_complete?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for better type usage
export type Profile = Database['public']['Tables']['profiles']['Row']
export type UserProfile = Database['public']['Tables']['user_profiles']['Row']
export type InsertUserProfile = Database['public']['Tables']['user_profiles']['Insert']
export type UpdateUserProfile = Database['public']['Tables']['user_profiles']['Update'] 