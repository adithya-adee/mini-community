"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { User, Post, PostsResponse } from "@/types";
import { userAPI, postAPI } from "@/lib/api";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PostCard } from "@/components/posts/PostComponents";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Calendar, Mail } from "lucide-react";

export default function ProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  const { user: currentUser, token, updateUser } = useAuth();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    bio: "",
    profilePicture: "",
  });
  const [updating, setUpdating] = useState(false);

  const isOwnProfile = currentUser?._id === userId;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token || !userId) return;

      try {
        // Fetch user profile
        const userData = await userAPI.getUser(userId, token);
        setProfileUser(userData);
        setEditForm({
          name: userData.name,
          bio: userData.bio,
          profilePicture: userData.profilePicture,
        });

        // Fetch user posts
        const postsResponse: PostsResponse = await postAPI.getUserPosts(
          userId,
          token
        );
        setPosts(postsResponse.posts);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, token]);

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

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOwnProfile) return;

    setUpdating(true);
    try {
      await updateUser(editForm);
      setProfileUser((prev) => (prev ? { ...prev, ...editForm } : null));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handlePostDelete = async (id: string) => {
    try {
      if (!token) {
        return;
      }

      await postAPI.deletePost(id, token);
      console.log("Deleted Successfully");
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Card className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-20 w-20 bg-muted rounded-full" />
                <div className="space-y-2">
                  <div className="h-6 w-32 bg-muted rounded" />
                  <div className="h-4 w-48 bg-muted rounded" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (!profileUser) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-2">User not found</h1>
          <p className="text-muted-foreground">
            The user you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profileUser.profilePicture} />
                  <AvatarFallback className="text-lg">
                    {profileUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{profileUser.name}</h1>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span>{profileUser.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {formatDate(profileUser.joinedAt)}</span>
                    </div>
                  </div>
                  {profileUser.bio && (
                    <p className="text-muted-foreground mt-2 max-w-md">
                      {profileUser.bio}
                    </p>
                  )}
                </div>
              </div>
              {isOwnProfile && (
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  size="sm"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Form */}
        {isEditing && (
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={editForm.bio}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    rows={3}
                    maxLength={500}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profilePicture">Profile Picture URL</Label>
                  <Input
                    id="profilePicture"
                    type="url"
                    value={editForm.profilePicture}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        profilePicture: e.target.value,
                      }))
                    }
                    placeholder="https://example.com/your-photo.jpg"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" disabled={updating}>
                    {updating ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Posts Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {isOwnProfile ? "Your Posts" : `${profileUser.name}'s Posts`}
          </h2>
          {posts.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  {isOwnProfile
                    ? "You haven't posted anything yet."
                    : "No posts to show."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onLike={handleLike}
                  onDelete={() => handlePostDelete(post._id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
