"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { apiFetch, type Book } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import EditBookModal from "@/components/EditBookModal";
import ConfirmModal from "@/components/ConfirmModal";

const CATEGORIES = [
  { id: "all", name: "All Shelves", icon: "" },
  { id: "Fiction", name: "Fiction", icon: "" },
  { id: "Science", name: "Science", icon: "" },
  { id: "History", name: "History", icon: "" },
  { id: "Kids", name: "Kids", icon: "" },
  { id: "Others", name: "Others", icon: "" },
];

const PAGE_SIZE = 10;

async function fetchMyBooks(email: string): Promise<Book[]> {
  const all = await apiFetch<Book[]>("/books");
  return all.filter((book: Book) => book.addedBy?.email === email);
}

/**
 * BookNook My Books — Books section, PRIVATE route (middleware guards it).
 * Supports search, shelf category filtering, and 10-item pagination with Next/Prev.
 */
export default function MyBooksPage() {
  const { data: session } = authClient.useSession();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState<Book | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Filters & Pagination State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const userEmail = session?.user?.email;

  const load = useCallback(async () => {
    if (!userEmail) return;
    try {
      setBooks(await fetchMyBooks(userEmail));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load your books.");
    }
  }, [userEmail]);

  useEffect(() => {
    document.title = "My Books | BookNook";
  }, []);

  useEffect(() => {
    if (!userEmail) return;
    let active = true;
    fetchMyBooks(userEmail)
      .then((loadedBooks) => {
        if (active) setBooks(loadedBooks);
      })
      .catch((error: unknown) => {
        if (active) {
          toast.error(
            error instanceof Error ? error.message : "Failed to load your books."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [userEmail]);

  // Reset to page 1 whenever filters change
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  // Filter books by search query and category
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      if (
        selectedCategory !== "all" &&
        book.category?.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = book.title?.toLowerCase().includes(q);
        const matchesAuthor = book.author?.toLowerCase().includes(q);
        const matchesCat = book.category?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesAuthor && !matchesCat) {
          return false;
        }
      }
      return true;
    });
  }, [books, searchQuery, selectedCategory]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, filteredBooks.length);
  const paginatedBooks = useMemo(() => {
    return filteredBooks.slice(startIndex, endIndex);
  }, [filteredBooks, startIndex, endIndex]);

  async function handleDelete() {
    if (!deleting) return;
    setDeleteLoading(true);
    try {
      await apiFetch(`/books/${deleting._id}`, { method: "DELETE", auth: true });
      toast.success("Book deleted successfully!");
      setDeleting(null);
      load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete book.");
    } finally {
      setDeleteLoading(false);
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Top Breadcrumbs & Page Header with quick Add Book button */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#6B7280] dark:text-[#A7F3D0]">
            <Link href="/" className="hover:text-[#047857] hover:underline dark:hover:text-[#6EE7B7]">
              Home
            </Link>
            <span>/</span>
            <span>Dashboard</span>
            <span>/</span>
            <span className="font-semibold text-[#047857] dark:text-[#6EE7B7]">My Books</span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-[#047857] sm:text-4xl dark:text-[#6EE7B7]">
              My Books
            </h1>
            {!loading && books.length > 0 && (
              <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-bold text-[#047857] ring-1 ring-[#047857]/20 dark:bg-[#052E22] dark:text-[#6EE7B7] dark:ring-[#6EE7B7]/30">
                {books.length} Total {books.length === 1 ? "Book" : "Books"}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-[#6B7280] sm:text-sm dark:text-[#A7F3D0]">
            Books you have shared with the community library — edit details or manage copies.
          </p>
        </div>

        <Link
          href="/add-book"
          className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-[#047857] via-[#059669] to-[#047857] px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-900/20 transition-all hover:brightness-110 active:scale-[0.99]"
        >
          <span>Add New Book</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </Link>
      </div>

      {loading ? (
        <div className="flex min-h-60 flex-col items-center justify-center gap-3 rounded-3xl border border-[#E7E5E4] bg-white p-8 dark:border-[#134E4A] dark:bg-[#073B2E]">
          <div className="h-9 w-9 animate-spin rounded-full border-3 border-[#A7F3D0] border-t-[#047857] dark:border-[#134E4A] dark:border-t-[#6EE7B7]" />
          <p className="text-xs font-medium text-[#6B7280] dark:text-[#A7F3D0]">
            Loading your shelf...
          </p>
        </div>
      ) : books.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-[#E7E5E4] bg-white p-12 text-center shadow-xl shadow-stone-200/50 dark:border-[#134E4A] dark:bg-[#073B2E] dark:shadow-2xl">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ECFDF5] text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </span>
          <h3 className="mt-4 font-serif text-xl font-bold text-[#1F2937] dark:text-[#F0FDF4]">
            Your Shelf is Empty
          </h3>
          <p className="mt-2 max-w-sm text-sm text-[#6B7280] dark:text-[#A7F3D0]">
            You have not contributed any books to BookNook yet. Share a favorite read with the community today!
          </p>
          <Link
            href="/add-book"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#047857] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#065F46]"
          >
            <span>Add Your First Book</span>
            <span>→</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Search Lens + Shelf Category Filters for My Books */}
          <div className="rounded-3xl border border-[#E7E5E4] bg-white p-4 shadow-xl shadow-stone-200/40 dark:border-[#134E4A] dark:bg-[#073B2E] dark:shadow-2xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Search box */}
              <div className="relative flex-1">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#047857] dark:text-[#6EE7B7]">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Filter your books by title, author, or shelf..."
                  className="w-full rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] py-2.5 pr-10 pl-11 text-xs sm:text-sm text-[#1F2937] placeholder-[#9CA3AF] transition focus:border-[#047857] focus:bg-white focus:outline-hidden dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#F0FDF4] dark:placeholder-[#6EE7B7]/40 dark:focus:border-[#6EE7B7]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange("")}
                    className="absolute inset-y-0 right-3 flex items-center px-2 text-xs font-bold text-[#9CA3AF] hover:text-[#1F2937] dark:hover:text-[#F0FDF4]"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Showing stats counter */}
              <div className="flex items-center justify-between gap-3 text-xs font-semibold text-[#6B7280] dark:text-[#A7F3D0]">
                <span>
                  Showing <strong className="text-[#047857] dark:text-[#6EE7B7]">{filteredBooks.length === 0 ? 0 : startIndex + 1}–{endIndex}</strong> of <strong className="text-[#1F2937] dark:text-[#F0FDF4]">{filteredBooks.length}</strong> books
                </span>
                {(searchQuery || selectedCategory !== "all") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setCurrentPage(1);
                    }}
                    className="font-bold text-[#D97706] hover:underline dark:text-[#FCD34D]"
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-[#F3F4F6] pt-3 dark:border-[#134E4A]/60">
              <span className="mr-1 text-xs font-bold uppercase tracking-wider text-[#9CA3AF] dark:text-[#6EE7B7]/60">
                Filter:
              </span>
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();
                const count =
                  cat.id === "all"
                    ? books.length
                    : books.filter((b) => b.category?.toLowerCase() === cat.id.toLowerCase()).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-[#047857] text-white shadow-xs dark:bg-[#6EE7B7] dark:text-[#052E22]"
                        : "border border-[#E7E5E4] bg-[#FDFBF7] text-[#4B5563] hover:border-[#047857] dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#A7F3D0]"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] font-semibold ${
                        isSelected
                          ? "bg-white/20 text-white dark:bg-black/20 dark:text-[#052E22]"
                          : "bg-[#E7E5E4]/60 text-[#6B7280] dark:bg-[#134E4A]/60 dark:text-[#A7F3D0]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Table Container */}
          {paginatedBooks.length === 0 ? (
            <div className="rounded-3xl border border-[#E7E5E4] bg-white p-8 text-center text-sm text-[#6B7280] dark:border-[#134E4A] dark:bg-[#073B2E] dark:text-[#A7F3D0]">
              No books found matching your current filter.
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-[#E7E5E4] bg-white shadow-xl shadow-stone-200/50 dark:border-[#134E4A] dark:bg-[#073B2E] dark:shadow-2xl dark:shadow-black/40">
              <div className="overflow-x-auto">
                <table className="w-full min-w-170 text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#E7E5E4] bg-[#FDFBF7] text-[11px] font-bold uppercase tracking-wider text-[#047857] dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#6EE7B7]">
                      <th className="px-6 py-4">Book Title & Author</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Copies Available</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F3F4F6] dark:divide-[#134E4A]/60">
                    {paginatedBooks.map((book) => (
                      <tr
                        key={book._id}
                        className="transition hover:bg-[#FDFBF7]/70 dark:hover:bg-[#052E22]/50"
                      >
                        {/* Book Cover + Title */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3.5">
                            <Link href={`/books/${book._id}`} className="group relative shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={book.image}
                                alt={book.title}
                                className="aspect-2/3 h-14 w-auto rounded-lg object-cover shadow-xs ring-1 ring-[#E7E5E4] transition group-hover:scale-105 dark:ring-[#134E4A]"
                              />
                            </Link>
                            <div className="min-w-0">
                              <Link
                                href={`/books/${book._id}`}
                                className="block truncate font-serif text-base font-bold text-[#1F2937] transition hover:text-[#047857] hover:underline dark:text-[#F0FDF4] dark:hover:text-[#6EE7B7]"
                              >
                                {book.title}
                              </Link>
                              <span className="block truncate text-xs text-[#6B7280] dark:text-[#A7F3D0]">
                                by {book.author}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Category pill */}
                        <td className="px-6 py-4">
                          <span className="inline-block rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-semibold text-[#047857] ring-1 ring-[#047857]/20 dark:bg-[#052E22] dark:text-[#6EE7B7] dark:ring-[#6EE7B7]/30">
                            {book.category}
                          </span>
                        </td>

                        {/* Copies Available */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-extrabold text-[#047857] dark:text-[#34D399]">
                              {book.availableCopies}
                            </span>
                            <span className="text-xs text-[#9CA3AF]">
                              / {book.totalCopies} copies
                            </span>
                            <span
                              className={`inline-block h-2 w-2 rounded-full ${
                                book.availableCopies > 0 ? "bg-[#10B981]" : "bg-red-500"
                              }`}
                              title={book.availableCopies > 0 ? "In Stock" : "Out of Stock"}
                            />
                          </div>
                        </td>

                        {/* Action Buttons */}
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditing(book)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-[#A7F3D0] bg-[#ECFDF5] px-3 py-1 text-xs font-bold text-[#047857] shadow-xs transition hover:bg-[#047857] hover:text-white dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#6EE7B7] dark:hover:bg-[#047857] dark:hover:text-white"
                            >
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                              <span>Edit</span>
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => setDeleting(book)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-600 shadow-xs transition hover:bg-red-600 hover:text-white dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white"
                            >
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              <span>Delete</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 10 Items Pagination Bar for My Books */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-[#E7E5E4] bg-white p-5 shadow-lg shadow-stone-200/40 sm:flex-row dark:border-[#134E4A] dark:bg-[#073B2E] dark:shadow-2xl">
              <div className="text-xs text-[#6B7280] dark:text-[#A7F3D0]">
                Showing <strong className="font-bold text-[#1F2937] dark:text-[#F0FDF4]">{startIndex + 1}</strong> to{" "}
                <strong className="font-bold text-[#1F2937] dark:text-[#F0FDF4]">{endIndex}</strong> of{" "}
                <strong className="font-bold text-[#047857] dark:text-[#6EE7B7]">{filteredBooks.length}</strong> total books on your shelf
              </div>

              <div className="flex items-center gap-2">
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
        </div>
      )}

      {/* Edit Book Modal */}
      <EditBookModal
        open={!!editing}
        book={editing}
        onClose={() => setEditing(null)}
        onSaved={load}
      />

      {/* Custom Delete Confirmation Modal */}
      <ConfirmModal
        open={!!deleting}
        title="Delete this book?"
        message={`"${deleting?.title}" will be permanently removed from the library catalog. This action cannot be undone.`}
        confirmLabel="Yes, Delete Book"
        onCancel={() => setDeleting(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
      />
    </div>
  );
}
