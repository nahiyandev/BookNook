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
      toast.success(`"${book.title}" added to your Reading Wishlist! 🔖`);
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
      toast.success("Book link copied to clipboard! 📋");
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
        <span>{saved ? "🔖" : "🤍"}</span>
        <span>{saved ? "Saved in Wishlist" : "Save to Wishlist"}</span>
      </Button>

      {/* 2. Share Book Link */}
      <Button
        type="button"
        variant="outline"
        onClick={handleShare}
        className="inline-flex items-center gap-2 rounded-xl border-[#E7E5E4] bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-[#4B5563] shadow-xs transition-all hover:border-[#047857] hover:bg-[#ECFDF5] hover:text-[#047857] dark:border-[#134E4A] dark:bg-[#073B2E] dark:text-[#ECFDF5] dark:hover:bg-[#052E22] dark:hover:text-[#6EE7B7]"
      >
        <span>{copied ? "✓" : "🔗"}</span>
        <span>{copied ? "Link Copied!" : "Share Book"}</span>
      </Button>
    </div>
  );
}
