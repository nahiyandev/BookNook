"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiFetch, type Borrow } from "@/lib/api";
import { Button } from "@/components/ui/button";

/**
 * BookNook My Borrows — Borrow section, PRIVATE route (middleware guards it).
 * Table: Image, Title, Borrow Date, Return Date, Return Book button.
 * Return → DELETE /borrows/:id with JWT → backend increases copies by 1
 * and deletes the borrow record → list refreshes, toast shown.
 */
function formatDate(value: string) {
  if (!value) return "N/A";
  try {
    return new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return value;
  }
}

function getLoanStatus(returnDate: string) {
  if (!returnDate) {
    return {
      type: "active",
      label: "Active Loan",
      badgeClass:
        "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-700/60 dark:bg-emerald-950/60 dark:text-emerald-200",
      dotClass: "bg-emerald-500",
    };
  }
  const due = new Date(returnDate).getTime();
  const now = new Date().getTime();
  const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    const overdueDays = Math.abs(diffDays);
    return {
      type: "overdue",
      label: overdueDays === 1 ? "Overdue (1 day)" : `Overdue (${overdueDays} days)`,
      badgeClass:
        "border-rose-300 bg-rose-50 text-rose-800 dark:border-rose-700/60 dark:bg-rose-950/60 dark:text-rose-200",
      dotClass: "bg-rose-500 animate-pulse",
    };
  } else if (diffDays === 0) {
    return {
      type: "due-soon",
      label: "Due Today",
      badgeClass:
        "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-700/60 dark:bg-amber-950/60 dark:text-amber-200",
      dotClass: "bg-amber-500 animate-pulse",
    };
  } else if (diffDays <= 2) {
    return {
      type: "due-soon",
      label: diffDays === 1 ? "Due Soon (1 day left)" : `Due Soon (${diffDays} days left)`,
      badgeClass:
        "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-700/60 dark:bg-amber-950/60 dark:text-amber-200",
      dotClass: "bg-amber-500",
    };
  } else {
    return {
      type: "normal",
      label: `${diffDays} days left`,
      badgeClass:
        "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-700/60 dark:bg-emerald-950/60 dark:text-emerald-200",
      dotClass: "bg-emerald-500",
    };
  }
}

