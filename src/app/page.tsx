import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function Home() {
  const tags = [
    "Java",
    "DSA",
    "NextJS",
    "System Design",
    "AI",
    "React",
    "Backend",
    "MongoDB",
    "Docker"
  ];

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">

        <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">

          {/* Title */}
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
            Learn. Build. Explain.
          </h1>

          {/* Search */}
          <div className="relative mt-8 w-full max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search blogs..."
              className="h-12 pl-10 text-base"
            />
          </div>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 max-w-2xl">

            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer px-3 py-1 text-sm hover:bg-zinc-200 dark:hover:bg-zinc-800"
              >
                #{tag}
              </Badge>
            ))}

          </div>

        </main>
        <footer className="pb-6 text-center text-sm text-muted-foreground">
          Built for developers who love sharing knowledge
        </footer>
      </div>
    </div>
  );
}
