import React, { useState, useEffect } from 'react';
import { PostFormData, Post } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { validatePostTitle, validatePostContent } from '@/utils/validation';

interface PostFormProps {
  onSubmit: (data: PostFormData) => Promise<void>;
  onCancel?: () => void;
  initialData?: Post;
  submitLabel?: string;
}

export const PostForm: React.FC<PostFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  submitLabel = 'Create Post',
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [errors, setErrors] = useState<{ title?: string; content?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: { title?: string; content?: string } = {};
    
    const titleValidation = validatePostTitle(title);
    if (!titleValidation.valid) {
      newErrors.title = titleValidation.message;
    }
    
    const contentValidation = validatePostContent(content);
    if (!contentValidation.valid) {
      newErrors.content = contentValidation.message;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit
    setLoading(true);
    try {
      await onSubmit({ title, content });
      setTitle('');
      setContent('');
    } catch (error: any) {
      setErrors({ general: error.message || 'Failed to save post' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {errors.general}
        </div>
      )}
      
      <Input
        type="text"
        label="Title"
        placeholder="Enter post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={errors.title}
        disabled={loading}
        maxLength={100}
      />
      
      <Textarea
        label="Content"
        placeholder="Write your message here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        error={errors.content}
        disabled={loading}
        rows={6}
        maxLength={5000}
      />
      
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

