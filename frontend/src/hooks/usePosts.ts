import { useState, useEffect } from 'react';
import { Post } from '@/types';
import { postService } from '@/services/postService';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Subscribe to real-time updates
    const unsubscribe = postService.subscribeToPosts(
      (updatedPosts) => {
        setPosts(updatedPosts);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const refreshPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPosts = await postService.getPosts();
      setPosts(fetchedPosts);
    } catch (err: any) {
      setError(err.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  return { posts, loading, error, refreshPosts };
};

