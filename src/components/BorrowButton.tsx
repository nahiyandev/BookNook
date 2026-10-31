"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import BorrowModal from "./BorrowModal";

/**
 * BookNook Borrow button — Borrow section.
 * 0 copies → disabled "Not Available" (spec challenge), never clickable.
 * Otherwise → opens the borrow modal. If the user is somehow logged out,
 * the middleware already redirected them to Login before this page loaded.
 */
export default function BorrowButton({
  bookId,
  bookTitle,
  availableCopies,
}: {
  bookId: string;
  bookTitle: string;
  availableCopies: number;
}) {
  const [open, setOpen] = useState(false);
  if (availableCopies <= 0) {
    return (
      <Button
        disabled
        className="w-full rounded-xl bg-[#E5E7EB] py-3 text-base font-semibold text-[#9CA3AF] shadow-none cursor-not-allowed dark:bg-[#134E4A]/40 dark:text-[#6EE7B7]/40"
      >
        Not Available (0 copies left)
      </Button>
    );
  }
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="w-full rounded-xl bg-linear-to-r from-[#047857] via-[#059669] to-[#047857] py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-900/25 transition-all duration-200 hover:brightness-110 hover:shadow-xl hover:shadow-emerald-900/30 active:scale-[0.99]"
      >
        <span className="flex items-center justify-center gap-2">
          <span>Borrow This Book</span>
          <span className="text-sm">📖</span>
        </span>
      </Button>
      <BorrowModal
        open={open}
        bookId={bookId}
        bookTitle={bookTitle}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
