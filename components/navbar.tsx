"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, profileImage, setAuth } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userProfile");
    setAuth({ isLoggedIn: false, profileImage: null }); // Update auth state
    router.push("/"); // Redirect to homepage
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Link href="/" className="font-bold text-xl mr-6">
          Pencraft
        </Link>

        {/* Links */}
        <div className="flex-1 items-center space-x-4 hidden md:flex">
          <Link
            href="/posts"
            className={
              pathname === "/posts" ? "text-primary" : "text-foreground/60"
            }
          >
            All Posts
          </Link>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {isLoggedIn ? (
            <>
              {/* Create Post Button */}
              <Link href="/dashboard?tab=new">
                <Button>
                  Create Post
                  <PenLine className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              {/* Profile Icon */}
              <img
                src={profileImage || "https://robohash.org/default-profile.png"}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover cursor-pointer"
                onClick={() => router.push("/dashboard")} // Redirect to dashboard
              />
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>
                  Get Started
                  <PenLine className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
