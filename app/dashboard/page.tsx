"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenLine, ListChecks } from "lucide-react";
import NewPostForm from "@/components/new-post-form";
import UserPosts from "@/components/user-posts";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={() => setActiveTab("new")}>
          <PenLine className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="posts">
            <ListChecks className="mr-2 h-4 w-4" />
            My Posts
          </TabsTrigger>
          <TabsTrigger value="new">
            <PenLine className="mr-2 h-4 w-4" />
            New Post
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          <UserPosts />
        </TabsContent>

        <TabsContent value="new">
          <Card className="p-6">
            <NewPostForm onSuccess={() => setActiveTab("posts")} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}