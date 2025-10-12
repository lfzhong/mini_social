export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters long' };
  }
  return { valid: true };
};

export const validatePostTitle = (title: string): { valid: boolean; message?: string } => {
  if (!title.trim()) {
    return { valid: false, message: 'Title is required' };
  }
  if (title.length > 100) {
    return { valid: false, message: 'Title must be less than 100 characters' };
  }
  return { valid: true };
};

export const validatePostContent = (content: string): { valid: boolean; message?: string } => {
  if (!content.trim()) {
    return { valid: false, message: 'Content is required' };
  }
  if (content.length > 5000) {
    return { valid: false, message: 'Content must be less than 5000 characters' };
  }
  return { valid: true };
};

