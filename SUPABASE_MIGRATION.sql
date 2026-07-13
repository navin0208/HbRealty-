-- Run this in your Supabase SQL Editor to add the new custom property details columns

ALTER TABLE public.properties 
ADD COLUMN location_connectivity text,
ADD COLUMN site_features text,
ADD COLUMN opportunity text,
ADD COLUMN things_to_know text;

-- Force PostgREST schema cache to reload
NOTIFY pgrst, 'reload schema';
