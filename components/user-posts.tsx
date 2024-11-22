import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

// This would normally fetch from backend API
const USER_POSTS = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    excerpt: "Learn how to build modern web applications with Next.js...",
    date: "2024-03-20",
    status: "published"
  },
  {
    id: 2,
    title: "The Power of TypeScript",
    excerpt: "Discover why TypeScript is becoming the standard for large applications...",
    date: "2024-03-19",
    status: "draft"
  }
];

export default function UserPosts() {
  return (
    <div className="space-y-4">
      {USER_POSTS.map((post) => (
        <Card key={post.id} className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-sm">
                <span>{post.date}</span>
                <span className={`capitalize ${
                  post.status === "published" ? "text-green-600" : "text-yellow-600"
                }`}>
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