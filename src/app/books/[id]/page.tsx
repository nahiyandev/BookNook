import Link from "next/link";
import { notFound } from "next/navigation";
import { API_URL } from "../../../lib/config";
import type { Book } from "../../../lib/api";
import { Button } from "../../../components/ui/button";
import BorrowButton from "../../../components/BorrowButton";

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
      {/* Top back navigation */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/books"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-[#047857] hover:underline dark:text-[#6EE7B7]"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          Back to all books
        </Link>
        <div className="flex items-center gap-2 text-xs text-[#6B7280] dark:text-[#A7F3D0]">
          <span>Library</span>
          <span>/</span>
          <span className="capitalize">{book.category}</span>
        </div>
      </div>

      {/* Main book presentation card */}
      <div className="rounded-3xl border border-[#E7E5E4] bg-white p-6 shadow-sm sm:p-8 lg:p-10 dark:border-[#134E4A] dark:bg-[#064E3B]">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column — Full Tall Portrait Cover */}
          <div className="flex flex-col lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] p-3 shadow-md dark:border-[#134E4A] dark:bg-[#052E22]">
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#047857] shadow-xs backdrop-blur-xs dark:bg-[#052E22]/95 dark:text-[#6EE7B7]">
                  {book.category}
                </span>
                <span
                  className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold shadow-xs backdrop-blur-xs ${
                    book.availableCopies > 0
                      ? "bg-[#047857] text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {book.availableCopies > 0
                    ? `${book.availableCopies} Left`
                    : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Sharing policy reminder card */}
            <div className="mt-4 rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] p-4 text-xs text-[#374151] dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#D1FAE5]">
              <div className="flex items-center gap-2 font-semibold text-[#047857] dark:text-[#6EE7B7]">
                <span className="text-base text-[#D97706]">📖</span>
                <span>BookNook Library Loop</span>
              </div>
              <p className="mt-1 leading-relaxed text-[#6B7280] dark:text-[#A7F3D0]">
                Borrow for 7 days, read at your pace, and return from My Borrows to keep books circulating among readers.
              </p>
            </div>
          </div>

          {/* Right Column — Information, Metadata & Actions */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              {/* Category pill */}
              <span className="inline-block rounded-full bg-[#ECFDF5] px-3.5 py-1 text-xs font-bold tracking-wide uppercase text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
                {book.category}
              </span>

              {/* Title & Author */}
              <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#1F2937] sm:text-4xl dark:text-[#ECFDF5]">
                {book.title}
              </h1>
              <p className="mt-2 text-base text-[#6B7280] sm:text-lg dark:text-[#A7F3D0]">
                by <span className="font-semibold text-[#1F2937] dark:text-[#ECFDF5]">{book.author}</span>
              </p>

              {/* Key metadata grid */}
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] p-4 dark:border-[#134E4A] dark:bg-[#052E22]">
                  <p className="text-xs text-[#6B7280] dark:text-[#A7F3D0]">Available Copies</p>
                  <p className="mt-1 text-xl font-bold text-[#047857] dark:text-[#6EE7B7]">
                    {book.availableCopies}
                    <span className="text-xs font-normal text-[#6B7280] dark:text-[#A7F3D0]">
                      {" "}/ {book.totalCopies}
                    </span>
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] p-4 dark:border-[#134E4A] dark:bg-[#052E22]">
                  <p className="text-xs text-[#6B7280] dark:text-[#A7F3D0]">Status</p>
                  <p className="mt-1 text-base font-bold text-[#1F2937] dark:text-[#ECFDF5]">
                    {book.availableCopies > 0 ? "Ready to borrow" : "Unavailable"}
                  </p>
                </div>

                <div className="col-span-2 rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] p-4 sm:col-span-1 dark:border-[#134E4A] dark:bg-[#052E22]">
                  <p className="text-xs text-[#6B7280] dark:text-[#A7F3D0]">Added By</p>
                  <p className="mt-1 truncate text-sm font-semibold text-[#1F2937] dark:text-[#ECFDF5]">
                    {book.addedBy?.name || "Reader"}
                  </p>
                  <p className="truncate text-xs text-[#6B7280] dark:text-[#A7F3D0]">
                    {book.addedBy?.email}
                  </p>
                </div>
              </div>

              {/* Description section */}
              <div className="mt-6 border-t border-[#E7E5E4] pt-6 dark:border-[#134E4A]">
                <h2 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#ECFDF5]">
                  About this book
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#374151] whitespace-pre-line dark:text-[#D1FAE5]">
                  {book.description}
                </p>
              </div>
            </div>

            {/* Action buttons with brand colors */}
            <div className="mt-8 border-t border-[#E7E5E4] pt-6 dark:border-[#134E4A]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
                  className="rounded-xl border border-[#E7E5E4] px-6 py-3 text-base font-semibold text-[#1F2937] transition hover:border-[#047857] hover:bg-[#ECFDF5] hover:text-[#047857] dark:border-[#134E4A] dark:text-[#ECFDF5] dark:hover:bg-[#052E22]"
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
