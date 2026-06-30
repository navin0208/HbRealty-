import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Setup Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase env variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migrateData() {
  console.log("Starting data migration...");

  // 1. Migrate Properties
  try {
    const propertiesPath = path.join(process.cwd(), 'data', 'properties.json');
    if (fs.existsSync(propertiesPath)) {
      const propertiesData = JSON.parse(fs.readFileSync(propertiesPath, 'utf8'));
      
      const formattedProperties = propertiesData.map((p: any) => ({
        id: p.id,
        title: p.title,
        type: p.type,
        price: p.price,
        size: p.size,
        location_lat: p.location[0],
        location_lng: p.location[1],
        image: p.image,
        status: p.status || 'available',
        isverified: p.isVerified || false,
        ispremium: p.isPremium || false
      }));

      const { error } = await supabase.from('properties').upsert(formattedProperties);
      if (error) {
        console.error("Error migrating properties:", error);
      } else {
        console.log(`Successfully migrated ${formattedProperties.length} properties.`);
      }
    } else {
      console.log("No properties.json found.");
    }
  } catch (err) {
    console.error("Failed to migrate properties:", err);
  }

  // 2. Migrate Blogs
  try {
    const blogsPath = path.join(process.cwd(), 'data', 'blogs.json');
    if (fs.existsSync(blogsPath)) {
      const blogsData = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));
      
      const { error } = await supabase.from('blogs').upsert(blogsData);
      if (error) {
        console.error("Error migrating blogs:", error);
      } else {
        console.log(`Successfully migrated ${blogsData.length} blogs.`);
      }
    } else {
      console.log("No blogs.json found.");
    }
  } catch (err) {
    console.error("Failed to migrate blogs:", err);
  }

  console.log("Migration complete!");
}

migrateData();
