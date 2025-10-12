export const APP_NAME = 'Mini Social';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
} as const;

export const ERROR_MESSAGES = {
  AUTH_FAILED: 'Authentication failed. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  PERMISSION_DENIED: 'You do not have permission to perform this action.',
  POST_LOAD_ERROR: 'Failed to load posts. Please refresh the page.',
  POST_CREATE_ERROR: 'Failed to create post. Please try again.',
  POST_UPDATE_ERROR: 'Failed to update post. Please try again.',
  POST_DELETE_ERROR: 'Failed to delete post. Please try again.',
} as const;

export const SUCCESS_MESSAGES = {
  POST_CREATED: 'Post created successfully!',
  POST_UPDATED: 'Post updated successfully!',
  POST_DELETED: 'Post deleted successfully!',
  LOGIN_SUCCESS: 'Welcome back!',
  REGISTER_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully.',
} as const;

