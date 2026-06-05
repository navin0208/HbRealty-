import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'properties.json');

// Interface matching the properties format
interface Property {
  id: string;
  title: string;
  type: string;
  price: string;
  size: string;
  location: [number, number];
  image: string;
  status?: 'available' | 'sold';
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Read existing properties
    let properties: Property[] = [];
    try {
      const fileContents = await fs.readFile(dataFilePath, 'utf8');
      properties = JSON.parse(fileContents);
    } catch (e) {
      return NextResponse.json({ error: 'Property data file not found' }, { status: 404 });
    }

    // Filter out the property to delete
    const filteredProperties = properties.filter((p) => p.id !== id);

    if (properties.length === filteredProperties.length) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    // Save back to file
    await fs.writeFile(dataFilePath, JSON.stringify(filteredProperties, null, 2), 'utf8');

    return NextResponse.json({ success: true, message: `Property ${id} deleted successfully` });
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
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

    // Read existing properties
    let properties: Property[] = [];
    try {
      const fileContents = await fs.readFile(dataFilePath, 'utf8');
      properties = JSON.parse(fileContents);
    } catch (e) {
      return NextResponse.json({ error: 'Property data file not found' }, { status: 404 });
    }

    // Find and update property
    let updatedProperty: Property | null = null;
    const updatedProperties = properties.map((p) => {
      if (p.id === id) {
        updatedProperty = {
          ...p,
          ...body,
        };
        return updatedProperty;
      }
      return p;
    });

    if (!updatedProperty) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    // Save back to file
    await fs.writeFile(dataFilePath, JSON.stringify(updatedProperties, null, 2), 'utf8');

    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}
