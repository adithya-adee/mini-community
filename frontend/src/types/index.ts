export interface User {
  _id: string;
  name: string;
  email: string;
  bio: string;
  profilePicture: string;
  joinedAt: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  _id: string;
  content: string;
  author: {
    _id: string;
    name: string;
    profilePicture: string;
  };
  likes: Array<{
    user: string;
    likedAt: string;
  }>;
  likesCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  formattedDate?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface PostsResponse {
  posts: Post[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
  };
}
