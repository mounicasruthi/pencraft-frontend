"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import API from "@/utils/api";
import "react-mde/lib/styles/css/react-mde-all.css";
import Showdown from "showdown";

interface NewPostFormProps {
  onSuccess: () => void;
}

const ReactMde = dynamic(() => import("react-mde"), { ssr: false });

export default function NewPostForm({ onSuccess }: NewPostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Markdown content
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
  const [isLoading, setIsLoading] = useState(false);

  const getToken = () => localStorage.getItem("token");
  const converter = new Showdown.Converter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await API.post(
        "/posts",
        { title, content },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );

      toast.success("Post created successfully!");
      onSuccess();
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <div className="border rounded-lg overflow-hidden">
          <ReactMde
            value={content}
            onChange={setContent}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(converter.makeHtml(markdown))
            }
            minEditorHeight={200}
            maxEditorHeight={400}
            toolbarCommands={[
              ["bold", "italic", "strikethrough"],
              ["link", "quote", "code"],
              ["unordered-list", "ordered-list"],
            ]}
            classes={{
              reactMde: "bg-[var(--background)] text-[var(--background)]",
              textArea:
                "bg-[var(--background)] text-[var(--foreground)] p-4 rounded-b-lg",
              toolbar:
                "bg-[var(--toolbar-bg)] text-[var(--toolbar-text)] p-2 rounded-t-lg",
              preview:
                "bg-[var(--preview-bg)] text-[var(--foreground)] p-6 rounded-md",
            }}
          />
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Creating..." : "Create Post"}
      </Button>
    </form>
  );
}
