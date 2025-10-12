# API Documentation

This document describes the services and functions available in the Mini Social application.

## Authentication Service

Located in: `src/services/authService.ts`

### `authService.register(email, password)`

Register a new user with email and password.

**Parameters:**
- `email` (string): User's email address
- `password` (string): User's password (minimum 6 characters)

**Returns:** Promise<FirebaseUser>

**Example:**
```typescript
try {
  const user = await authService.register('user@example.com', 'password123');
  console.log('User created:', user.uid);
} catch (error) {
  console.error('Registration failed:', error.message);
}
```

### `authService.login(email, password)`

Login a user with email and password.

**Parameters:**
- `email` (string): User's email address
- `password` (string): User's password

**Returns:** Promise<FirebaseUser>

**Example:**
```typescript
try {
  const user = await authService.login('user@example.com', 'password123');
  console.log('User logged in:', user.uid);
} catch (error) {
  console.error('Login failed:', error.message);
}
```

### `authService.logout()`

Logout the current user.

**Returns:** Promise<void>

**Example:**
```typescript
try {
  await authService.logout();
  console.log('User logged out');
} catch (error) {
  console.error('Logout failed:', error.message);
}
```

### `authService.getCurrentUser()`

Get the currently authenticated user.

**Returns:** FirebaseUser | null

**Example:**
```typescript
const user = authService.getCurrentUser();
if (user) {
  console.log('Current user:', user.email);
} else {
  console.log('No user logged in');
}
```

## Post Service

Located in: `src/services/postService.ts`

### `postService.createPost(postData, authorId, authorEmail)`

Create a new post.

**Parameters:**
- `postData` (PostFormData): Object with `title` and `content`
- `authorId` (string): Firebase user ID
- `authorEmail` (string): User's email

**Returns:** Promise<string> (post ID)

**Example:**
```typescript
try {
  const postId = await postService.createPost(
    { title: 'My First Post', content: 'Hello world!' },
    'user-uid',
    'user@example.com'
  );
  console.log('Post created with ID:', postId);
} catch (error) {
  console.error('Failed to create post:', error.message);
}
```

### `postService.getPosts()`

Get all posts (one-time fetch).

**Returns:** Promise<Post[]>

**Example:**
```typescript
try {
  const posts = await postService.getPosts();
  console.log('Found', posts.length, 'posts');
} catch (error) {
  console.error('Failed to fetch posts:', error.message);
}
```

### `postService.subscribeToPosts(callback)`

Subscribe to real-time post updates.

**Parameters:**
- `callback` (function): Function called with updated posts array

**Returns:** Unsubscribe function

**Example:**
```typescript
const unsubscribe = postService.subscribeToPosts((posts) => {
  console.log('Posts updated:', posts.length);
  setPosts(posts);
});

// Later, when component unmounts:
unsubscribe();
```

### `postService.updatePost(postId, postData)`

Update an existing post.

**Parameters:**
- `postId` (string): Post ID
- `postData` (PostFormData): Object with updated `title` and `content`

**Returns:** Promise<void>

**Example:**
```typescript
try {
  await postService.updatePost('post-id', {
    title: 'Updated Title',
    content: 'Updated content'
  });
  console.log('Post updated');
} catch (error) {
  console.error('Failed to update post:', error.message);
}
```

### `postService.deletePost(postId)`

Delete a post.

**Parameters:**
- `postId` (string): Post ID

**Returns:** Promise<void>

**Example:**
```typescript
try {
  await postService.deletePost('post-id');
  console.log('Post deleted');
} catch (error) {
  console.error('Failed to delete post:', error.message);
}
```

## Hooks

### `useAuth()`

Hook to access authentication context.

**Returns:** Object with:
- `currentUser` (User | null): Currently logged-in user
- `loading` (boolean): Whether auth state is loading
- `login` (function): Login function
- `register` (function): Register function
- `logout` (function): Logout function

**Example:**
```typescript
const { currentUser, loading, login, logout } = useAuth();

if (loading) return <LoadingSpinner />;

if (currentUser) {
  return <button onClick={logout}>Logout</button>;
}
```

### `usePosts()`

Hook to fetch and subscribe to posts.

**Returns:** Object with:
- `posts` (Post[]): Array of posts
- `loading` (boolean): Whether posts are loading
- `error` (string | null): Error message if any
- `refreshPosts` (function): Manually refresh posts

**Example:**
```typescript
const { posts, loading, error, refreshPosts } = usePosts();

if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} />;

return <PostList posts={posts} />;
```

## Utility Functions

### Date Utils (`src/utils/dateUtils.ts`)

#### `formatDate(timestamp)`

Format a Firestore timestamp to a relative time string.

**Example:**
```typescript
import { formatDate } from '@/utils/dateUtils';

const timeStr = formatDate(post.createdAt);
// Output: "2 hours ago" or "Jan 15, 2024"
```

#### `formatFullDate(timestamp)`

Format a Firestore timestamp to a full date string.

**Example:**
```typescript
const dateStr = formatFullDate(post.createdAt);
// Output: "January 15, 2024, 2:30 PM"
```

### Validation Utils (`src/utils/validation.ts`)

#### `validateEmail(email)`

Validate an email address.

**Returns:** boolean

#### `validatePassword(password)`

Validate a password.

**Returns:** Object with `valid` (boolean) and optional `message` (string)

#### `validatePostTitle(title)`

Validate a post title.

**Returns:** Object with `valid` (boolean) and optional `message` (string)

#### `validatePostContent(content)`

Validate post content.

**Returns:** Object with `valid` (boolean) and optional `message` (string)

## Type Definitions

### User
```typescript
interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
}
```

### Post
```typescript
interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: Timestamp;
}
```

### PostFormData
```typescript
interface PostFormData {
  title: string;
  content: string;
}
```

## Error Handling

All service functions throw errors that should be caught and handled:

```typescript
try {
  await postService.createPost(data, uid, email);
} catch (error) {
  if (error.message.includes('permission')) {
    // Handle permission error
  } else {
    // Handle other errors
  }
}
```

## Constants

Located in: `src/utils/constants.ts`

### Routes
```typescript
ROUTES.HOME = '/'
ROUTES.LOGIN = '/login'
ROUTES.REGISTER = '/register'
```

### Messages
```typescript
ERROR_MESSAGES.POST_CREATE_ERROR
ERROR_MESSAGES.AUTH_FAILED
// ... etc

SUCCESS_MESSAGES.POST_CREATED
SUCCESS_MESSAGES.LOGIN_SUCCESS
// ... etc
```

