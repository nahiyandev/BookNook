import Link from "next/link";
import { notFound } from "next/navigation";
import { API_URL } from "../../../lib/config";
import type { Book } from "../../../lib/api";
import { Button } from "@/components/ui/button";
import BorrowButton from "@/components/BorrowButton";
import WishlistActionButton from "@/components/WishlistActionButton";

export const instant = false;

export const metadata = { title: "Book Details" };

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let book: Book | null = null;
  try {
    const res = await fetch(`${API_URL}/books/${id}`, { cache: "no-store" });
    if (res.status === 404) notFound();
    if (!res.ok) throw new Error("Failed");
    book = await res.json();
  } catch {
    if (!book) notFound();
  }
  if (!book) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Top back navigation & breadcrumbs */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/books"
          className="group inline-flex items-center gap-2 rounded-full border border-[#E7E5E4] bg-white px-4 py-1.5 text-xs font-semibold text-[#047857] shadow-xs transition hover:border-[#047857] hover:bg-[#ECFDF5] dark:border-[#134E4A] dark:bg-[#064E3B] dark:text-[#6EE7B7] dark:hover:bg-[#052E22]"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          Back to all books
        </Link>
        <div className="flex items-center gap-2 text-xs text-[#6B7280] dark:text-[#A7F3D0]">
          <span>Library</span>
          <span>/</span>
          <span className="font-semibold text-[#047857] dark:text-[#6EE7B7] capitalize">{book.category}</span>
          <span>/</span>
          <span className="truncate max-w-48 text-[#9CA3AF]">{book.title}</span>
        </div>
      </div>

      {/* Main presentation card */}
      <div className="overflow-hidden rounded-3xl border border-[#E7E5E4] bg-white p-6 shadow-xl shadow-stone-200/50 sm:p-8 lg:p-10 dark:border-[#134E4A] dark:bg-[#073B2E] dark:shadow-2xl dark:shadow-black/50">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column — Auto-fit Book Cover & Library Policy */}
          <div className="flex flex-col gap-5 lg:col-span-5">
            {/* Book Cover Frame (auto-fit full image, no awkward padding or side gaps) */}
            <div className="relative overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white shadow-xl dark:border-[#134E4A] dark:bg-[#052E22]">
              <div className="relative aspect-2/3 w-full overflow-hidden bg-[#F3F4F6] dark:bg-[#052E22]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
                {/* Category Pill — pinned directly on book cover */}
                <span className="absolute top-3 left-3 rounded-full bg-[#D97706] px-3.5 py-1 text-xs font-bold tracking-wide uppercase text-white shadow-md">
                  {book.category}
                </span>

                {/* Copies Left Pill — pinned directly on book cover */}
                <span
                  className={`absolute top-3 right-3 rounded-full px-3.5 py-1 text-xs font-bold shadow-md ${
                    book.availableCopies > 0
                      ? "bg-[#047857] text-white ring-1 ring-white/20"
                      : "bg-red-600 text-white ring-1 ring-white/20"
                  }`}
                >
                  {book.availableCopies > 0
                    ? `${book.availableCopies} Left`
                    : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* BookNook Library Loop Card — balances the left column height */}
            <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-4 shadow-xs dark:border-[#D97706]/40 dark:bg-[#052E22]">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#D97706] text-sm text-white shadow-xs">
                  📖
                </span>
                <div>
                  <h4 className="text-xs font-bold tracking-wide uppercase text-[#92400E] dark:text-[#FCD34D]">
                    BookNook Library Loop
                  </h4>
                  <p className="text-[11px] font-medium text-[#B45309] dark:text-[#FDE68A]">
                    Community Shared Library
                  </p>
                </div>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#78350F] dark:text-[#D1FAE5]">
                Borrow for 7 days, enjoy reading, and return from My Borrows to keep the shelf alive for the next reader.
              </p>
            </div>
          </div>

          {/* Right Column — Information, Metadata Cards & Actions */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              {/* Category & Status trail */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-bold tracking-wider uppercase text-[#047857] ring-1 ring-[#047857]/20 dark:bg-[#052E22] dark:text-[#6EE7B7] dark:ring-[#6EE7B7]/30">
                  {book.category}
                </span>
                <span className="text-xs text-[#9CA3AF]">•</span>
                <span className="text-xs font-medium text-[#6B7280] dark:text-[#A7F3D0]">
                  ISBN Verified
                </span>
              </div>

              {/* Title & Author */}
              <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl lg:text-5xl dark:text-[#F0FDF4]">
                {book.title}
              </h1>
              <p className="mt-2.5 text-base text-[#6B7280] sm:text-lg dark:text-[#A7F3D0]">
                by{" "}
                <span className="font-semibold text-[#047857] underline decoration-[#D97706] decoration-2 underline-offset-4 dark:text-[#6EE7B7]">
                  {book.author}
                </span>
              </p>

              {/* 3 High-Contrast Metadata Cards (Crystal clear in both Light & Dark modes) */}
              <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                {/* 1. Available Copies Card */}
                <div className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-4 shadow-xs transition hover:shadow-md dark:border-[#047857] dark:bg-[#052E22]">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold tracking-wider uppercase text-[#047857] dark:text-[#6EE7B7]">
                      Available Copies
                    </p>
                    <span className="text-xs">📚</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-[#047857] dark:text-[#34D399]">
                      {book.availableCopies}
                    </span>
                    <span className="text-sm font-semibold text-[#4B5563] dark:text-[#A7F3D0]">
                      / {book.totalCopies} total
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] font-medium text-[#059669] dark:text-[#6EE7B7]">
                    {book.availableCopies > 0 ? "Copies in library" : "None left on shelf"}
                  </p>
                </div>

                {/* 2. Status Card */}
                <div className="rounded-2xl border border-[#BBF7D0] bg-[#F0FDF4] p-4 shadow-xs transition hover:shadow-md dark:border-[#047857] dark:bg-[#052E22]">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold tracking-wider uppercase text-[#047857] dark:text-[#6EE7B7]">
                      Status
                    </p>
                    <span
                      className={`inline-block h-2.5 w-2.5 rounded-full ${
                        book.availableCopies > 0
                          ? "bg-[#10B981] animate-pulse"
                          : "bg-red-500"
                      }`}
                    />
                  </div>
                  <p className="mt-2 text-base font-bold text-[#1F2937] dark:text-[#ECFDF5]">
                    {book.availableCopies > 0 ? "Ready to borrow" : "Unavailable"}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-[#047857] dark:text-[#6EE7B7]">
                    {book.availableCopies > 0 ? "Instant 7-day loan" : "Reserved by readers"}
                  </p>
                </div>

                {/* 3. Added By Card */}
                <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-4 shadow-xs transition hover:shadow-md dark:border-[#D97706]/50 dark:bg-[#052E22]">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold tracking-wider uppercase text-[#D97706] dark:text-[#FBBF24]">
                      Added By
                    </p>
                    <span className="text-xs">👤</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D97706] text-xs font-bold text-white shadow-xs">
                      {(book.addedBy?.name || "R").charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-[#1F2937] dark:text-[#ECFDF5]">
                        {book.addedBy?.name || "Reader"}
                      </p>
                      <p className="truncate text-[10px] text-[#6B7280] dark:text-[#A7F3D0]">
                        {book.addedBy?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Section with elevated container */}
              <div className="mt-6">
                <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-2 dark:border-[#134E4A]">
                  <h2 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#ECFDF5]">
                    About this book
                  </h2>
                  <span className="text-xs font-semibold text-[#047857] dark:text-[#6EE7B7]">
                    Reader Review & Overview
                  </span>
                </div>
                <div className="mt-3 rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] p-5 dark:border-[#134E4A] dark:bg-[#052E22]">
                  <p className="text-sm sm:text-base leading-relaxed text-[#374151] whitespace-pre-line dark:text-[#D1FAE5]">
                    {book.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons with brand color combinations & Wishlist */}
            <div className="mt-8 space-y-4 border-t border-[#E7E5E4] pt-6 dark:border-[#134E4A]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <WishlistActionButton book={book} />
              </div>

              <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <BorrowButton
                    bookId={book._id}
                    bookTitle={book.title}
                    availableCopies={book.availableCopies}
                  />
                </div>
                <Button
                  render={<Link href="/books" />}
                  nativeButton={false}
                  variant="outline"
                  className="rounded-xl border-2 border-[#047857]/30 bg-white px-6 py-3 text-base font-bold text-[#047857] transition-all hover:border-[#047857] hover:bg-[#ECFDF5] hover:shadow-sm dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#6EE7B7] dark:hover:bg-[#064E3B]"
                >
                  Back to all books
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
