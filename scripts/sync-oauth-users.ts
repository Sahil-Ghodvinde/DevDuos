/**
 * This script synchronizes OAuth users from auth.users to user_profiles table.
 * 
 * How to run:
 * 1. Export your Supabase service key to env: export SUPABASE_SERVICE_KEY=your_service_key
 * 2. Run: npx ts-node scripts/sync-oauth-users.ts
 */

import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing required environment variables. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY.');
  process.exit(1);
}

// Create Supabase client with service key for admin access
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function syncOAuthUsers() {
  console.log('Starting OAuth user synchronization...');
  
  try {
    // Fetch all users that used OAuth providers (filter by provider in app_metadata)
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      throw new Error(`Error fetching users: ${authError.message}`);
    }
    
    // Filter for OAuth users (those with app_metadata.provider)
    const oauthUsers = authUsers.users.filter(user => 
      user.app_metadata && user.app_metadata.provider && 
      ['google', 'github', 'facebook', 'twitter'].includes(user.app_metadata.provider as string)
    );
    
    console.log(`Found ${oauthUsers.length} OAuth users out of ${authUsers.users.length} total users`);
    
    // Process each OAuth user
    for (const user of oauthUsers) {
      // Check if user already has an entry in user_profiles
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
        
      if (profileError && profileError.code !== 'PGRST116') {
        console.error(`Error checking profile for user ${user.id}: ${profileError.message}`);
        continue;
      }
      
      if (profileData) {
        console.log(`User ${user.id} already has a profile entry`);
        continue;
      }
      
      // Extract user metadata
      const userFullName = 
        user.user_metadata?.full_name || 
        user.user_metadata?.name ||
        user.user_metadata?.user_name || 
        '';
        
      const userAvatarUrl = user.user_metadata?.avatar_url || '';
      
      // Insert entry into user_profiles
      const { error: insertError } = await supabase
        .from('user_profiles')
        .insert({
          user_id: user.id,
          full_name: userFullName,
          email: user.email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          is_profile_complete: false
        });
        
      if (insertError) {
        console.error(`Error creating profile for user ${user.id}: ${insertError.message}`);
        continue;
      }
      
      // Also ensure they have an entry in the default profiles table
      const { data: basicProfile, error: basicProfileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();
      
      if (basicProfileError && basicProfileError.code !== 'PGRST116') {
        console.error(`Error checking basic profile for user ${user.id}: ${basicProfileError.message}`);
      }
      
      if (!basicProfile) {
        // Insert into profiles table
        const { error: insertBasicError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            username: user.email?.split('@')[0] || '',
            full_name: userFullName,
            avatar_url: userAvatarUrl,
            updated_at: new Date().toISOString(),
            is_profile_complete: false
          });
          
        if (insertBasicError) {
          console.error(`Error creating basic profile for user ${user.id}: ${insertBasicError.message}`);
        } else {
          console.log(`Created basic profile for user ${user.id}`);
        }
      }
      
      console.log(`Created detailed profile for user ${user.id}`);
    }
    
    console.log('OAuth user synchronization completed successfully');
    
  } catch (error) {
    console.error('Error during OAuth user synchronization:', error);
    process.exit(1);
  }
}

// Execute the sync function
syncOAuthUsers(); 