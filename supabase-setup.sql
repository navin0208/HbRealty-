-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Drop existing tables to ensure a clean schema matching our new columns
drop table if exists public.inquiries cascade;
drop table if exists public.properties cascade;
drop table if exists public.blogs cascade;

-- 1. Create Inquiries Table
create table public.inquiries (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  phone text not null,
  email text,
  inquiry_type text,
  message text,
  intent text,
  location text,
  size text,
  rate text,
  highwayDistance text,
  status text default 'New',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Properties Table
create table public.properties (
  id text primary key,
  title text not null,
  type text not null,
  price text not null,
  size text not null,
  location_lat double precision not null,
  location_lng double precision not null,
  image text not null,
  status text default 'available',
  intent text default 'Buy',
  transaction_type text,
  ownership text,
  road_width text,
  boundary_wall boolean default false,
  open_sides integer,
  address text,
  description text,
  features text[],
  possession_type text,
  isVerified boolean default false,
  isPremium boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Blogs Table
create table public.blogs (
  id text primary key,
  title text not null,
  content text not null,
  image text,
  author text not null,
  date timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS) policies
-- Allow public access to insert inquiries (so anyone can submit the form)
alter table public.inquiries enable row level security;
create policy "Allow public inserts" on public.inquiries for insert with check (true);
create policy "Allow public select" on public.inquiries for select using (true);
create policy "Allow public update" on public.inquiries for update using (true);
create policy "Allow public delete" on public.inquiries for delete using (true);

-- Allow public read/write access to properties and blogs for now (since admin panel doesn't have auth yet)
alter table public.properties enable row level security;
create policy "Allow public full access" on public.properties for all using (true) with check (true);

alter table public.blogs enable row level security;
create policy "Allow public full access" on public.blogs for all using (true) with check (true);

-- Force PostgREST schema cache to reload
NOTIFY pgrst, 'reload schema';

-- Migration to run in existing database:
-- ALTER TABLE public.properties ADD COLUMN intent text DEFAULT 'Buy';
-- ALTER TABLE public.properties ADD COLUMN transaction_type text, ADD COLUMN ownership text, ADD COLUMN road_width text, ADD COLUMN boundary_wall boolean, ADD COLUMN open_sides integer, ADD COLUMN address text, ADD COLUMN description text, ADD COLUMN features text[], ADD COLUMN possession_type text;
