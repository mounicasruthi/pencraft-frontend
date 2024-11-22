"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface NewPostFormProps {
  onSuccess: () => void;
}

export default function NewPostForm({ onSuccess }: NewPostFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      //  integrate with backend API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast.success("Post created successfully!");
      onSuccess();
    } catch (error) {
      toast.error("Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter your post title"
          required
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Write your post content here..."
          className="min-h-[200px]"
          required
          disabled={isLoading}
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Creating..." : "Create Post"}
      </Button>
    </form>
  );
}