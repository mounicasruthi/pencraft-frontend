import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PenLine, BookOpen, Users, Sparkles } from 'lucide-react';
import Link from 'next/link';
import FeaturedPosts from '@/components/featured-posts';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Where Words Come to Life
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our community of writers and readers. Share your stories, ideas, and expertise
            with the world through elegant prose.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="rounded-full">
                Start Writing
                <PenLine className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/posts">
              <Button size="lg" variant="outline" className="rounded-full">
                Explore Posts
                <BookOpen className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Pencraft?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <PenLine className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Elegant Editor</h3>
              <p className="text-muted-foreground">
                Write beautiful posts with our intuitive and powerful rich text editor.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Users className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Engaged Community</h3>
              <p className="text-muted-foreground">
                Connect with readers and writers who share your interests.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Sparkles className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Beautiful Design</h3>
              <p className="text-muted-foreground">
                Your content deserves to look its best with our modern, clean design.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Stories</h2>
          <FeaturedPosts />
        </div>
      </section>
    </div>
  );
}