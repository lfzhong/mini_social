import { Timestamp } from 'firebase/firestore';

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: Timestamp;
}

export interface PostFormData {
  title: string;
  content: string;
}

