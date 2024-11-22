"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListChecks, LogOut, PenLine } from "lucide-react";
import NewPostForm from "@/components/new-post-form";
import UserPosts from "@/components/user-posts";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("posts");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab); // Set the active tab based on the query parameter
    }
  }, [searchParams]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userProfile");
    router.push("/"); // Redirect to homepage
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/dashboard?tab=${tab}`); // Update the query parameter
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={handleLogout} variant="ghost">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList>
          <TabsTrigger value="posts">
            <ListChecks className="mr-2 h-4 w-4" />
            My Posts
          </TabsTrigger>
          <TabsTrigger value="new">
            <PenLine className="ml-2 h-4 w-4" />
            New Post
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          <UserPosts />
        </TabsContent>

        <TabsContent value="new">
          <Card className="p-6">
            <NewPostForm onSuccess={() => handleTabChange("posts")} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
