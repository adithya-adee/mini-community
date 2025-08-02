"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LoginForm, RegisterForm } from "@/components/auth/AuthForms";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PostFeed } from "@/components/posts/PostComponents";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm onToggle={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onToggle={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome to Mini Community</h1>
          <p className="text-muted-foreground">
            Share your thoughts and connect with others
          </p>
        </div>
        <PostFeed />
      </div>
    </DashboardLayout>
  );
}

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return user ? <HomePage /> : <AuthPage />;
}
