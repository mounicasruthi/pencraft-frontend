import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// This would normally fetch from the API
const FEATURED_POSTS = [
  {
    id: 1,
    title: "The Art of Creative Writing",
    excerpt: "Discover the secrets to crafting compelling stories that captivate readers...",
    author: "Emma Thompson",
    date: "2024-03-20",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "Building a Personal Brand",
    excerpt: "Learn how to establish your unique voice and build a loyal following...",
    author: "Michael Chen",
    date: "2024-03-19",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "The Future of AI in Writing",
    excerpt: "Exploring how artificial intelligence is transforming content creation...",
    author: "Sarah Johnson",
    date: "2024-03-18",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60"
  }
];

export default function FeaturedPosts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {FEATURED_POSTS.map((post) => (
        <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-muted-foreground mb-4">{post.excerpt}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-primary">{post.author}</span>
              <span className="text-muted-foreground">{post.readTime}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export function FeaturedPostsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="w-full h-48" />
          <div className="p-6">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-4" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}