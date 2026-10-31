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
        className="w-full rounded-xl bg-[#047857] py-3 text-base font-semibold text-white shadow-md transition-all hover:bg-[#065F46] hover:shadow-lg active:scale-[0.99]"
      >
        Borrow This Book
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
