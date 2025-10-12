import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  onSnapshot,
  QuerySnapshot,
} from 'firebase/firestore';
import { db } from './firebase';
import { Post, PostFormData } from '@/types';

const POSTS_COLLECTION = 'posts';

export const postService = {
  // Create a new post
  createPost: async (postData: PostFormData, authorId: string, authorEmail: string): Promise<string> => {
    try {
      const docRef = await addDoc(collection(db, POSTS_COLLECTION), {
        title: postData.title,
        content: postData.content,
        author: authorEmail,
        authorId: authorId,
        createdAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create post');
    }
  },

  // Get all posts
  getPosts: async (): Promise<Post[]> => {
    try {
      const q = query(collection(db, POSTS_COLLECTION), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const posts: Post[] = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() } as Post);
      });
      return posts;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch posts');
    }
  },

  // Subscribe to posts in real-time
  subscribeToPosts: (callback: (posts: Post[]) => void): (() => void) => {
    const q = query(collection(db, POSTS_COLLECTION), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot) => {
      const posts: Post[] = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() } as Post);
      });
      callback(posts);
    });

    return unsubscribe;
  },

  // Update a post
  updatePost: async (postId: string, postData: PostFormData): Promise<void> => {
    try {
      const postRef = doc(db, POSTS_COLLECTION, postId);
      await updateDoc(postRef, {
        title: postData.title,
        content: postData.content,
      });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update post');
    }
  },

  // Delete a post
  deletePost: async (postId: string): Promise<void> => {
    try {
      const postRef = doc(db, POSTS_COLLECTION, postId);
      await deleteDoc(postRef);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete post');
    }
  },
};

