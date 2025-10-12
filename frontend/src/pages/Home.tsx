import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { usePosts } from '@/hooks/usePosts';
import { postService } from '@/services/postService';
import { PostList } from '@/components/posts/PostList';
import { PostForm } from '@/components/posts/PostForm';
import { PostEditModal } from '@/components/posts/PostEditModal';
import { Card } from '@/components/ui/Card';
import { Post, PostFormData } from '@/types';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/utils/constants';

export const Home: React.FC = () => {
  const { currentUser } = useAuth();
  const { posts, loading, error } = usePosts();
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showMessage = (message: string, isError = false) => {
    if (isError) {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(null), 5000);
    } else {
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(null), 5000);
    }
  };

  const handleCreatePost = async (data: PostFormData) => {
    if (!currentUser) return;
    
    try {
      await postService.createPost(data, currentUser.uid, currentUser.email || 'Unknown');
      showMessage(SUCCESS_MESSAGES.POST_CREATED);
    } catch (err: any) {
      showMessage(err.message || ERROR_MESSAGES.POST_CREATE_ERROR, true);
      throw err;
    }
  };

  const handleUpdatePost = async (data: PostFormData) => {
    if (!editingPost) return;
    
    try {
      await postService.updatePost(editingPost.id, data);
      showMessage(SUCCESS_MESSAGES.POST_UPDATED);
    } catch (err: any) {
      showMessage(err.message || ERROR_MESSAGES.POST_UPDATE_ERROR, true);
      throw err;
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await postService.deletePost(postId);
      showMessage(SUCCESS_MESSAGES.POST_DELETED);
    } catch (err: any) {
      showMessage(err.message || ERROR_MESSAGES.POST_DELETE_ERROR, true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Mini Social
        </h1>
        <p className="text-gray-600">
          {currentUser
            ? 'Share your thoughts with the community'
            : 'View posts from the community'}
        </p>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Create Post Form (only for logged-in users) */}
      {currentUser && (
        <Card className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Create a New Post
          </h2>
          <PostForm onSubmit={handleCreatePost} />
        </Card>
      )}

      {/* Posts List */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          All Posts
        </h2>
        <PostList
          posts={posts}
          loading={loading}
          error={error}
          onEditPost={setEditingPost}
          onDeletePost={handleDeletePost}
        />
      </div>

      {/* Edit Post Modal */}
      <PostEditModal
        isOpen={!!editingPost}
        post={editingPost}
        onClose={() => setEditingPost(null)}
        onSubmit={handleUpdatePost}
      />
    </div>
  );
};

