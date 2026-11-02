"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import BorrowModal from "./BorrowModal";

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
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
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
