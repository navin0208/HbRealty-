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
      possessionType: p.possession_type,
      locationConnectivity: p.location_connectivity,
      siteFeatures: p.site_features,
      opportunity: p.opportunity,
      thingsToKnow: p.things_to_know
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

    const intent = formData.get("intent") as string;
    if (intent !== null) updateData.intent = intent;

    const transactionType = formData.get("transactionType") as string;
    if (transactionType !== null) updateData.transaction_type = transactionType;

    const ownership = formData.get("ownership") as string;
    if (ownership !== null) updateData.ownership = ownership;

    const roadWidth = formData.get("roadWidth") as string;
    if (roadWidth !== null) updateData.road_width = roadWidth;

    const boundaryWall = formData.get("boundaryWall");
    if (boundaryWall !== null) updateData.boundary_wall = boundaryWall === "true";

    const openSides = formData.get("openSides") as string;
    if (openSides !== null) updateData.open_sides = openSides ? parseInt(openSides) : null;

    const address = formData.get("address") as string;
    if (address !== null) updateData.address = address;

    const description = formData.get("description") as string;
    if (description !== null) updateData.description = description;

    const features = formData.get("features") as string;
    if (features !== null) updateData.features = features ? features.split(',').map(f => f.trim()).filter(Boolean) : [];

    const possessionType = formData.get("possessionType") as string;
    if (possessionType !== null) updateData.possession_type = possessionType;

    const locationConnectivity = formData.get("locationConnectivity") as string;
    if (locationConnectivity !== null) updateData.location_connectivity = locationConnectivity;

    const siteFeatures = formData.get("siteFeatures") as string;
    if (siteFeatures !== null) updateData.site_features = siteFeatures;

    const opportunity = formData.get("opportunity") as string;
    if (opportunity !== null) updateData.opportunity = opportunity;

    const thingsToKnow = formData.get("thingsToKnow") as string;
    if (thingsToKnow !== null) updateData.things_to_know = thingsToKnow;

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
      possessionType: p.possession_type,
      locationConnectivity: p.location_connectivity,
      siteFeatures: p.site_features,
      opportunity: p.opportunity,
      thingsToKnow: p.things_to_know
    };

    return NextResponse.json(formattedProperty);
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}
