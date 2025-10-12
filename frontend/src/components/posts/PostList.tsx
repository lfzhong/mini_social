import React from 'react';
import { Post } from '@/types';
import { PostCard } from './PostCard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';

interface PostListProps {
  posts: Post[];
  loading?: boolean;
  error?: string | null;
  onEditPost?: (post: Post) => void;
  onDeletePost?: (postId: string) => void;
}

export const PostList: React.FC<PostListProps> = ({
  posts,
  loading,
  error,
  onEditPost,
  onDeletePost,
}) => {
  if (loading) {
    return (
      <div className="py-12">
        <LoadingSpinner size="lg" />
        <p className="text-center text-gray-600 mt-4">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No posts yet</h3>
        <p className="mt-1 text-gray-500">Be the first to share something!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onEdit={onEditPost}
          onDelete={onDeletePost}
        />
      ))}
    </div>
  );
};

