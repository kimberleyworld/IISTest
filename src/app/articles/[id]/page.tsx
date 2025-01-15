'use client'; // Marking this as a client component

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Use `useParams` to access dynamic params

interface Article {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
}

async function fetchArticle(id: string): Promise<Article> {
  const response = await fetch(`/api/wp-single-article/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch article with ID: ${id}`);
  }
  return response.json();
}

export default function ArticlePage() {
  const params = useParams(); // Use `useParams` to access dynamic params
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // Ensure `id` is a string
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // If no id, do not fetch

    async function loadArticle() {
      try {
        const data = await fetchArticle(id as string);
        setArticle(data); // Only call setArticle once
      } catch (err) {
        console.error(err);
        setError('Could not fetch the article. Please try again later.');
      }
    }

    loadArticle();
  }, [id]);

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{article.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.content.rendered }} />
    </div>
  );
}
