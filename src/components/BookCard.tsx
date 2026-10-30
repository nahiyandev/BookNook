import Link from "next/link";
import type { Book } from "../lib/api";
import { Button } from "./ui/button";

/**
 * BookNook book card — Books section.
 * Equal height/width by design (assignment rule): fixed image height,
 * flex column, button pinned to the bottom. Used by All Books and,
 * later, by Home New Arrivals.
 */
export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white shadow-sm dark:border-[#134E4A] dark:bg-[#064E3B]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={book.image}
        alt={book.title}
        className="h-56 w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-4">
        <span className="w-fit rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-semibold text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
          {book.category}
        </span>
        <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-[#1F2937] dark:text-[#ECFDF5]">
          {book.title}
        </h3>
        <p className="mt-1 text-sm text-[#6B7280] dark:text-[#A7F3D0]">
          by {book.author}
        </p>
        <p className="mt-1 text-xs text-[#9CA3AF]">
          {book.availableCopies} copies left
        </p>
        <div className="mt-auto pt-4">
          <Button
            render={<Link href={`/books/${book._id}`} />}
            nativeButton={false}
            className="w-full"
          >
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}
