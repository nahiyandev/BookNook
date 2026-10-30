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
      <Button disabled className="w-full bg-[#9CA3AF] hover:bg-[#9CA3AF]">
        Not Available
      </Button>
    );
  }
  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-full">
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
