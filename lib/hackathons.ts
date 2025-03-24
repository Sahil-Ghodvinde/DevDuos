import { supabase, SupabaseHackathon, mapSupabaseToFrontend } from './supabase';
import { hackathons as dummyHackathons } from './data';

// Keep only the first dummy hackathon and replace the rest with data from Supabase(removed this in v2.3)
export async function getHackathons() {
  try {
    // Check if Supabase is available
    if (!supabase) {
      console.error('Supabase client is not initialized');
      return dummyHackathons;
    }

    // Fetch hackathons from Supabase
    const { data, error } = await supabase
      .from('hackathons')
      .select('*')
      .order('start_date', { ascending: true });
    
    if (error || !data) {
      console.error('Error fetching hackathons:', error);
      return dummyHackathons; // Return all dummy hackathons as fallback(removed in 2.3)
    }
    
    // Map Supabase data to frontend format
    const supabaseHackathons = (Array.isArray(data) ? data : []).map(hackathon => 
      mapSupabaseToFrontend(hackathon as SupabaseHackathon)
    );
    
    // Return only Supabase hackathons
    return supabaseHackathons;
  } catch (error) {
    console.error('Failed to fetch hackathons:', error);
    return dummyHackathons; // Return all dummy hackathons as fallback
  }
}

// For detailed view of a single hackathon
export async function getHackathonById(id: string) {
  try {
    // Check if Supabase is available
    if (!supabase) {
      console.error('Supabase client is not initialized');
      return null;
    }

    // Get hackathon from Supabase
    const { data, error } = await supabase
      .from('hackathons')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) {
      console.error('Error fetching hackathon by ID:', error);
      return null;
    }
    
    return mapSupabaseToFrontend(data as SupabaseHackathon);
  } catch (error) {
    console.error('Failed to fetch hackathon by ID:', error);
    return null;
  }
} 