"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import type { Book } from "@/lib/api";
import { useWishlist } from "@/lib/wishlist";
import { Button } from "./ui/button";

/**
 * BookNook book card — Books section.
 * Equal height/width by design (assignment rule): fixed image height,
 * flex column, button pinned to the bottom. Includes 1-click Wishlist save.
 */
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
      toast.success(`"${book.title}" saved to Wishlist! 🔖`);
    } else {
      toast.info(`"${book.title}" removed from Wishlist.`);
    }
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-stone-200/60 dark:border-[#134E4A] dark:bg-[#073B2E] dark:hover:border-[#6EE7B7]/40 dark:hover:shadow-2xl dark:hover:shadow-black/50">
      <div className="relative aspect-4/5 w-full overflow-hidden bg-[#F3F4F6] dark:bg-[#052E22]">
        <Link href={`/books/${book._id}`} className="block h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={book.image}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-106"
          />
        </Link>

        {/* Category Badge on left */}
        <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-bold text-[#047857] shadow-xs backdrop-blur-xs ring-1 ring-black/5 dark:bg-[#052E22]/95 dark:text-[#6EE7B7] dark:ring-[#6EE7B7]/30">
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
              : "bg-white/85 text-[#4B5563] shadow-xs backdrop-blur-xs hover:bg-white hover:text-[#D97706] dark:bg-[#052E22]/85 dark:text-[#A7F3D0] dark:hover:bg-[#052E22] dark:hover:text-[#FCD34D]"
          }`}
        >
          <span className="text-sm leading-none">{saved ? "🔖" : "🤍"}</span>
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4.5">
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
