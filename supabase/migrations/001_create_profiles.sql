-- Create profiles table for portfolio management
-- Run this SQL in your Supabase SQL Editor (Dashboard > SQL Editor)

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  bio TEXT NOT NULL DEFAULT '',
  skills TEXT[] NOT NULL DEFAULT '{}',
  avatar_url TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  github TEXT NOT NULL DEFAULT '',
  linkedin TEXT NOT NULL DEFAULT '',
  twitter TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow public read access (portfolio is public)
CREATE POLICY "Public read access" ON profiles
  FOR SELECT USING (true);

-- Allow public insert/update (single profile row)
CREATE POLICY "Public insert access" ON profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public update access" ON profiles
  FOR UPDATE USING (true);

-- Insert a default profile row (only if table is empty)
INSERT INTO profiles (name, title, bio, skills, avatar_url, email, github, linkedin, twitter)
SELECT
  'DevStack Portfolio',
  'Cross-Platform Mobile Engineer',
  '<p>I am a cross-platform mobile specialist dedicated to building high-performance, pixel-perfect applications. My journey is defined by an obsession with clean architecture and a love for intuitive design.</p>',
  ARRAY['React Native', 'Flutter', 'TypeScript', 'Swift', 'Kotlin', 'Kotlin Multiplatform'],
  '/assets/images/screen.png',
  'hello@devstack.io',
  'https://github.com',
  'https://linkedin.com',
  'https://twitter.com'
WHERE NOT EXISTS (SELECT 1 FROM profiles LIMIT 1);
