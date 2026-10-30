import Link from "next/link";

/**
 * BookNook Footer — Section 1 (Client Base).
 * Server Component on purpose: nothing here needs browser state, so it does
 * not need 'use client'. It is always rendered in the dark emerald band, in
 * both light and dark mode, so the page always ends with the same identity.
 */
export default function Footer() {
  return (
    <footer className="bg-[#052E22] text-[#ECFDF5]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        {/* Logo + about */}
        <div>
          <Link href="/" className="font-serif text-2xl font-bold text-white">
            BookNook
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#A7F3D0]">
            A small online library where readers share books — borrow, read,
            return.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-[#F59E0B]">
            Explore
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/books" className="hover:text-white">
                All Books
              </Link>
            </li>
            <li>
              <Link href="/add-book" className="hover:text-white">
                Add Book
              </Link>
            </li>
            <li>
              <Link href="/my-borrows" className="hover:text-white">
                My Borrows
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact + social */}
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-[#F59E0B]">
            Connect
          </h3>
          <p className="mt-3 text-sm text-[#A7F3D0]">
            Follow BookNook for new arrivals and reading updates.
          </p>
          <div className="mt-4 flex gap-3 text-sm">
            {/* X (new logo — text mark, not the old bird) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="BookNook on X"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#134E4A] font-bold hover:bg-[#064E3B]"
            >
              X
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="BookNook on Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#134E4A] font-bold hover:bg-[#064E3B]"
            >
              f
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="BookNook on Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#134E4A] font-bold hover:bg-[#064E3B]"
            >
              IG
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#134E4A] py-4 text-center text-xs text-[#6EE7B7]">
        © 2026 BookNook. All rights reserved.
      </div>
    </footer>
  );
}
