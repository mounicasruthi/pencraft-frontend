"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import API from "@/utils/api";

interface Post {
  id: string;
  title: string;
  content: string;
  status: string;
  createdAt: string;
}

export default function UserPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserPosts = async () => {
    setLoading(true);
    setError(null); // Reset error before a new fetch attempt
    try {
      const data = await API.get("/posts/users/me/posts", {
        headers: { Authorization: `Bearer ${getToken()}` },
      }).then((res) => res.data);

      setPosts(data);
    } catch (err: any) {
      console.error("Error fetching user posts:", err);
      setError("Failed to fetch user posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span>Loading posts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>{error}</p>
        <Button variant="default" onClick={fetchUserPosts}>
          Retry
        </Button>
      </div>
    );
  }

  
  const truncateContent = (content: string, length: number) => {
    return content.length > length ? `${content.slice(0, length)}...` : content;
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-muted-foreground mb-4">
  {truncateContent(post.content, 150)} {/* 150 characters max */}
</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground">
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </span>
                <span
                  className={`capitalize ${
                    post.status === "published" ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {post.status}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

const getToken = (): string | null => localStorage.getItem("token");
