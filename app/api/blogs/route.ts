import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return NextResponse.json(blogs || []);
  } catch (error) {
    console.error('Error reading blogs:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const newBlog = await request.json();
    
    // Generate slug from title
    let slug = newBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    if (!slug) slug = 'blog-post';
    
    // Ensure uniqueness
    const { data: existingBlogs } = await supabase.from('blogs').select('id');
    let finalSlug = slug;
    let counter = 1;
    while (existingBlogs?.some((b) => b.id === finalSlug)) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    newBlog.id = finalSlug;
    newBlog.date = new Date().toISOString();
    
    if (!newBlog.image || newBlog.image.trim() === '') {
      newBlog.image = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200";
    }

    const { error } = await supabase.from('blogs').insert(newBlog);
    if (error) throw error;

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error('Error saving blog:', error);
    return NextResponse.json({ error: 'Failed to save blog' }, { status: 500 });
  }
}
