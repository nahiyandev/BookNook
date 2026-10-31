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
  title = "New Arrivals",
  subtitle = "The latest books readers have added to BookNook.",
  badge = "✨ Fresh Additions",
  showViewAll = true,
  maxDisplay,
  pageSize = 10,
}: {
  books: Book[];
  title?: string;
  subtitle?: string;
  badge?: string;
  showViewAll?: boolean;
  maxDisplay?: number;
  pageSize?: number;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  const handleToggleAvailable = () => {
    setOnlyAvailable((prev) => !prev);
    setCurrentPage(1);
  };

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

      // Search query (title, author, or category)
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

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredBooks.length);

  // If maxDisplay is provided (e.g. Home page preview of 8), use that slice;
  // otherwise, slice to the 10 books on the current page.
  const visibleBooks = useMemo(() => {
    if (maxDisplay) {
      return filteredBooks.slice(0, maxDisplay);
    }
    return filteredBooks.slice(startIndex, endIndex);
  }, [filteredBooks, maxDisplay, startIndex, endIndex]);

  const hasActiveFilters = searchQuery.trim() !== "" || selectedCategory !== "all" || onlyAvailable;

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setOnlyAvailable(false);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Smooth scroll to top of explorer
      const el = document.getElementById("book-explorer-root");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div id="book-explorer-root" className="w-full scroll-mt-24">
      {/* Header with Title and "View All" */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-bold text-[#047857] ring-1 ring-[#047857]/20 dark:bg-[#052E22] dark:text-[#6EE7B7] dark:ring-[#6EE7B7]/30">
            <span>{badge}</span>
            <span>•</span>
            <span>{books.length} Total Books</span>
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
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by book title, author, or keyword..."
              className="w-full rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] py-3 pr-10 pl-12 text-sm text-[#1F2937] placeholder-[#9CA3AF] transition focus:border-[#047857] focus:bg-white focus:ring-2 focus:ring-[#047857]/20 focus:outline-hidden dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#F0FDF4] dark:placeholder-[#6EE7B7]/40 dark:focus:border-[#6EE7B7]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
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
              onClick={handleToggleAvailable}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition shadow-xs ${
                onlyAvailable
                  ? "bg-[#047857] text-white ring-2 ring-[#047857]/30 dark:bg-[#6EE7B7] dark:text-[#052E22]"
                  : "border border-[#E7E5E4] bg-stone-50 text-[#4B5563] hover:border-[#047857] dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#A7F3D0]"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${onlyAvailable ? "bg-white dark:bg-[#052E22]" : "bg-emerald-500"}`} />
              <span>Available to Borrow</span>
            </button>

            {/* Filtered count info */}
            <span className="rounded-xl bg-[#FDFBF7] px-3 py-1.5 text-xs font-semibold text-[#6B7280] ring-1 ring-[#E7E5E4] dark:bg-[#052E22] dark:text-[#A7F3D0] dark:ring-[#134E4A]">
              {!maxDisplay && filteredBooks.length > 0 ? (
                <span>
                  Showing <strong className="text-[#047857] dark:text-[#6EE7B7]">{startIndex + 1}–{endIndex}</strong> of {filteredBooks.length}
                </span>
              ) : (
                <span>{filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"}</span>
              )}
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
                onClick={() => handleCategorySelect(cat.id)}
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
        {visibleBooks.length === 0 ? (
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
          <>
            {/* 4 columns on large screens */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {visibleBooks.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>

            {/* Home Page Preview: Centered Show All Books Button */}
            {maxDisplay && (
              <div className="mt-12 flex flex-col items-center justify-center text-center">
                <Link
                  href="/books"
                  className="group inline-flex items-center gap-2.5 rounded-2xl bg-linear-to-r from-[#047857] via-[#059669] to-[#047857] px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-900/25 transition-all hover:scale-102 hover:brightness-110 active:scale-[0.99]"
                >
                  <span>Show All Books</span>
                  <span className="text-base transition-transform group-hover:translate-x-1.5">→</span>
                </Link>
                <p className="mt-2.5 text-xs font-medium text-[#6B7280] dark:text-[#A7F3D0]">
                  Showing {visibleBooks.length} of {filteredBooks.length} books in this view • Explore the full community catalog
                </p>
              </div>
            )}

            {/* All Books Full Page: 10 Items Pagination with Prev / Next and Page Pills */}
            {!maxDisplay && totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl border border-[#E7E5E4] bg-white p-5 shadow-lg shadow-stone-200/40 sm:flex-row dark:border-[#134E4A] dark:bg-[#073B2E] dark:shadow-2xl">
                {/* Left: Summary text */}
                <div className="text-xs text-[#6B7280] dark:text-[#A7F3D0]">
                  Showing <strong className="font-bold text-[#1F2937] dark:text-[#F0FDF4]">{startIndex + 1}</strong> to{" "}
                  <strong className="font-bold text-[#1F2937] dark:text-[#F0FDF4]">{endIndex}</strong> of{" "}
                  <strong className="font-bold text-[#047857] dark:text-[#6EE7B7]">{filteredBooks.length}</strong> total books
                </div>

                {/* Right: Pagination Controls */}
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`inline-flex items-center gap-1 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                      currentPage === 1
                        ? "cursor-not-allowed opacity-40 bg-stone-100 text-stone-400 dark:bg-[#052E22] dark:text-stone-600"
                        : "border border-[#E7E5E4] bg-[#FDFBF7] text-[#1F2937] hover:border-[#047857] hover:bg-[#ECFDF5] hover:text-[#047857] shadow-xs active:scale-95 dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#ECFDF5] dark:hover:border-[#6EE7B7] dark:hover:text-[#6EE7B7]"
                    }`}
                  >
                    <span>←</span>
                    <span>Previous</span>
                  </button>

                  {/* Page Number Pills */}
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      const isActive = page === currentPage;
                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() => goToPage(page)}
                          aria-current={isActive ? "page" : undefined}
                          className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold transition-all ${
                            isActive
                              ? "bg-[#047857] text-white shadow-md shadow-emerald-900/20 ring-2 ring-[#047857]/30 dark:bg-[#6EE7B7] dark:text-[#052E22]"
                              : "border border-[#E7E5E4] bg-[#FDFBF7] text-[#4B5563] hover:border-[#047857] hover:text-[#047857] dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#A7F3D0] dark:hover:border-[#6EE7B7] dark:hover:text-[#6EE7B7]"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className={`inline-flex items-center gap-1 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                      currentPage >= totalPages
                        ? "cursor-not-allowed opacity-40 bg-stone-100 text-stone-400 dark:bg-[#052E22] dark:text-stone-600"
                        : "border border-[#E7E5E4] bg-[#FDFBF7] text-[#1F2937] hover:border-[#047857] hover:bg-[#ECFDF5] hover:text-[#047857] shadow-xs active:scale-95 dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#ECFDF5] dark:hover:border-[#6EE7B7] dark:hover:text-[#6EE7B7]"
                    }`}
                  >
                    <span>Next</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
