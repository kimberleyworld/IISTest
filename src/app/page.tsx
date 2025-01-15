// src/app/page.tsx
'use client'; // Marking this as a client component
import he from 'he';

import React, { useState, useEffect } from 'react';
import ArticleCard from './components/ArticleCard';
import HeadingSection from './components/HeadingSection';
import MainDescription from './components/MainDescription';

interface Post {
  id: number;
  title: {
    rendered: string;
  };
  cmb2: {
    post_metabox: {
      _cmb_short_desc: string;
    };
  };
}

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1); // Track current page
  const [hasMore, setHasMore] = useState<boolean>(true); // Check if there are more posts to load

  // Function to fetch posts based on current page and per_page
  const fetchPosts = async (page: number, perPage: number) => {
    setLoading(true);
    try {
      // Fetch posts from the external WordPress API with pagination
      const response = await fetch(`/api/wp-all-articles?per_page=${perPage}&page=${page}`);
      
      if (!response.ok) throw new Error('Failed to fetch posts');
      
      const data = await response.json();
      
      // Append new posts to existing ones
      setPosts((prevPosts) => [...prevPosts, ...data]);
      
      // If less posts than perPage, we assume there are no more posts
      if (data.length < perPage) {
        setHasMore(false);
      }
    } catch (error) {
    console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch for the first 18 posts
  useEffect(() => {
    fetchPosts(page, 18);
  }, [page]);

  // Handle "See More" button click to load more posts
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number
  };

  return (
    <div className="home-page">
      <HeadingSection /> 
      <MainDescription />     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <ArticleCard
            key={post.id}
            id={post.id.toString()}
            title={he.decode(post.title.rendered) || 'Untitled'}
            excerpt={he.decode(post.cmb2.post_metabox._cmb_short_desc) || 'No description available.'}
          />
        ))}
      </div>

      {hasMore && !loading && (
        <div className="text-center mt-4">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            See More
          </button>
        </div>
      )}

      {loading && page > 1 && <div className="text-center mt-4">Loading more...</div>}
    </div>
  );
};

export default HomePage;
