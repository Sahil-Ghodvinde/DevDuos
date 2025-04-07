'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';
import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  syncUserProfile: (user: User) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
  syncUserProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Create admin client with service role (bypasses RLS)
  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || '',
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );

  // Sync user data from auth to profiles table
  const syncUserProfile = async (currentUser: User) => {
    if (!currentUser) return;
    
    try {
      console.log("Starting profile sync for user:", currentUser.id);
      
      // Check if user exists in profiles table
      const { data: existingProfile, error: profileError } = await adminSupabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();
        
      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error checking existing profile:', profileError);
      }
      
      // Build user profile data from auth metadata
      const userFullName = 
        currentUser.user_metadata?.full_name || 
        currentUser.user_metadata?.name || 
        currentUser.user_metadata?.user_name || 
        '';
      
      const userAvatarUrl = currentUser.user_metadata?.avatar_url || '';
      
      console.log("User metadata:", { 
        id: currentUser.id,
        email: currentUser.email,
        fullName: userFullName,
        hasAvatar: !!userAvatarUrl
      });
      
      if (!existingProfile) {
        // Insert new profile using admin client
        console.log("Creating new profile for user", currentUser.id);
        const { data, error: insertError } = await adminSupabase
          .from('profiles')
          .insert({
            id: currentUser.id,
            username: currentUser.email?.split('@')[0] || '',
            full_name: userFullName,
            avatar_url: userAvatarUrl,
            updated_at: new Date().toISOString()
          })
          .select();
          
        if (insertError) {
          console.error('Error creating user profile:', insertError.message, insertError);
        } else {
          console.log("Profile created successfully:", data);
        }
      } else {
        console.log("Updating existing profile for user", currentUser.id);
        // Update existing profile with latest data from auth using admin client
        const { data, error: updateError } = await adminSupabase
          .from('profiles')
          .update({
            username: existingProfile.username || currentUser.email?.split('@')[0] || '',
            full_name: userFullName || existingProfile.full_name,
            avatar_url: userAvatarUrl || existingProfile.avatar_url,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentUser.id)
          .select();
          
        if (updateError) {
          console.error('Error updating user profile:', updateError.message, updateError);
        } else {
          console.log("Profile updated successfully:", data);
        }
      }
    } catch (error) {
      // Log the full error details
      console.error('Error syncing user profile:', error);
    }
  };

  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) console.log(error);
      else {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Sync user profile when session is retrieved
        if (session?.user) {
          await syncUserProfile(session.user);
        }
      }
      setLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        setSession(session);
        setUser(session?.user ?? null);
        
        // On sign in or user update, sync profiles
        if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && session?.user) {
          await syncUserProfile(session.user);
        }
        
        setLoading(false);

        if (event === 'SIGNED_IN') {
          router.push('/'); // Redirect to home page after sign in
        }
        if (event === 'SIGNED_OUT') {
          router.push('/');
        }
      }
    );

    setData();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router, supabase]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    signOut,
    syncUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);