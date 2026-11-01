import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | BookNook",
  description: "The page or book you are looking for is missing from our shelves.",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-160px)] items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      {/* Ambient background blur circles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-400/5"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/3 -z-10 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl dark:bg-amber-400/5"
      />

      <div className="mx-auto max-w-2xl text-center">
        {/* Top Literary Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/80 px-4 py-1.5 text-xs font-bold text-[#047857] shadow-xs backdrop-blur-md dark:border-emerald-800/60 dark:bg-[#073B2E]/80 dark:text-[#6EE7B7]">
          <span>📖</span>
          <span>Chapter Not Found</span>
          <span>•</span>
          <span className="font-mono text-[11px] text-[#D97706] dark:text-[#FCD34D]">Error 404</span>
        </div>

        {/* Big Editorial 404 Display with Book Icon */}
        <div className="relative my-6 flex items-center justify-center">
          <span className="select-none font-serif text-8xl font-black tracking-tight text-emerald-950/10 sm:text-9xl dark:text-emerald-100/10">
            404
          </span>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-3xl border border-[#E7E5E4] bg-white text-4xl shadow-2xl shadow-emerald-900/15 transition-transform duration-300 hover:rotate-6 hover:scale-110 sm:h-24 sm:w-24 sm:text-5xl dark:border-[#134E4A] dark:bg-[#073B2E] dark:shadow-black/50">
              📚
            </span>
          </div>
        </div>

        {/* Main Heading & Subtitle */}
        <h1 className="font-serif text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl lg:text-5xl dark:text-[#F0FDF4]">
          This Page Has Left the Shelf
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#6B7280] sm:text-base dark:text-[#A7F3D0]">
          The story you are looking for might have been moved, borrowed by another reader, or simply hasn&apos;t been penned yet. Let&apos;s guide you back to our open reading room.
        </p>

        {/* Quick Action Navigation Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-[#047857] via-[#059669] to-[#047857] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/25 transition-all hover:scale-102 hover:brightness-110 active:scale-[0.99]"
          >
            <span>Back to Home Shelf</span>
            <span>🏠</span>
          </Link>

          <Link
            href="/books"
            className="inline-flex items-center gap-2 rounded-2xl border border-[#E7E5E4] bg-white px-6 py-3.5 text-sm font-bold text-[#1F2937] shadow-xs transition hover:border-[#047857] hover:text-[#047857] active:scale-[0.99] dark:border-[#134E4A] dark:bg-[#073B2E] dark:text-[#F0FDF4] dark:hover:border-[#6EE7B7] dark:hover:text-[#6EE7B7]"
          >
            <span>Explore All Books</span>
            <span>📖</span>
          </Link>

          <Link
            href="/wishlist"
            className="inline-flex items-center gap-2 rounded-2xl border border-[#E7E5E4] bg-white px-5 py-3.5 text-sm font-bold text-[#4B5563] shadow-xs transition hover:border-[#D97706] hover:text-[#D97706] active:scale-[0.99] dark:border-[#134E4A] dark:bg-[#073B2E] dark:text-[#A7F3D0] dark:hover:border-[#FCD34D] dark:hover:text-[#FCD34D]"
          >
            <span>My Wishlist</span>
            <span>🔖</span>
          </Link>
        </div>

        {/* Helpful Popular Shelves Shortcut Card */}
        <div className="mt-12 rounded-3xl border border-[#E7E5E4] bg-white/70 p-6 shadow-xl shadow-stone-200/50 backdrop-blur-xs sm:p-8 dark:border-[#134E4A] dark:bg-[#073B2E]/60 dark:shadow-none">
          <p className="font-serif text-sm font-bold text-[#1F2937] sm:text-base dark:text-[#F0FDF4]">
            Looking for something specific to read?
          </p>
          <p className="mt-1 text-xs text-[#6B7280] dark:text-[#A7F3D0]">
            Browse our community shelves by genre:
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {[
              { name: "Fiction & Novels", icon: "" },
              { name: "Science & Tech", icon: "" },
              { name: "History & Ideas", icon: "" },
              { name: "Kids & Young", icon: "" },
            ].map((shelf) => (
              <Link
                key={shelf.name}
                href="/books"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#E7E5E4] bg-[#FDFBF7] px-3.5 py-1.5 text-xs font-semibold text-[#4B5563] transition hover:border-[#047857] hover:bg-[#ECFDF5] hover:text-[#047857] dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#A7F3D0] dark:hover:border-[#6EE7B7] dark:hover:text-[#6EE7B7]"
              >
                <span>{shelf.icon}</span>
                <span>{shelf.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
