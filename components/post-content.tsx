"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import API from "@/utils/api";

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

  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  useEffect(() => {
    if (!post) {
      toast.error("Post not found. Redirecting...");
      router.push("/posts");
    }
  }, [post, router]);

  const summarizeArticle = async () => {
    setIsSummarizing(true);
  
    try {
      const response = await API.post("/gemini/summarize", {
        content: post.content,
      });
  
      // Extract summary from response
      const generatedSummary = response.data.summary || "Failed to generate summary.";
      setSummary(generatedSummary);
      toast.success("Summary generated!");
    } catch (error: any) {
      console.error("Error summarizing article:", error);
      toast.error(
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to generate summary. Please try again."
      );
    } finally {
      setIsSummarizing(false);
    }
  };
  

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

      {/* Summarize Button */}
      <div className="flex justify-center mb-6">
        <Button
          onClick={summarizeArticle}
          disabled={isSummarizing}
          className="px-6 py-3 rounded-md"
        >
          {isSummarizing ? "Summarizing..." : "Summarize Article"}
        </Button>
      </div>

      {/* Summary Display */}
      {isSummarizing ? (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      ) : summary && (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Summary</h2>
          <p className="text-muted-foreground">{summary}</p>
        </div>
      )}

      {/* Post Content */}
      <div className="prose dark:prose-invert max-w-none mb-6">
        <MarkdownRenderer markdown={post.content} />
      </div>
    </article>
  );
}
