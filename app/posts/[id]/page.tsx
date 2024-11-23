// import { notFound } from 'next/navigation';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { formatDistanceToNow } from 'date-fns';

// // This would be the actual API call
// async function getPost(id: string) {
//   const posts: Record<string, { id: string; title: string; content: string; author: { id: string; name: string; image: string; }; createdAt: Date; }> = {
//     '1': {
//       id: '1',
//       title: 'Understanding React Server Components',
//       content: 'A deep dive into the future of React...',
//       author: {
//         id: 'a1',
//         name: 'Sarah Johnson',
//         image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
//       },
//       createdAt: new Date('2024-03-20'),
//     },
//   };

//   return posts[id as keyof typeof posts];
// }

// export async function generateStaticParams() {
//   // In production, this would fetch all post IDs from the API
//   return [{ id: '1' }];
// }

// export default async function PostPage({ params }: { params: { id: string } }) {
//   const post = await getPost(params.id);

//   if (!post) {
//     notFound();
//   }

//   return (
//     <article className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
//       <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      
//       <div className="flex items-center gap-4 mb-8">
//         <Avatar>
//           <AvatarImage src={post.author.image} />
//           <AvatarFallback>{post.author.name[0]}</AvatarFallback>
//         </Avatar>
//         <div>
//           <div className="font-medium">{post.author.name}</div>
//           <div className="text-sm text-muted-foreground">
//             {formatDistanceToNow(post.createdAt, { addSuffix: true })}
//           </div>
//         </div>
//       </div>

//       <div className="prose dark:prose-invert max-w-none">
//         {post.content}
//       </div>
//     </article>
//   );
// }

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import API from "@/utils/api";

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    image?: string;
  };
  createdAt: string;
}

export default function PostPage() {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await API.get(`/posts/${id}`).then((res) => res.data); // Fetch post by ID
      setPost(data);
    } catch (err) {
      console.error("Error fetching post:", err);
      setError("Failed to load the post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchPost(); // Fetch the post when the component mounts
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>;
  }

  if (!post) {
    return <div className="text-center">Post not found.</div>;
  }

  return (
    <article className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Post Title */}
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

      {/* Author and Timestamp */}
      <div className="flex items-center gap-4 mb-8">
        <Avatar>
          {post.author.image ? (
            <AvatarImage src={post.author.image} />
          ) : (
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <div className="font-medium">{post.author.name}</div>
          <div className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </div>
        </div>
      </div>

      {/* Post Content */}
      <Card className="p-6">
        <div className="prose dark:prose-invert max-w-none">{post.content}</div>
      </Card>
    </article>
  );
}
