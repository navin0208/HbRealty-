import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'blogs.json');

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const blogs = JSON.parse(fileContents);
    const blog = blogs.find((b: any) => b.id === id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    let blogs = [];
    try {
      const fileContents = await fs.readFile(dataFilePath, 'utf8');
      blogs = JSON.parse(fileContents);
    } catch (e) {
      return NextResponse.json({ error: 'Blog data file not found' }, { status: 404 });
    }

    const filteredBlogs = blogs.filter((b: any) => b.id !== id);

    if (blogs.length === filteredBlogs.length) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    await fs.writeFile(dataFilePath, JSON.stringify(filteredBlogs, null, 2), 'utf8');
    return NextResponse.json({ success: true, message: `Blog ${id} deleted successfully` });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
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

    let blogs = [];
    try {
      const fileContents = await fs.readFile(dataFilePath, 'utf8');
      blogs = JSON.parse(fileContents);
    } catch (e) {
      return NextResponse.json({ error: 'Blog data file not found' }, { status: 404 });
    }

    let updatedBlog = null;
    const updatedBlogs = blogs.map((b: any) => {
      if (b.id === id) {
        updatedBlog = { ...b, ...body };
        return updatedBlog;
      }
      return b;
    });

    if (!updatedBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    await fs.writeFile(dataFilePath, JSON.stringify(updatedBlogs, null, 2), 'utf8');
    return NextResponse.json(updatedBlog);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}
