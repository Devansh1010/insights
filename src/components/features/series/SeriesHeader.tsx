import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSeriesFilters } from "@/hooks/series/useServiceFilter";
import { getSeries } from "@/services/series.service";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { SeriesSkeleton } from "./loader/SeriesListLoader";
import { SeriesError } from "./error/SeriesError";

const SeriesHeader = ({ page, limit }: { page: number, limit: number }) => {
    const { data, isPending, isError, refetch } = useQuery({
        queryKey: ['series', { page }],
        queryFn: () => getSeries(page, limit),
    })

    const {
        searchQuery, setSearchQuery,
        activeCategory, setActiveCategory,
    } = useSeriesFilters(data?.data?.series || []);

    const categories = ['All Series', 'Architecture', 'Frontend', 'Backend', 'System Design', 'Soft Skills'];

    if (isPending) return <SeriesSkeleton />;
    if (isError) return <SeriesError reset={refetch} />;

    return (
        <div>
            <header className="flex flex-col gap-8 w-full">

                <div className="flex flex-col md:flex-row md:items-end justify-between">

                    <div className="space-y-4">
                        <Badge variant="outline" className="px-3 py-1 uppercase tracking-tighter text-[10px] border-primary/30 text-primary">
                            Articles
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight">
                            Knowledge <span className="text-muted-foreground/40 italic">Vault</span>
                        </h1>
                    </div>

                    <div className="relative group w-full max-w-xs">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Search the vault (⌘K)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-11 h-10 border-slate-200 rounded-xl shadow-sm focus-visible:ring-primary/20 transition-all w-full"
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center py-5">

                    <nav className="overflow-x-auto no-scrollbar max-w-full p-4">
                        <div className="flex gap-2">
                            {categories.map((tab) => {
                                const isActive = activeCategory === tab;
                                return (
                                    <Button
                                        key={tab}
                                        onClick={() => setActiveCategory(tab)}
                                        className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-all
                                            
                            ${isActive
                                                ? "bg-slate-900 text-white shadow-md scale-105 hover:bg-slate-900 border border-slate-200"
                                                : "bg-transparent text-slate-600  cursor-pointer "
                                            }`}
                                    >
                                        {tab}
                                    </Button>
                                );
                            })}
                        </div>
                    </nav>

                    {/* <Separator /> */}
                </div>
            </header>
        </div>
    )
}

export default SeriesHeader