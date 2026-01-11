/* ==================== Types ==================== */
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export interface PostState {
  postList: Post | null;
  postByIdList: Post | null;
  commentByIdList: Comment | null;
  status: RequestStatus;
  error: string | null;
}

export interface PostCustom {
  userName?: string;
  name?: string;
  imageProfile?: string;
  imagePost?: string[];
  imageVDO?: string;
  atDate?: string;
  location?: string;
  music?: string;
  album?: string;
  albumImages?: string[];
}

/* Post Types */
export interface Reactions {
  likes: number;
  dislikes: number;
}

export interface PostItem extends PostCustom {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
  views: number;
  userId: number;
}

export interface Post {
  limit: number;
  skip: number;
  total: number;
  posts: PostItem[];
}

/* Comment Types */
export interface CommentUser {
  id: number;
  username: string;
  fullName: string;
}

export interface CommentItem {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: CommentUser;
  userName?: string;
  name?: string;
  imagePost?: string[];
  imageProfile?: string;
  imageVDO?: string;
  atDate?: string;
  location?: string;
  music?: string;
}

export interface Comment {
  comments: CommentItem[];
  total: number;
  skip: number;
  limit: number;
}
