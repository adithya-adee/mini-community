const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Auth API calls
export const authAPI = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    bio?: string;
    profilePicture?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    return response.json();
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.msg || "Login failed");
    }

    return response.json();
  },
};

// User API calls
export const userAPI = {
  getUser: async (userId: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  },

  getAllUsers: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return response.json();
  },

  updateUser: async (
    userId: string,
    userData: {
      name?: string;
      bio?: string;
      profilePicture?: string;
    },
    token: string
  ) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update user");
    }

    return response.json();
  },
};

// Post API calls
export const postAPI = {
  getFeedPosts: async (token: string, page = 1, limit = 10) => {
    const response = await fetch(
      `${API_BASE_URL}/posts?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    return response.json();
  },

  getUserPosts: async (userId: string, token: string, page = 1, limit = 10) => {
    const response = await fetch(
      `${API_BASE_URL}/posts/user/${userId}?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user posts");
    }

    return response.json();
  },

  createPost: async (content: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create post");
    }

    return response.json();
  },

  likePost: async (postId: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to like/unlike post");
    }

    return response.json();
  },

  deletePost: async (postId: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete post");
    }

    return response.json();
  },
};
