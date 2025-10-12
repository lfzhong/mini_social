import React from 'react';
import { Post } from '@/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/utils/dateUtils';
import { useAuth } from '@/context/AuthContext';

interface PostCardProps {
  post: Post;
  onEdit?: (post: Post) => void;
  onDelete?: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onEdit, onDelete }) => {
  const { currentUser } = useAuth();
  const isOwner = currentUser?.uid === post.authorId;

  return (
    <Card hover>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
          <span>By {post.author}</span>
          <span>{formatDate(post.createdAt)}</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="whitespace-pre-wrap">{post.content}</p>
      </CardContent>
      
      {isOwner && (onEdit || onDelete) && (
        <CardFooter>
          <div className="flex gap-2">
            {onEdit && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onEdit(post)}
              >
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(post.id)}
              >
                Delete
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

