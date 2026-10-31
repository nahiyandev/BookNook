"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import BookCard from "./BookCard";
import type { Book } from "@/lib/api";

const CATEGORIES = [
  { id: "all", name: "All Shelves", icon: "📚" },
  { id: "Fiction", name: "Fiction", icon: "✨" },
  { id: "Science", name: "Science", icon: "🔬" },
  { id: "History", name: "History", icon: "🏛️" },
  { id: "Kids", name: "Kids", icon: "🧸" },
  { id: "Others", name: "Others", icon: "💡" },
];

export default function HomeBookExplorer({
  books,
  title = "Explore the Community Shelf",
  subtitle = "Discover, borrow, and read books shared by fellow readers.",
  showViewAll = true,
}: {
  books: Book[];
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Filter books based on search query, category, and availability
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Category filter
      if (
        selectedCategory !== "all" &&
        book.category?.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      // Availability filter
      if (onlyAvailable && (!book.availableCopies || book.availableCopies <= 0)) {
        return false;
      }

      // Search query (title or author)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = book.title?.toLowerCase().includes(q);
        const matchesAuthor = book.author?.toLowerCase().includes(q);
        const matchesCategory = book.category?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesAuthor && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [books, searchQuery, selectedCategory, onlyAvailable]);

  // Compute category count map
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: books.length };
    books.forEach((b) => {
      if (b.category) {
        counts[b.category] = (counts[b.category] || 0) + 1;
      }
    });
    return counts;
  }, [books]);

  const hasActiveFilters = searchQuery.trim() !== "" || selectedCategory !== "all" || onlyAvailable;

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setOnlyAvailable(false);
  };

  return (
    <div className="w-full">
      {/* Header with Title and "View All" */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-bold text-[#047857] ring-1 ring-[#047857]/20 dark:bg-[#052E22] dark:text-[#6EE7B7] dark:ring-[#6EE7B7]/30">
            <span>✨ Live Catalog</span>
            <span>•</span>
            <span>{books.length} Community Books</span>
          </div>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl dark:text-[#F0FDF4]">
            {title}
          </h2>
          <p className="mt-1.5 text-sm text-[#6B7280] dark:text-[#A7F3D0]">
            {subtitle}
          </p>
        </div>

        {showViewAll && (
          <Link
            href="/books"
            className="group inline-flex items-center gap-2 self-start rounded-xl border border-[#E7E5E4] bg-white px-4 py-2.5 text-sm font-bold text-[#047857] shadow-xs transition hover:border-[#047857] hover:bg-[#ECFDF5] sm:self-end dark:border-[#134E4A] dark:bg-[#073B2E] dark:text-[#6EE7B7] dark:hover:bg-[#052E22]"
          >
            <span>See All Library Books</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        )}
      </div>

      {/* Search Lens Bar + Controls Bar */}
      <div className="mt-8 rounded-3xl border border-[#E7E5E4] bg-white p-4 shadow-xl shadow-stone-200/40 dark:border-[#134E4A] dark:bg-[#073B2E] dark:shadow-2xl dark:shadow-black/30">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Lens Input */}
          <div className="relative flex-1">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-lg text-[#047857] dark:text-[#6EE7B7]">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by book title, author, or keyword..."
              className="w-full rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] py-3 pr-10 pl-12 text-sm text-[#1F2937] placeholder-[#9CA3AF] transition focus:border-[#047857] focus:bg-white focus:ring-2 focus:ring-[#047857]/20 focus:outline-hidden dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#F0FDF4] dark:placeholder-[#6EE7B7]/40 dark:focus:border-[#6EE7B7]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-3 flex items-center px-2 text-xs font-bold text-[#9CA3AF] hover:text-[#1F2937] dark:hover:text-[#F0FDF4]"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Availability Toggle + Results count */}
          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <button
              type="button"
              onClick={() => setOnlyAvailable(!onlyAvailable)}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition shadow-xs ${
                onlyAvailable
                  ? "bg-[#047857] text-white ring-2 ring-[#047857]/30 dark:bg-[#6EE7B7] dark:text-[#052E22]"
                  : "border border-[#E7E5E4] bg-stone-50 text-[#4B5563] hover:border-[#047857] dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#A7F3D0]"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${onlyAvailable ? "bg-white dark:bg-[#052E22]" : "bg-emerald-500"}`} />
              <span>Available to Borrow</span>
            </button>

            <span className="text-xs font-semibold text-[#6B7280] dark:text-[#A7F3D0]">
              {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"}
            </span>
          </div>
        </div>

        {/* Category Pills Navigation */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#F3F4F6] pt-4 dark:border-[#134E4A]/60">
          <span className="mr-1 text-xs font-bold uppercase tracking-wider text-[#9CA3AF] dark:text-[#6EE7B7]/60">
            Shelves:
          </span>
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.id] ?? 0;
            const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`group inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-[#047857] text-white shadow-md shadow-emerald-900/20 ring-2 ring-[#047857]/20 dark:bg-[#6EE7B7] dark:text-[#052E22]"
                    : "border border-[#E7E5E4] bg-[#FDFBF7] text-[#4B5563] hover:border-[#047857] hover:text-[#047857] dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#A7F3D0] dark:hover:border-[#6EE7B7] dark:hover:text-[#6EE7B7]"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-semibold ${
                    isSelected
                      ? "bg-white/25 text-white dark:bg-[#052E22]/20 dark:text-[#052E22]"
                      : "bg-[#E7E5E4]/60 text-[#6B7280] dark:bg-[#134E4A]/60 dark:text-[#A7F3D0]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-[#D97706] hover:underline dark:text-[#FCD34D]"
            >
              <span>Reset</span>
              <span>✕</span>
            </button>
          )}
        </div>
      </div>

      {/* Book Grid or Empty State */}
      <div className="mt-8">
        {filteredBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-[#E7E5E4] bg-white p-12 text-center shadow-xl shadow-stone-200/50 dark:border-[#134E4A] dark:bg-[#073B2E] dark:shadow-2xl">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-3xl text-[#D97706] dark:bg-[#052E22] dark:text-[#FCD34D]">
              🔍
            </span>
            <h3 className="mt-4 font-serif text-xl font-bold text-[#1F2937] dark:text-[#F0FDF4]">
              No Books Found
            </h3>
            <p className="mt-2 max-w-sm text-sm text-[#6B7280] dark:text-[#A7F3D0]">
              {searchQuery
                ? `No books matching "${searchQuery}" in this category.`
                : "No books found matching the selected filters."}
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#047857] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#065F46] dark:bg-[#6EE7B7] dark:text-[#052E22] dark:hover:bg-[#A7F3D0]"
            >
              <span>Clear All Filters</span>
              <span>🔄</span>
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
