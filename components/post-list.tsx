"use client";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import API from "@/utils/api";

interface Post {
  postId: string;
  title: string;
  content: string;
  author?: {
    id: string;
    username: string;
    profileImage?: string;
  };
  createdAt: string;
}

export default function PostList({ authorId }: { authorId?: string }) {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    const query = searchParams.toString();

    try {
      const data = await API.get(`/posts?${query}`).then((res) => res.data);
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span>Loading posts...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const truncateContent = (content: string, length: number) => {
    return content.length > length ? `${content.slice(0, length)}...` : content;
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Link key={post.postId} href={`/posts/${post.postId}`}>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-muted-foreground mb-4">
                  {truncateContent(post.content, 150)}{" "}
                  {/* 150 characters max */}
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      {post.author?.profileImage ? (
                        <AvatarImage src={post.author.profileImage} />
                      ) : (
                        <AvatarFallback>
                          {
                            post.author?.username
                              ? post.author.username[0]
                              : "?" /* Fallback to "?" */
                          }
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className="text-sm font-medium">
                      {post.author?.username || "Unknown Author"}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
