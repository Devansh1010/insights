
import { Series } from "@/types/frontend/series";
import { useState, useMemo } from "react";

export const useSeriesFilters = (series: Series[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Series");

  const filteredSeries = useMemo(() => {
    return series.filter((item) => {
      const categoryMatch =
        activeCategory === "All Series" ||
        item.tags?.some((tag: string) => tag.toLowerCase() === activeCategory.toLowerCase());

      const searchMatch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [series, searchQuery, activeCategory]);

  return {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    filteredSeries,
    featured: filteredSeries[0],
    rest: filteredSeries.slice(1),
  };
};