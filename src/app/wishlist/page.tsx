"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import BookCard from "@/components/BookCard";
import { useWishlist } from "@/lib/wishlist";
import type { Book } from "@/lib/api";

export default function WishlistPage() {
  const { wishlist, count } = useWishlist();

  const handleClearAll = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("booknook_wishlist_books");
      window.dispatchEvent(new Event("booknook_wishlist_change"));
      toast.info("Wishlist cleared.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs & Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#6B7280] dark:text-[#A7F3D0]">
            <Link href="/" className="hover:text-[#047857] hover:underline dark:hover:text-[#6EE7B7]">
              Home
            </Link>
            <span>/</span>
            <span>Dashboard</span>
            <span>/</span>
            <span className="font-semibold text-[#047857] dark:text-[#6EE7B7]">Wishlist</span>
          </div>

          <div className="mt-2 flex items-center gap-3">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-[#047857] sm:text-4xl dark:text-[#6EE7B7]">
              Reading Wishlist
            </h1>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-[#D97706] ring-1 ring-amber-300 dark:bg-[#052E22] dark:text-[#FCD34D] dark:ring-amber-700/50">
              🔖 {count} {count === 1 ? "Book Saved" : "Books Saved"}
            </span>
          </div>

          <p className="mt-1 text-xs text-[#6B7280] sm:text-sm dark:text-[#A7F3D0]">
            Books you have bookmarked to read next. Borrow them when copies become available.
          </p>
        </div>

        {count > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-400"
          >
            <span>Clear Wishlist</span>
            <span>🗑️</span>
          </button>
        )}
      </div>

      {/* Main Grid / Empty State */}
      {count === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-[#E7E5E4] bg-white p-12 text-center shadow-xl shadow-stone-200/50 dark:border-[#134E4A] dark:bg-[#073B2E] dark:shadow-2xl">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-3xl text-[#D97706] dark:bg-[#052E22] dark:text-[#FCD34D]">
            🔖
          </span>
          <h3 className="mt-4 font-serif text-xl font-bold text-[#1F2937] dark:text-[#F0FDF4]">
            Your Wishlist is Empty
          </h3>
          <p className="mt-2 max-w-sm text-sm text-[#6B7280] dark:text-[#A7F3D0]">
            Browse our community shelves to discover and save favorite books you want to read next.
          </p>
          <Link
            href="/books"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-[#047857] via-[#059669] to-[#047857] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:brightness-110 active:scale-[0.99]"
          >
            <span>Explore Library Books</span>
            <span>→</span>
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlist.map((book) => (
            <BookCard key={book._id} book={book as unknown as Book} />
          ))}
        </div>
      )}
    </div>
  );
}
