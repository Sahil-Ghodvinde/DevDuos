// Import CSV data to Supabase
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const csv = require('csv-parser');
const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Path to your CSV file
const csvPath = process.argv[2] || './hackathons_20250323_032151.csv';

// Function to extract key details from raw data
function extractHackathonData(row) {
  // Extract the first value from each property if it's an array
  const normalizedRow = {};
  Object.keys(row).forEach(key => {
    normalizedRow[key] = Array.isArray(row[key]) ? row[key][0] : row[key];
  });
  
  // Get properties - handling different CSV formats
  const name = normalizedRow['0'] || normalizedRow['name'] || 'Unknown Hackathon';
  const organizer = normalizedRow['1'] || normalizedRow['organizer'] || 'Unknown Organizer';
  const description = normalizedRow['2'] || normalizedRow['description'] || 'No description available';
  const startDate = normalizedRow['3'] || normalizedRow['start_date'] || new Date().toISOString();
  const endDate = normalizedRow['4'] || normalizedRow['end_date'] || new Date().toISOString();
  const location = normalizedRow['5'] || normalizedRow['location'] || 'Online';
  
  console.log(`Processing: ${name}`);
  
  return {
    id: uuidv4(),
    name,
    organizer,
    description,
    start_date: parseDate(startDate),
    end_date: parseDate(endDate),
    location,
    mode: determineMode(location),
    url: 'https://hackathon.example.com', // Default URL
    registration_deadline: calculateDeadline(parseDate(startDate)),
    prize_amount: extractPrizeAmount(normalizedRow), 
    tags: ['Technology'], // Default tag
    source_platform: 'CSV Import',
    created_at: new Date().toISOString(),
    last_updated: new Date().toISOString()
  };
}

// Helper functions
function parseDate(dateStr) {
  if (!dateStr) return new Date().toISOString();
  
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date: ${dateStr}, using current date`);
      return new Date().toISOString();
    }
    return date.toISOString();
  } catch (e) {
    console.warn(`Could not parse date: ${dateStr}`);
    return new Date().toISOString();
  }
}

function determineMode(location) {
  if (!location || location.toLowerCase().includes('online')) {
    return 'Online';
  }
  return 'Offline';
}

function calculateDeadline(startDate) {
  const date = new Date(startDate);
  date.setDate(date.getDate() - 7); // Set deadline 7 days before start
  return date.toISOString();
}

function extractPrizeAmount(row) {
  // Try to find prize information in the raw data
  const fullText = Object.values(row).join(' ');
  
  // Look for currency symbols followed by numbers
  const prizeMatch = fullText.match(/\$([\d,]+)/);
  if (prizeMatch) {
    return prizeMatch[0];
  }
  
  // Default prize
  return 'Prizes TBA';
}

// Main import function
async function importHackathons() {
  const results = [];
  
  // Read and parse CSV with appropriate options
  fs.createReadStream(csvPath)
    .pipe(csv({
      skipLines: 0,
      headers: false // We'll handle column mapping ourselves
    }))
    .on('data', (data) => {
      // Only push data that has a name
      if (data['0'] || data['name']) {
        results.push(data);
      }
    })
    .on('end', async () => {
      console.log(`Processing ${results.length} hackathons...`);
      
      // Process each row
      for (const row of results) {
        try {
          const hackathonData = extractHackathonData(row);
          
          // Insert into Supabase
          const { data, error } = await supabase
            .from('hackathons')
            .insert([hackathonData]);
            
          if (error) {
            console.error('Error inserting hackathon:', error);
          } else {
            console.log(`Imported: ${hackathonData.name}`);
          }
        } catch (err) {
          console.error('Error processing row:', err);
        }
      }
      
      console.log('Import complete!');
    });
}

// Run the import
console.log('Importing CSV data to Supabase...');
console.log('Make sure you have set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
console.log(`Reading from: ${csvPath}`);

// Execute the import with error handling
importHackathons().catch(error => {
  console.error('Fatal error during import:', error);
}); 