import { supabase, SupabaseHackathon, mapSupabaseToFrontend } from './supabase';
import { hackathons as dummyHackathons } from './data';

// Keep only the first dummy hackathon and replace the rest with data from Supabase
export async function getHackathons() {
  try {
    // Fetch hackathons from Supabase
    const { data, error } = await supabase
      .from('hackathons')
      .select('*')
      .order('start_date', { ascending: true });
    
    if (error || !data) {
      console.error('Error fetching hackathons:', error);
      return dummyHackathons; // Return all dummy hackathons as fallback
    }
    
    // Map Supabase data to frontend format
    const supabaseHackathons = (Array.isArray(data) ? data : []).map(hackathon => 
      mapSupabaseToFrontend(hackathon as SupabaseHackathon)
    );
    
    // Combine one dummy hackathon with Supabase hackathons
    const combinedHackathons = [
      dummyHackathons[0], // Keep the first dummy hackathon
      ...supabaseHackathons // Add all hackathons from Supabase
    ];
    
    return combinedHackathons;
  } catch (error) {
    console.error('Failed to fetch hackathons:', error);
    return dummyHackathons; // Return all dummy hackathons as fallback
  }
}

// For detailed view of a single hackathon
export async function getHackathonById(id: string) {
  // First check if it's one of our dummy hackathons
  const dummyHackathon = dummyHackathons.find(h => h.id === id);
  if (dummyHackathon) {
    return dummyHackathon;
  }
  
  try {
    // If not a dummy, get from Supabase
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