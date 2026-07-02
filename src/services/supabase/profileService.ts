import { supabase } from './client';
import type { Profile } from '../../models/types';

interface ProfileRow {
  id: string;
  name: string;
  title: string;
  bio: string;
  skills: string[];
  avatar_url: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  created_at: string;
  updated_at: string;
}

function rowToProfile(row: ProfileRow): Profile {
  return {
    name: row.name,
    title: row.title,
    bio: row.bio,
    skills: row.skills || [],
    avatarUrl: row.avatar_url,
    email: row.email,
    github: row.github,
    linkedin: row.linkedin,
    twitter: row.twitter,
  };
}

export async function getProfileFromSupabase(): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching profile:', error.message);
    return null;
  }

  return rowToProfile(data as ProfileRow);
}

export async function upsertProfileToSupabase(profile: Profile): Promise<{ success: boolean; error?: string }> {
  // First, try to get existing profile id
  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .limit(1)
    .single();

  if (existing) {
    // Update existing row
    const { error } = await supabase
      .from('profiles')
      .update({
        name: profile.name,
        title: profile.title,
        bio: profile.bio,
        skills: profile.skills,
        avatar_url: profile.avatarUrl,
        email: profile.email,
        github: profile.github,
        linkedin: profile.linkedin,
        twitter: profile.twitter,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id);

    if (error) {
      console.error('Error updating profile:', error.message);
      return { success: false, error: error.message };
    }
  } else {
    // Insert new row
    const { error } = await supabase
      .from('profiles')
      .insert({
        name: profile.name,
        title: profile.title,
        bio: profile.bio,
        skills: profile.skills,
        avatar_url: profile.avatarUrl,
        email: profile.email,
        github: profile.github,
        linkedin: profile.linkedin,
        twitter: profile.twitter,
      });

    if (error) {
      console.error('Error inserting profile:', error.message);
      return { success: false, error: error.message };
    }
  }

  return { success: true };
}
