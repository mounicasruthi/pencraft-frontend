"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const AUTHORS = [
  { id: 'a1', name: 'Sarah Johnson' },
  { id: 'a2', name: 'Michael Chen' },
];

export default function PostFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  const handleAuthorChange = (authorId: string) => {
    const params = new URLSearchParams(searchParams);
    if (authorId === 'all') {
      params.delete('author');
    } else if (authorId) {
      params.set('author', authorId);
    }
    router.push(`/posts?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    router.push(`/posts?${params.toString()}`);
  };

  return (
    <div className="mb-8 space-y-4">
      <form onSubmit={handleSearch} className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          onValueChange={handleAuthorChange}
          defaultValue={searchParams.get('author') || ''}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by author" />
          </SelectTrigger>
          <SelectContent>
          <SelectItem value="all">All authors</SelectItem>
            {AUTHORS.map((author) => (
              <SelectItem key={author.id} value={author.id}>
                {author.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </form>
    </div>
  );
}