-- Run this in your Supabase SQL Editor

-- 1. Create the Inquiries table
CREATE TABLE public.inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text,
  phone text,
  property_type text,
  location text,
  size text,
  details text,
  inquiry_type text,
  rate text,
  highway_distance text,
  legal_status text,
  road_size text,
  document_url text,
  image_urls text[],
  status text DEFAULT 'New',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Turn off Row Level Security (RLS) temporarily so the public form can insert data without auth
ALTER TABLE public.inquiries DISABLE ROW LEVEL SECURITY;

-- 3. Create a public storage bucket for inquiry documents & images
INSERT INTO storage.buckets (id, name, public) VALUES ('inquiries', 'inquiries', true);

-- 4. Allow public uploads to the bucket
CREATE POLICY "Public Upload" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'inquiries');

CREATE POLICY "Public Read" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'inquiries');
