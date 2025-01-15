// src/api/posts/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const perPage = url.searchParams.get('per_page') || '25';  // Default to 25 posts per page
  const page = url.searchParams.get('page') || '1';  // Default to the first page

  try {
    // Fetch posts from the external WordPress API with pagination
    const response = await fetch(`https://novaramedia.com/wp-json/wp/v2/posts?categories=7450&per_page=${perPage}&page=${page}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

