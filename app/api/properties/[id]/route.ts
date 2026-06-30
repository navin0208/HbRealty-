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
    const body = await request.json();

    const updateData: any = {};
    if (body.title) updateData.title = body.title;
    if (body.type) updateData.type = body.type;
    if (body.price) updateData.price = body.price;
    if (body.size) updateData.size = body.size;
    if (body.location) {
      updateData.location_lat = body.location[0];
      updateData.location_lng = body.location[1];
    }
    if (body.image) updateData.image = body.image;
    if (body.status) updateData.status = body.status;
    if (body.isVerified !== undefined) updateData.isverified = body.isVerified;
    if (body.isPremium !== undefined) updateData.ispremium = body.isPremium;

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
