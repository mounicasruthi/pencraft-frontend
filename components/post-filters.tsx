"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import API from "@/utils/api";

interface Author {
  authorId: string;
  username: string;
}

export default function PostFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedAuthor, setSelectedAuthor] = useState(
    searchParams.get("author") || "all"
  );
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loadingAuthors, setLoadingAuthors] = useState(false);

  useEffect(() => {
    const fetchAuthors = async () => {
      setLoadingAuthors(true);
      try {
        const data = await API.get("/authors").then((res) => res.data);
        console.log("Fetched authors:", data); // Debug log
        setAuthors(data);
      } catch (err) {
        console.error("Error fetching authors:", err);
      } finally {
        setLoadingAuthors(false);
      }
    };
    fetchAuthors();
  }, []);

  const handleAuthorChange = (authorId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (authorId === "all") {
      params.delete("author");
    } else {
      params.set("author", authorId);
    }
    params.delete("page");

    console.log("Updated Query Params:", params.toString());

    router.push(`/posts?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    params.delete("page");
    router.push(`/posts?${params.toString()}`);
  };

  return (
    <div className="mb-8 space-y-4">
      <form onSubmit={handleSearch} className="flex gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Author Filter */}
        <Select
          value={selectedAuthor}
          onValueChange={(value) => {
            setSelectedAuthor(value);
            handleAuthorChange(value);
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by author" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All authors</SelectItem>
            {loadingAuthors ? (
              <SelectItem value="loading" disabled>
                Loading...
              </SelectItem>
            ) : (
              authors.map((author) => (
                <SelectItem key={author.authorId} value={author.authorId}>
                  {author.username}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </form>
    </div>
  );
}
