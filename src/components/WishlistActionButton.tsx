"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import type { Book } from "@/lib/api";
import { useWishlist } from "@/lib/wishlist";
import { Button } from "./ui/button";

export default function WishlistActionButton({ book }: { book: Book }) {
  const { isSaved, toggle } = useWishlist();
  const saved = isSaved(book._id);
  const [copied, setCopied] = useState(false);

  const handleToggle = () => {
    const added = toggle(book);
    if (added) {
      toast.success(`"${book.title}" added to your Reading Wishlist!`);
    } else {
      toast.info(`"${book.title}" removed from Wishlist.`);
    }
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = `${book.title} on BookNook`;
    const text = `Check out "${book.title}" by ${book.author} on BookNook community library!`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Book link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Could not copy link.");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {/* 1. Wishlist Save Toggle */}
      <Button
        type="button"
        variant="outline"
        onClick={handleToggle}
        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all shadow-xs ${
          saved
            ? "border-amber-300 bg-amber-50 text-[#D97706] ring-1 ring-amber-300 hover:bg-amber-100 dark:border-amber-700/50 dark:bg-[#052E22] dark:text-[#FCD34D]"
            : "border-[#E7E5E4] bg-white text-[#4B5563] hover:border-[#047857] hover:bg-[#ECFDF5] hover:text-[#047857] dark:border-[#134E4A] dark:bg-[#073B2E] dark:text-[#ECFDF5] dark:hover:bg-[#052E22] dark:hover:text-[#6EE7B7]"
        }`}
      >
        <svg
          className={`h-4 w-4 ${saved ? "fill-current text-[#D97706] dark:text-[#FCD34D]" : "stroke-current fill-none"}`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        <span>{saved ? "Saved in Wishlist" : "Save to Wishlist"}</span>
      </Button>

      {/* 2. Share Book Link */}
      <Button
        type="button"
        variant="outline"
        onClick={handleShare}
        className="inline-flex items-center gap-2 rounded-xl border-[#E7E5E4] bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-[#4B5563] shadow-xs transition-all hover:border-[#047857] hover:bg-[#ECFDF5] hover:text-[#047857] dark:border-[#134E4A] dark:bg-[#073B2E] dark:text-[#ECFDF5] dark:hover:bg-[#052E22] dark:hover:text-[#6EE7B7]"
      >
        {copied ? (
          <svg className="h-4 w-4 text-[#047857] dark:text-[#6EE7B7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        )}
        <span>{copied ? "Link Copied!" : "Share Book"}</span>
      </Button>
    </div>
  );
}