export default function MyBorrowsPage() {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningBorrow, setReturningBorrow] = useState<Borrow | null>(null);
  const [returnLoading, setReturnLoading] = useState(false);

  const load = useCallback(async () => {
    try {
      setBorrows(await apiFetch<Borrow[]>("/borrows", { auth: true }));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load your borrows.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = "My Borrows | BookNook";
  }, []);

  useEffect(() => {
    let active = true;
    apiFetch<Borrow[]>("/borrows", { auth: true })
      .then((loadedBorrows) => {
        if (active) setBorrows(loadedBorrows);
      })
      .catch((error: unknown) => {
        if (active) {
          toast.error(
            error instanceof Error ? error.message : "Failed to load your borrows."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [load]);

  async function handleConfirmReturn() {
    if (!returningBorrow) return;
    setReturnLoading(true);
    try {
      await apiFetch(`/borrows/${returningBorrow._id}`, { method: "DELETE", auth: true });
      toast.success(`"${returningBorrow.bookTitle}" returned successfully!`);
      setReturningBorrow(null);
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to return book.");
    } finally {
      setReturnLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Breadcrumbs & Page Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#6B7280] dark:text-[#A7F3D0]">
            <Link href="/" className="hover:text-[#047857] hover:underline dark:hover:text-[#6EE7B7]">
              Home
            </Link>
            <span>/</span>
            <span>Dashboard</span>
            <span>/</span>
            <span className="font-semibold text-[#047857] dark:text-[#6EE7B7]">My Borrows</span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-[#047857] sm:text-4xl dark:text-[#6EE7B7]">
              My Borrows
            </h1>
            {!loading && (
              <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-bold text-[#047857] ring-1 ring-[#047857]/20 dark:bg-[#052E22] dark:text-[#6EE7B7] dark:ring-[#6EE7B7]/30">
                {borrows.length} {borrows.length === 1 ? "Active Loan" : "Active Loans"}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-[#6B7280] sm:text-sm dark:text-[#A7F3D0]">
            Books you have borrowed from BookNook — read, enjoy, and return on time to keep the loop going.
          </p>
        </div>

        <Link
          href="/books"
          className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-[#047857] via-[#059669] to-[#047857] px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-900/20 transition-all hover:brightness-110 active:scale-[0.99]"
        >
          <span>Explore Library</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </Link>
      </div>

      {/* Summary KPI Badges */}
      {!loading && borrows.length > 0 && (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-emerald-200/90 bg-emerald-50/80 p-4 shadow-xs dark:border-[#134E4A] dark:bg-[#073B2E]">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100/80 text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] dark:text-[#A7F3D0]">
                Borrowed Books
              </p>
              <p className="font-serif text-2xl font-bold text-[#1F2937] dark:text-[#F0FDF4]">
                {borrows.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-amber-200/90 bg-amber-50/80 p-4 shadow-xs dark:border-[#134E4A] dark:bg-[#073B2E]">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100/80 text-[#D97706] dark:bg-[#052E22] dark:text-[#FCD34D]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] dark:text-[#A7F3D0]">
                Loan Policy
              </p>
              <p className="font-serif text-2xl font-bold text-[#1F2937] dark:text-[#F0FDF4]">
                7 Days Free
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-teal-200/90 bg-teal-50/80 p-4 shadow-xs dark:border-[#134E4A] dark:bg-[#073B2E]">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100/80 text-teal-700 dark:bg-[#052E22] dark:text-[#6EE7B7]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] dark:text-[#A7F3D0]">
                Community Loop
              </p>
              <p className="font-serif text-2xl font-bold text-[#047857] dark:text-[#6EE7B7]">
                Instant Return
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {loading ? (
        <div className="flex min-h-60 flex-col items-center justify-center gap-3 rounded-3xl border border-[#E7E5E4] bg-white p-8 dark:border-[#134E4A] dark:bg-[#073B2E]">
          <div className="h-9 w-9 animate-spin rounded-full border-3 border-[#A7F3D0] border-t-[#047857] dark:border-[#134E4A] dark:border-t-[#6EE7B7]" />
          <p className="text-xs font-medium text-[#6B7280] dark:text-[#A7F3D0]">
            Loading your borrowed books...
          </p>
        </div>
      ) : borrows.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-[#E7E5E4] bg-white p-12 text-center shadow-xl shadow-stone-200/50 dark:border-[#134E4A] dark:bg-[#073B2E] dark:shadow-2xl">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ECFDF5] text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </span>
          <h3 className="mt-4 font-serif text-xl font-bold text-[#1F2937] dark:text-[#F0FDF4]">
            No Borrowed Books
          </h3>
          <p className="mt-2 max-w-sm text-sm text-[#6B7280] dark:text-[#A7F3D0]">
            You have not borrowed any books from BookNook yet. Browse the catalog and borrow your next favorite story!
          </p>
          <Link
            href="/books"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#047857] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#065F46]"
          >
            <span>Browse Library Books</span>
            <span>→</span>
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-emerald-200/90 bg-[#FAFDFB] shadow-xl shadow-emerald-950/5 dark:border-[#134E4A] dark:bg-[#073B2E] dark:shadow-2xl dark:shadow-black/40">
          <div className="overflow-x-auto">
            <table className="w-full min-w-160 text-left text-sm">
              <thead>
                <tr className="border-b border-[#E7E5E4] bg-[#FDFBF7] text-[11px] font-bold uppercase tracking-wider text-[#047857] dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#6EE7B7]">
                  <th className="px-6 py-4">Book Details</th>
                  <th className="px-6 py-4">Borrow Date</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] dark:divide-[#134E4A]/60">
                {borrows.map((borrow) => {
                  const status = getLoanStatus(borrow.returnDate);
                  return (
                    <tr
                      key={borrow._id}
                      className="transition hover:bg-[#FDFBF7]/70 dark:hover:bg-[#052E22]/50"
                    >
                      {/* Book Cover + Title */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3.5">
                          <Link
                            href={`/books/${borrow.bookId}`}
                            className="group relative shrink-0"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={borrow.bookImage}
                              alt={borrow.bookTitle}
                              className="aspect-2/3 h-14 w-auto rounded-lg object-cover shadow-xs ring-1 ring-[#E7E5E4] transition group-hover:scale-105 dark:ring-[#134E4A]"
                            />
                          </Link>
                          <div className="min-w-0">
                            <Link
                              href={`/books/${borrow.bookId}`}
                              className="block truncate font-serif text-sm font-bold text-[#1F2937] transition hover:text-[#047857] dark:text-[#F0FDF4] dark:hover:text-[#6EE7B7]"
                            >
                              {borrow.bookTitle}
                            </Link>
                            <span className="mt-0.5 inline-block text-[11px] text-[#6B7280] dark:text-[#A7F3D0]">
                              Loan ID: #{borrow._id.slice(-6).toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Borrow Date */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4 text-[#6B7280] dark:text-[#A7F3D0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <p className="text-xs font-semibold text-[#1F2937] dark:text-[#F0FDF4]">
                              {formatDate(borrow.borrowDate)}
                            </p>
                            <p className="text-[10px] text-[#6B7280] dark:text-[#A7F3D0]">
                              Checked out
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Due Date + Status Pill */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </span>
                          <div>
                            <p className="text-xs font-semibold text-[#1F2937] dark:text-[#F0FDF4]">
                              {formatDate(borrow.returnDate)}
                            </p>
                            <span
                              className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${status.badgeClass}`}
                            >
                              <span className={`h-1.5 w-1.5 rounded-full ${status.dotClass}`} />
                              {status.label}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <Button
                          size="sm"
                          onClick={() => setReturningBorrow(borrow)}
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-linear-to-r from-[#D97706] to-[#B45309] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition hover:brightness-110 active:scale-[0.98]"
                        >
                          <span>Return Book</span>
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a5 5 0 015 5v2m0 0l-4-4m4 4l4-4" />
                          </svg>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Return Book Confirmation Modal */}
      {returningBorrow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs px-4">
          <div className="w-full max-w-md rounded-3xl border border-[#E7E5E4] bg-white p-6 shadow-2xl dark:border-[#134E4A] dark:bg-[#073B2E]">
            <div className="flex items-center gap-3.5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-100 bg-amber-50 text-[#D97706] shadow-xs dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#FCD34D]">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a5 5 0 015 5v2m0 0l-4-4m4 4l4-4" />
                </svg>
              </span>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1F2937] sm:text-2xl dark:text-[#F0FDF4]">
                  Return Book
                </h3>
                <p className="text-xs font-semibold text-[#047857] dark:text-[#6EE7B7]">
                  Community Library Return
                </p>
              </div>
            </div>

            {/* Book Info Snippet */}
            <div className="mt-4 flex items-center gap-3.5 rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] p-3.5 dark:border-[#134E4A] dark:bg-[#052E22]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={returningBorrow.bookImage}
                alt={returningBorrow.bookTitle}
                className="aspect-2/3 h-14 w-auto rounded-lg object-cover shadow-xs ring-1 ring-[#E7E5E4] dark:ring-[#134E4A]"
              />
              <div className="min-w-0">
                <p className="truncate font-serif text-sm font-bold text-[#1F2937] dark:text-[#F0FDF4]">
                  {returningBorrow.bookTitle}
                </p>
                <p className="text-xs text-[#6B7280] dark:text-[#A7F3D0]">
                  Due: {formatDate(returningBorrow.returnDate)}
                </p>
              </div>
            </div>

            <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-[#4B5563] dark:text-[#A7F3D0]">
              Are you sure you want to return this book? The available copies in the library will increase immediately for other readers.
            </p>

            <div className="mt-6 flex gap-3 border-t border-[#E7E5E4] pt-4 dark:border-[#134E4A]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setReturningBorrow(null)}
                disabled={returnLoading}
                className="flex-1 rounded-xl border-[#E7E5E4] bg-white text-xs font-bold text-[#4B5563] transition hover:bg-stone-50 dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#ECFDF5] dark:hover:bg-[#047857]/30"
              >
                Keep Reading
              </Button>
              <Button
                type="button"
                onClick={handleConfirmReturn}
                disabled={returnLoading}
                className="flex-1 rounded-xl bg-linear-to-r from-[#D97706] to-[#B45309] text-xs font-bold text-white shadow-md transition hover:brightness-110 active:scale-[0.98]"
              >
                {returnLoading ? "Returning..." : "Yes, Return Book"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
