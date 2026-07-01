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
      isPremium: p.ispremium,
      intent: p.intent || 'Buy',
      transactionType: p.transaction_type,
      ownership: p.ownership,
      roadWidth: p.road_width,
      boundaryWall: p.boundary_wall,
      openSides: p.open_sides,
      address: p.address,
      description: p.description,
      features: p.features || [],
      possessionType: p.possession_type
    }));

    return NextResponse.json(formattedProperties);
  } catch (error) {
    console.error('Error reading properties:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract location
    let location = [0, 0];
    const locationStr = formData.get("location") as string;
    if (locationStr) {
      location = JSON.parse(locationStr);
    }
    
    // Handle image upload if present
    let imageUrl = formData.get("image") as string;
    const imageFile = formData.get("imageFile") as File;
    
    if (imageFile && imageFile.size > 0) {
      // In a real app, upload this to Supabase Storage. For now, since they want it quick, 
      // they probably want the same logic we used for blogs, or we can just upload it using our local /api/upload.
      const uploadData = new FormData();
      uploadData.append("file", imageFile);
      
      const uploadRes = await fetch(new URL("/api/upload", request.url).toString(), {
        method: "POST",
        body: uploadData,
      });
      
      if (uploadRes.ok) {
        const { url } = await uploadRes.json();
        imageUrl = url;
      }
    }
    
    const newProperty = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.get("title") as string,
      type: formData.get("type") as string,
      price: formData.get("price") as string,
      size: formData.get("size") as string,
      location_lat: location[0],
      location_lng: location[1],
      image: imageUrl || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=400",
      status: (formData.get("status") as string) || 'available',
      intent: (formData.get("intent") as string) || 'Buy',
      isverified: formData.get("isVerified") === "true",
      ispremium: formData.get("isPremium") === "true",
      transaction_type: formData.get("transactionType") as string || null,
      ownership: formData.get("ownership") as string || null,
      road_width: formData.get("roadWidth") as string || null,
      boundary_wall: formData.get("boundaryWall") === "true",
      open_sides: formData.get("openSides") ? parseInt(formData.get("openSides") as string) : null,
      address: formData.get("address") as string || null,
      description: formData.get("description") as string || null,
      features: formData.get("features") ? (formData.get("features") as string).split(',').map(f => f.trim()).filter(Boolean) : [],
      possession_type: formData.get("possessionType") as string || null
    };

    const { error } = await supabase
      .from('properties')
      .insert(newProperty);

    if (error) throw error;

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error('Error saving property:', error);
    return NextResponse.json({ error: 'Failed to save property' }, { status: 500 });
  }
}
