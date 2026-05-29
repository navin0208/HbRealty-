import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'properties.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const properties = JSON.parse(fileContents);
    return NextResponse.json(properties);
  } catch (error) {
    console.error('Error reading properties:', error);
    // Return empty array if file doesn't exist or other error
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const newProperty = await request.json();
    
    // Read existing
    let properties = [];
    try {
      const fileContents = await fs.readFile(dataFilePath, 'utf8');
      properties = JSON.parse(fileContents);
    } catch (e) {
      // File might not exist yet, that's fine
    }

    // Assign a new ID (simple random string for now)
    newProperty.id = Math.random().toString(36).substr(2, 9);
    
    // Default image if none provided
    if (!newProperty.image || newProperty.image.trim() === '') {
      newProperty.image = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=400";
    }

    properties.push(newProperty);

    // Save back to file
    await fs.writeFile(dataFilePath, JSON.stringify(properties, null, 2), 'utf8');

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error('Error saving property:', error);
    return NextResponse.json({ error: 'Failed to save property' }, { status: 500 });
  }
}
