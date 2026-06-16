"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/navbar";
import { getTags } from "@/services/series.service";
import TagsLoader from "@/components/features/badges/loader/TagsLoader";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

  const [search, setSearch] = useState("");
  const router = useRouter()

  const handleSearch = () => {
    if (!search.trim()) return;

    router.push(`/user/explore?q=${encodeURIComponent(search)}`);
  };

  const { data: tags, isPending: isTagPending } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });


  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        </div>

        {/* HERO */}
        <section className="container mx-auto px-6 py-24 md:py-32">
          <div className="mx-auto max-w-5xl text-center">
            <Badge variant="secondary" className="mb-6">
              Developer Knowledge Hub
            </Badge>

            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
              Become a Better Developer,
              <span className="block text-primary">
                One Article at a Time
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Practical tutorials, Java, DSA, React, Next.js,
              system design and engineering insights for developers
              who love building.
            </p>

            {/* Search */}
            <div className="mx-auto mt-10 w-full max-w-2xl">
              <div className="relative">
                <Search
                  className="
                absolute
                left-4
                top-1/2
                h-5
                w-5
                -translate-y-1/2
                text-muted-foreground
                pointer-events-none
            "
                />

                <Input
                  value={search}
                  placeholder="Search articles..."
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  className="
                h-12
                pl-12
                pr-4
                rounded-xl
                border-border
                bg-background
                shadow-sm
                text-base
                focus-visible:ring-2
            "
                />
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/user/explore">
                <Button size="lg">
                  Browse Articles
                </Button>
              </Link>

              <Link href="/user/explore">
                <Button variant="outline" size="lg">
                  Start Learning
                </Button>
              </Link>
            </div>

            {/* Tags */}
            <div className="mt-12">
              <p className="mb-4 text-sm font-medium text-muted-foreground">
                Popular Topics
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                {isTagPending ? (
                  <TagsLoader />
                ) : (
                  tags?.map(
                    (tag: { _id: string; name: string }) => (
                      <Badge
                        key={tag._id}
                        variant="secondary"
                        onClick={() => router.push(`/user/explore?tag=${tag.name}`)}
                        className="cursor-pointer px-3 py-1 text-sm transition hover:bg-zinc-200 dark:hover:bg-zinc-800"
                      >
                        #{tag.name}
                      </Badge>
                    )
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="border-y bg-muted/30">
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-3xl font-bold">100+</h3>
                <p className="text-muted-foreground">
                  Articles
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">20+</h3>
                <p className="text-muted-foreground">
                  Topics
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">Weekly</h3>
                <p className="text-muted-foreground">
                  New Content
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY READ HERE */}
        <section className="container mx-auto px-6 py-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">
              Why Developers Read Here
            </h2>

            <p className="mt-3 text-muted-foreground">
              Learn concepts deeply, not just syntax.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold">
                  Practical Tutorials
                </h3>

                <p className="mt-2 text-muted-foreground">
                  Real-world examples and code-first
                  learning experiences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold">
                  Deep Technical Guides
                </h3>

                <p className="mt-2 text-muted-foreground">
                  Understand why things work,
                  not just how.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold">
                  Career Growth
                </h3>

                <p className="mt-2 text-muted-foreground">
                  Improve development, architecture,
                  and problem-solving skills.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* TOPICS */}
        <section className="container mx-auto px-6 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              Explore Topics
            </h2>

            <p className="mt-3 text-muted-foreground">
              Start with your favorite technology.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Java",
              "DSA",
              "React",
              "Next.js",
              "System Design",
              "MongoDB",
              "TypeScript",
              "Backend",
            ].map((topic) => (
              <Card
                key={topic}
                className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="p-6 text-center font-medium">
                  {topic}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6 py-24">
          <Card>
            <CardContent className="flex flex-col items-center p-12 text-center">
              <h2 className="text-4xl font-bold">
                Ready to Learn Something New?
              </h2>

              <p className="mt-4 max-w-2xl text-muted-foreground">
                Explore tutorials, engineering insights,
                coding guides, and practical lessons built
                for developers.
              </p>

              <Link href="/articles">
                <Button size="lg" className="mt-8">
                  Browse Articles
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* FOOTER */}
        <footer className="border-t py-8">
          <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
            Built for developers who love sharing knowledge.
          </div>
        </footer>
      </main>
    </>
  );
}

