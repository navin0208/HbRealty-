import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: properties, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    // Map the database columns back to the frontend expected format
    const formattedProperties = properties.map(p => ({
      ...p,
      location: [p.location_lat, p.location_lng],
      isVerified: p.isverified,
      isPremium: p.ispremium
    }));

    return NextResponse.json(formattedProperties);
  } catch (error) {
    console.error('Error reading properties:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const newProperty = await request.json();
    
    newProperty.id = Math.random().toString(36).substr(2, 9);
    if (!newProperty.image || newProperty.image.trim() === '') {
      newProperty.image = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=400";
    }

    const { error } = await supabase
      .from('properties')
      .insert({
        id: newProperty.id,
        title: newProperty.title,
        type: newProperty.type,
        price: newProperty.price,
        size: newProperty.size,
        location_lat: newProperty.location[0],
        location_lng: newProperty.location[1],
        image: newProperty.image,
        status: newProperty.status || 'available',
        isverified: newProperty.isVerified || false,
        ispremium: newProperty.isPremium || false
      });

    if (error) throw error;

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error('Error saving property:', error);
    return NextResponse.json({ error: 'Failed to save property' }, { status: 500 });
  }
}
