import { Metadata } from "next";
import PostContent from '@/components/post-content';

import API from "@/utils/api";

export async function generateStaticParams() {
  const posts = await API.get("/posts").then((res) => res.data);

  return posts.map((post: any) => ({
    id: post.postId,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await API.get(`/posts/${params.id}`).then((res) => res.data);

  return {
    title: post.title || "Post",
    description: `Read ${post.title}`,
  };
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await API.get(`/posts/${params.id}`).then((res) => res.data);

  if (!post) {
    return <div className="text-center py-20 text-red-600">Post not found.</div>;
  }

  return <PostContent post={post} />;
}
