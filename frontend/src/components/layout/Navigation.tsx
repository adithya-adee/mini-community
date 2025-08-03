"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-primary">
              Mini Community
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link href="/">
                <Button
                  variant={pathname === "/" ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Button>
              </Link>
              <Link href={`/profile/${user._id}`}>
                <Button
                  variant={
                    pathname.startsWith("/profile") ? "default" : "ghost"
                  }
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.profilePicture} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{user.name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Profile", href: `/profile/${user._id}`, icon: User },
    // { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r bg-background/95 backdrop-blur">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Avatar>
            <AvatarImage src={user.profilePicture} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
