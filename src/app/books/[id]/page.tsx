import Link from "next/link";
import { notFound } from "next/navigation";
import { API_URL } from "../../../lib/config";
import type { Book } from "../../../lib/api";
import { Button } from "../../../components/ui/button";
import BorrowButton from "../../../components/BorrowButton";

export const instant = false;

/**
 * BookNook Book Details — Books + Borrow section, PRIVATE route
 * (middleware already redirects logged-out users to Login with callbackUrl).
 * Server Component for the book data; the Borrow button/modal is a Client
 * Component because it needs the session and the modal state.
 */
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
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="grid gap-8 md:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.image}
          alt={book.title}
          className="h-96 w-full rounded-2xl object-cover"
        />
        <div>
          <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-semibold text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
            {book.category}
          </span>
          <h1 className="mt-3 font-serif text-3xl font-bold text-[#1F2937] dark:text-[#ECFDF5]">
            {book.title}
          </h1>
          <p className="mt-2 text-sm text-[#6B7280]">by {book.author}</p>
          <p className="mt-4 text-sm leading-relaxed text-[#374151] dark:text-[#D1FAE5]">
            {book.description}
          </p>
          <p className="mt-4 text-sm text-[#6B7280]">
            Added by {book.addedBy?.name} ({book.addedBy?.email})
          </p>
          <p className="mt-2 text-sm font-semibold text-[#047857]">
            Copies left: {book.availableCopies}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <BorrowButton
              bookId={book._id}
              bookTitle={book.title}
              availableCopies={book.availableCopies}
            />
            <Button
              render={<Link href="/books" />}
              nativeButton={false}
              variant="outline"
            >
              Back to all books
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
