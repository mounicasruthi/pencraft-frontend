// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "sonner";

// interface NewPostFormProps {
//   onSuccess: () => void;
// }

// export default function NewPostForm({ onSuccess }: NewPostFormProps) {
//   const [isLoading, setIsLoading] = useState(false);

//   async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     setIsLoading(true);

//     try {
//       //  integrate with backend API
//       await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
//       toast.success("Post created successfully!");
//       onSuccess();
//     } catch (error) {
//       toast.error("Failed to create post. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <form onSubmit={onSubmit} className="space-y-6">
//       <div className="space-y-2">
//         <Label htmlFor="title">Title</Label>
//         <Input
//           id="title"
//           placeholder="Enter your post title"
//           required
//           disabled={isLoading}
//         />
//       </div>
//       <div className="space-y-2">
//         <Label htmlFor="content">Content</Label>
//         <Textarea
//           id="content"
//           placeholder="Write your post content here..."
//           className="min-h-[200px]"
//           required
//           disabled={isLoading}
//         />
//       </div>
//       <Button type="submit" disabled={isLoading} className="w-full">
//         {isLoading ? "Creating..." : "Create Post"}
//       </Button>
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import API from "@/utils/api"; // Import the reusable API client

interface NewPostFormProps {
  onSuccess: () => void; // Callback after successful post creation
}

export default function NewPostForm({ onSuccess }: NewPostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getToken = () => localStorage.getItem("token"); // Replace with your token retrieval logic

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Integrate with backend API
      await API.post(
        "/posts",
        { title, content },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );

      toast.success("Post created successfully!");
      onSuccess(); // Trigger parent callback
      setTitle(""); // Reset form
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
        <Textarea
          id="content"
          placeholder="Write your post content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
