import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'blogs.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const blogs = JSON.parse(fileContents);
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error reading blogs:', error);
    // Return empty array if file doesn't exist
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const newBlog = await request.json();
    
    // Read existing
    let blogs = [];
    try {
      const fileContents = await fs.readFile(dataFilePath, 'utf8');
      blogs = JSON.parse(fileContents);
    } catch (e) {
      // File might not exist yet
    }

    // Generate slug from title
    let slug = newBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    if (!slug) slug = 'blog-post';
    
    // Ensure uniqueness
    let finalSlug = slug;
    let counter = 1;
    while (blogs.some((b: any) => b.id === finalSlug)) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    newBlog.id = finalSlug;
    newBlog.date = new Date().toISOString();
    
    if (!newBlog.image || newBlog.image.trim() === '') {
      newBlog.image = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200";
    }

    blogs.push(newBlog);

    await fs.writeFile(dataFilePath, JSON.stringify(blogs, null, 2), 'utf8');

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error('Error saving blog:', error);
    return NextResponse.json({ error: 'Failed to save blog' }, { status: 500 });
  }
}
