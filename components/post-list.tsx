// import { Card } from '@/components/ui/card';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { formatDistanceToNow } from 'date-fns';
// import Link from 'next/link';

// async function getPosts(authorId?: string) {
//   // This would be the actual API call
//   const posts = [
//     {
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
//     {
//       id: '2',
//       title: 'Building with Next.js 14',
//       content: 'Exploring the latest features...',
//       author: {
//         id: 'a2',
//         name: 'Michael Chen',
//         image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
//       },
//       createdAt: new Date('2024-03-19'),
//     },
//   ];

//   if (authorId) {
//     return posts.filter(post => post.author.id === authorId);
//   }

//   return posts;
// }

// export default async function PostList({ authorId }: { authorId?: string }) {
//   const posts = await getPosts(authorId);

//   return (
//     <div className="space-y-6">
//       {posts.map((post) => (
//         <Link key={post.id} href={`/posts/${post.id}`}>
//           <Card className="p-6 hover:shadow-lg transition-shadow">
//             <div className="flex items-start justify-between">
//               <div className="flex-1">
//                 <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
//                 <p className="text-muted-foreground mb-4">{post.content}</p>
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-2">
//                     <Avatar className="h-6 w-6">
//                       <AvatarImage src={post.author.image} />
//                       <AvatarFallback>{post.author.name[0]}</AvatarFallback>
//                     </Avatar>
//                     <span className="text-sm font-medium">{post.author.name}</span>
//                   </div>
//                   <span className="text-sm text-muted-foreground">
//                     {formatDistanceToNow(post.createdAt, { addSuffix: true })}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </Card>
//         </Link>
//       ))}
//     </div>
//   );
// }

"use client";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import API from "@/utils/api";

interface Post {
  id: string;
  title: string;
  content: string;
  author?: {
    id: string;
    name: string;
    image?: string;
  };
  createdAt: string;
}

export default function PostList({ authorId }: { authorId?: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const endpoint = authorId ? `/posts?authorId=${authorId}` : "/posts";
      const data = await API.get(endpoint).then((res) => res.data);
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [authorId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-muted-foreground mb-4">{post.content}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      {post.author?.image ? (
                        <AvatarImage src={post.author.image} />
                      ) : (
                        <AvatarFallback>
                          {post.author?.name
                            ? post.author.name[0]
                            : "?" /* Fallback to "?" */}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className="text-sm font-medium">
                      {post.author?.name || "Unknown Author"}
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
