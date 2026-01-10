// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  profileImage?: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isFollowing?: boolean;
  Followed?: boolean;
}

// Post Types
export interface Post {
  id: string;
  userId: string;
  author: User;
  album?: string;
  caption: string;
  images: string[];
  likes: number;
  comments: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
}

// Comment Types
export interface Comment {
  id: string;
  postId: string;
  userId: string;
  author: User;
  content: string;
  likes: number;
  isLiked: boolean;
  createdAt: string;
}

// Story Types
export interface Story {
  id: string;
  userId: string;
  author: User;
  image: string;
  viewed: boolean;
  createdAt: string;
  expiresAt: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: "like" | "comment" | "follow" | "message";
  actor: User;
  postId?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
