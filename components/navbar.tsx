"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Link href="/" className="font-bold text-xl mr-6">
          Pencraft
        </Link>

        <div className="flex-1 items-center space-x-4 hidden md:flex">
          <Link
            href="/posts"
            className={pathname === "/posts" ? "text-primary" : "text-foreground/60"}
          >
            Posts
          </Link>
          <Link
            href="/authors"
            className={pathname === "/authors" ? "text-primary" : "text-foreground/60"}
          >
            Authors
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/signup">
            <Button>
              Get Started
              <PenLine className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}