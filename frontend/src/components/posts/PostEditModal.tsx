import React from 'react';
import { Post, PostFormData } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { PostForm } from './PostForm';

interface PostEditModalProps {
  isOpen: boolean;
  post: Post | null;
  onClose: () => void;
  onSubmit: (data: PostFormData) => Promise<void>;
}

export const PostEditModal: React.FC<PostEditModalProps> = ({
  isOpen,
  post,
  onClose,
  onSubmit,
}) => {
  const handleSubmit = async (data: PostFormData) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Post" maxWidth="lg">
      {post && (
        <PostForm
          onSubmit={handleSubmit}
          onCancel={onClose}
          initialData={post}
          submitLabel="Update Post"
        />
      )}
    </Modal>
  );
};

