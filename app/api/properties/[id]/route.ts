import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const { data, error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `Property ${id} deleted successfully` });
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const { data: p, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !p) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    const formattedProperty = {
      ...p,
      location: [p.location_lat, p.location_lng],
      isVerified: p.isverified,
      isPremium: p.ispremium
    };

    return NextResponse.json(formattedProperty);
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const formData = await request.formData();

    const updateData: any = {};
    const title = formData.get("title") as string;
    if (title) updateData.title = title;
    
    const type = formData.get("type") as string;
    if (type) updateData.type = type;
    
    const price = formData.get("price") as string;
    if (price) updateData.price = price;
    
    const size = formData.get("size") as string;
    if (size) updateData.size = size;
    
    const locationStr = formData.get("location") as string;
    if (locationStr) {
      const location = JSON.parse(locationStr);
      updateData.location_lat = location[0];
      updateData.location_lng = location[1];
    }
    
    // Handle image upload if present
    let imageUrl = formData.get("image") as string;
    const imageFile = formData.get("imageFile") as File;
    if (imageFile && imageFile.size > 0) {
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
    if (imageUrl) updateData.image = imageUrl;
    
    const status = formData.get("status") as string;
    if (status) updateData.status = status;
    
    const isVerified = formData.get("isVerified");
    if (isVerified !== null) updateData.isverified = isVerified === "true";
    
    const isPremium = formData.get("isPremium");
    if (isPremium !== null) updateData.ispremium = isPremium === "true";

    const { data: p, error } = await supabase
      .from('properties')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error || !p) {
      return NextResponse.json({ error: 'Failed to update property or not found' }, { status: 404 });
    }

    const formattedProperty = {
      ...p,
      location: [p.location_lat, p.location_lng],
      isVerified: p.isverified,
      isPremium: p.ispremium
    };

    return NextResponse.json(formattedProperty);
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}
