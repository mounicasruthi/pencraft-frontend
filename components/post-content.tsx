"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import dynamic from "next/dynamic";

const MarkdownRenderer = dynamic(() => import("react-showdown"), { ssr: false });

interface PostContentProps {
  post: {
    title: string;
    content: string;
    author: {
      username: string;
      profileImage?: string;
    };
    createdAt: string;
  };
}

export default function PostContent({ post }: PostContentProps) {
  const router = useRouter();

  useEffect(() => {
    if (!post) {
      toast.error("Post not found. Redirecting...");
      router.push("/posts");
    }
  }, [post, router]);

  if (!post) return null;

  return (
    <article className="max-w-4xl mx-auto p-6 sm:p-10">
      {/* Post Title */}
      <h1 className="text-4xl font-bold mb-4 text-center">{post.title}</h1>

      {/* Author and Metadata */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Avatar>
            {post.author?.profileImage ? (
              <AvatarImage src={post.author.profileImage} />
            ) : (
              <AvatarFallback>{post.author?.username[0]}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <div className="text-lg font-medium">{post.author?.username || "Unknown Author"}</div>
            <div className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </div>
          </div>
        </div>
        <span className="text-sm text-muted-foreground italic">
          Published on {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Post Content */}
      <div className="prose dark:prose-invert max-w-none">
        <MarkdownRenderer markdown={post.content} />
      </div>
    </article>
  );
}
