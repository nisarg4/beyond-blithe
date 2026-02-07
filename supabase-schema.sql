-- Beyond Blithe Database Schema
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- 1. Inquiries table (contact form submissions)
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  event_type TEXT NOT NULL,
  event_type_other TEXT,
  event_date DATE,
  guest_count INTEGER,
  hear_about_us TEXT NOT NULL,
  hear_about_us_other TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'booked', 'archived'))
);

-- 2. Gallery images table
CREATE TABLE gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  image_url TEXT NOT NULL,
  event_type TEXT NOT NULL,
  caption TEXT,
  event_date DATE,
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE
);

-- 3. Gallery videos table
CREATE TABLE gallery_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  title TEXT,
  event_type TEXT,
  display_order INTEGER DEFAULT 0
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_videos ENABLE ROW LEVEL SECURITY;

-- 5. Policies for public read access to gallery
CREATE POLICY "Anyone can view gallery images" ON gallery_images
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view gallery videos" ON gallery_videos
  FOR SELECT USING (true);

-- 6. Policy for public to submit inquiries
CREATE POLICY "Anyone can submit inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

-- 7. Admin policies (authenticated users can do everything)
CREATE POLICY "Admins can do everything with inquiries" ON inquiries
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can do everything with gallery images" ON gallery_images
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can do everything with gallery videos" ON gallery_videos
  FOR ALL USING (auth.role() = 'authenticated');
