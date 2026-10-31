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
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-[#134E4A] dark:bg-[#064E3B]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="relative aspect-4/5 w-full overflow-hidden bg-[#F3F4F6] dark:bg-[#052E22]">
        <img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-[#047857] shadow-xs backdrop-blur-xs dark:bg-[#052E22]/90 dark:text-[#6EE7B7]">
          {book.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 min-h-[2.75rem] font-serif text-base font-bold leading-snug text-[#1F2937] dark:text-[#ECFDF5]">
          {book.title}
        </h3>
        <p className="mt-1 line-clamp-1 text-xs text-[#6B7280] dark:text-[#A7F3D0]">
          by {book.author}
        </p>

        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="font-medium text-[#047857] dark:text-[#6EE7B7]">
            {book.availableCopies > 0
              ? `${book.availableCopies} ${book.availableCopies === 1 ? "copy" : "copies"} left`
              : "Out of stock"}
          </span>
        </div>

        <div className="mt-auto pt-4">
          <Button
            render={<Link href={`/books/${book._id}`} />}
            nativeButton={false}
            className="w-full bg-[#047857] text-white hover:bg-[#065F46]"
          >
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}
