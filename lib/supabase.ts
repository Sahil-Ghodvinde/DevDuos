import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Create a single supabase client for the entire app
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false
    }
  }
);

// Type definition for the hackathons from your database
export interface SupabaseHackathon {
  id: string;
  name: string;
  description: string;
  url: string;
  location: string;
  mode: string;
  start_date: string;
  end_date: string;
  registration_deadline: string;
  prize_amount: string;
  organizer: string;
  tags: string[];
  source_platform: string;
  banner_image_url: string;
  logo_image_url: string;
  created_at: string;
  last_updated: string;
}

// Function to convert Supabase hackathon to frontend format
export function mapSupabaseToFrontend(hackathon: SupabaseHackathon) {
  if (!hackathon) {
    console.error('Received undefined hackathon in mapSupabaseToFrontend');
    return {
      id: 'error-id',
      title: 'Error',
      description: 'Unable to load hackathon data',
      location: 'Unknown',
      date: 'TBD',
      closes: 'TBD',
      mode: 'Online' as const,
      theme: 'ERROR',
      participants: 500, // Fixed value instead of random
      status: 'CLOSED' as const,
      image: 'img1',
      organizer: 'Unknown'
    };
  }
  
  // Generate a stable ID based on name if needed
  const stableId = hackathon.id || hashString(hackathon.name || 'unnamed');
  
  // Get a stable image index based on ID
  const imgIndex = (getHashCode(stableId) % 7) + 1;
  
  // Fixed participants count based on ID
  const participantsCount = 100 + (getHashCode(stableId) % 900);
  
  return {
    id: stableId,
    title: hackathon.name || 'Unnamed Hackathon',
    description: hackathon.description || 'No description available',
    location: hackathon.location || 'Online',
    date: formatDateRange(hackathon.start_date, hackathon.end_date),
    closes: `closes on ${formatDate(hackathon.registration_deadline)}`,
    mode: (hackathon.mode || 'Online') as "Online" | "Offline" | "Hybrid",
    theme: Array.isArray(hackathon.tags) && hackathon.tags.length > 0 ? hackathon.tags[0] : "TECHNOLOGY",
    tags: hackathon.tags || [],
    participants: participantsCount,
    status: "OPEN",
    image: hackathon.banner_image_url || `img${imgIndex}`,
    organizer: hackathon.organizer || 'Unknown Organizer',
    url: hackathon.url || '',
    prizeAmount: hackathon.prize_amount || '',
    sourcePlatform: hackathon.source_platform || '',
    lastUpdated: formatDate(hackathon.last_updated) || ''
  };
}

// Helper function to create a stable hash from a string
function hashString(str: string): string {
  let hash = 0;
  if (str.length === 0) return 'hash-0';
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return 'hash-' + Math.abs(hash).toString(16);
}

// Get a number from a string, useful for generating stable values
function getHashCode(str: string): number {
  let hash = 0;
  if (str.length === 0) return 0;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  return Math.abs(hash);
}

// Helper function to format date range
function formatDateRange(start: string, end: string) {
  if (!start || !end) {
    return 'Date TBD';
  }
  
  try {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    // Check if dates are valid
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return 'Date TBD';
    }
    
    const startMonth = startDate.toLocaleString('default', { month: 'short' });
    const endMonth = endDate.toLocaleString('default', { month: 'short' });
    
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    
    const year = startDate.getFullYear();
    
    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} - ${endDay}, ${year}`;
    } else {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
    }
  } catch (error) {
    console.error('Error formatting date range:', error);
    return 'Date TBD';
  }
}

// Helper function to format a single date
function formatDate(dateString: string) {
  if (!dateString) {
    return 'TBD';
  }
  
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'TBD';
    }
    
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    
    return `${month} ${day} ${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'TBD';
  }
} 