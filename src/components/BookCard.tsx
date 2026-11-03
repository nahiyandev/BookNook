"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import type { Book } from "@/lib/api";
import { useWishlist } from "@/lib/wishlist";
import { Button } from "./ui/button";

export default function BookCard({ book }: { book: Book }) {
  const isAvailable = book.availableCopies > 0;
  const isLowStock = book.availableCopies === 1;
  const { isSaved, toggle } = useWishlist();
  const saved = isSaved(book._id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggle(book);
    if (added) {
      toast.success(`"${book.title}" saved to Wishlist!`);
    } else {
      toast.info(`"${book.title}" removed from Wishlist.`);
    }
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-emerald-200/90 bg-linear-to-b from-[#FAFDFB] via-[#F4FAF6] to-[#E8F5EF] shadow-md shadow-emerald-950/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#047857] hover:shadow-xl hover:shadow-emerald-950/15 dark:border-[#134E4A] dark:bg-none dark:bg-[#073B2E] dark:hover:border-[#6EE7B7]/40 dark:hover:shadow-2xl dark:hover:shadow-black/50">
      <div className="relative aspect-4/5 w-full overflow-hidden bg-emerald-50 dark:bg-[#052E22]">
        <Link href={`/books/${book._id}`} className="block h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={book.image}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-106"
          />
        </Link>

        {/* Category Badge on left */}
        <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-[#047857] px-2.5 py-0.5 text-xs font-bold text-white shadow-xs backdrop-blur-xs ring-1 ring-white/30 dark:bg-[#052E22]/95 dark:text-[#6EE7B7] dark:ring-[#6EE7B7]/30">
          {book.category}
        </span>

        {/* 1-Click Wishlist Bookmark Button on right */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          title={saved ? "Remove from wishlist" : "Save to Reading Wishlist"}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          className={`absolute top-3 right-3 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-90 ${
            saved
              ? "bg-[#D97706] text-white shadow-md ring-2 ring-white/60 dark:ring-[#073B2E]"
              : "border border-emerald-200/60 bg-white/90 text-[#4B5563] shadow-xs backdrop-blur-xs hover:border-[#D97706] hover:bg-white hover:text-[#D97706] dark:bg-[#052E22]/85 dark:text-[#A7F3D0] dark:hover:bg-[#052E22] dark:hover:text-[#FCD34D]"
          }`}
        >
          <svg
            className={`h-4 w-4 ${saved ? "fill-current text-white" : "stroke-current fill-none"}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4.5 bg-linear-to-b from-transparent to-emerald-50/50 dark:bg-none">
        <Link href={`/books/${book._id}`}>
          <h3 className="line-clamp-2 min-h-11 font-serif text-base font-bold leading-snug text-[#1F2937] transition hover:text-[#047857] dark:text-[#F0FDF4] dark:hover:text-[#6EE7B7]">
            {book.title}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-1 text-xs font-medium text-[#6B7280] dark:text-[#A7F3D0]">
          by {book.author}
        </p>

        <div className="mt-3 flex items-center justify-between text-xs">
          <span
            className={`inline-flex items-center gap-1.5 font-semibold ${
              isAvailable
                ? isLowStock
                  ? "text-[#D97706] dark:text-[#FCD34D]"
                  : "text-[#047857] dark:text-[#6EE7B7]"
                : "text-red-500 dark:text-red-400"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isAvailable
                  ? isLowStock
                    ? "bg-[#D97706] animate-pulse"
                    : "bg-[#047857] dark:bg-[#6EE7B7]"
                  : "bg-red-400"
              }`}
            />
            {isAvailable
              ? `${book.availableCopies} ${book.availableCopies === 1 ? "copy left" : "copies available"}`
              : "Checked Out"}
          </span>
        </div>

        <div className="mt-auto pt-4">
          <Button
            render={<Link href={`/books/${book._id}`} />}
            nativeButton={false}
            className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#047857] to-[#065F46] py-2 text-xs font-bold text-white shadow-xs transition hover:brightness-110 active:scale-[0.99] dark:from-[#059669] dark:to-[#047857]"
          >
            <span>View Details</span>
            <span className="transition-transform group-hover/btn:translate-x-1">→</span>
          </Button>
        </div>
      </div>
    </article>
  );
}
