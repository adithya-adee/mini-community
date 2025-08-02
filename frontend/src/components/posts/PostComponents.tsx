"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Post, PostsResponse } from "@/types";
import { postAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function CreatePost({ onPostCreated }: { onPostCreated: () => void }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !token) return;

    setLoading(true);
    try {
      await postAPI.createPost(content, token);
      setContent("");
      onPostCreated();
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none"
            maxLength={1000}
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {content.length}/1000
            </span>
            <Button type="submit" disabled={loading || !content.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              {loading ? "Posting..." : "Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function PostCard({
  post,
  onLike,
  onDelete,
}: {
  post: Post;
  onLike: (postId: string) => void;
  onDelete?: (postId: string) => void;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const isLiked = post.likes.some((like) => like.user === user?._id);
  const isOwner = post.author._id === user?._id;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours =
      Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 0.5) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleProfileRedirect = (id: string) => {
    router.replace(`/profile/${id}`);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar onClick={() => handleProfileRedirect(post.author._id)}>
              <AvatarImage src={post.author.profilePicture} />
              <AvatarFallback>
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>
          {isOwner && (
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm leading-relaxed mb-4">{post.content}</p>
        <div className="flex items-center space-x-6 text-muted-foreground">
          <Button
            variant="ghost"
            size="sm"
            className={`p-0 h-auto font-normal ${
              isLiked ? "text-red-500" : ""
            }`}
            onClick={() => onLike(post._id)}
          >
            <Heart
              className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`}
            />
            {post.likesCount}
          </Button>
          <Button variant="ghost" size="sm" className="p-0 h-auto font-normal">
            <MessageCircle className="h-4 w-4 mr-1" />0
          </Button>
          <Button variant="ghost" size="sm" className="p-0 h-auto font-normal">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { token } = useAuth();

  const fetchPosts = async (pageNum = 1, reset = false) => {
    if (!token) return;

    try {
      const response: PostsResponse = await postAPI.getFeedPosts(
        token,
        pageNum,
        10
      );
      if (reset) {
        setPosts(response.posts);
      } else {
        setPosts((prev) => [...prev, ...response.posts]);
      }
      setHasMore(
        response.pagination.currentPage < response.pagination.totalPages
      );
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1, true);
  }, [token]);

  const handleLike = async (postId: string) => {
    if (!token) return;

    try {
      const updatedPost = await postAPI.likePost(postId, token);
      setPosts((prev) =>
        prev.map((post) => (post._id === postId ? updatedPost : post))
      );
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const handlePostCreated = () => {
    setPage(1);
    fetchPosts(1, true);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage, false);
  };

  if (loading && posts.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 bg-muted rounded-full" />
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-muted rounded" />
                  <div className="h-3 w-16 bg-muted rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-3/4 bg-muted rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CreatePost onPostCreated={handlePostCreated} />
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} onLike={handleLike} />
        ))}
      </div>
      {hasMore && !loading && (
        <div className="text-center">
          <Button onClick={loadMore} variant="outline">
            Load More
          </Button>
        </div>
      )}
      {loading && posts.length > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Loading more posts...</p>
        </div>
      )}
    </div>
  );
}
