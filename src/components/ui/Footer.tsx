import Link from "next/link";

/** Sharing-loop logo mark, inline SVG (same paths as Navbar and assets/logo.svg) */
function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <path
        d="M22 32 Q60 10 98 32"
        fill="none"
        stroke="#D97706"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <polygon points="98,32 88,28 90,40" fill="#D97706" />
      <path
        d="M98 88 Q60 110 22 88"
        fill="none"
        stroke="#6EE7B7"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <polygon points="22,88 32,84 30,96" fill="#6EE7B7" />
    </svg>
  );
}

/** Official new X logo (rebranded from old Twitter bird) */
function XLogo({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

/**
 * BookNook Footer — Consistent branding, social links with official new X logo.
 */
export default function Footer() {
  return (
    <footer className="border-t border-[#134E4A] bg-[#052E22] text-[#ECFDF5]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        {/* Brand identity column */}
        <div className="lg:col-span-5">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <LogoMark className="h-9 w-9" />
            <span className="font-serif text-2xl font-bold text-white">
              BookNook
            </span>
          </Link>
          <p className="mt-3.5 max-w-sm text-xs leading-relaxed text-[#A7F3D0] sm:text-sm">
            A reader-driven community library where stories travel from shelf to shelf. Borrow for free, enjoy at your pace, and pass it on.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#FCD34D]">
            <span>🌿</span>
            <span>Borrow • Read • Return</span>
          </div>
        </div>

        {/* Quick links column */}
        <div className="lg:col-span-3">
          <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#FCD34D]">
            Library Navigation
          </h3>
          <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
            <li>
              <Link href="/" className="transition hover:text-white hover:underline">
                Home Catalog
              </Link>
            </li>
            <li>
              <Link href="/books" className="transition hover:text-white hover:underline">
                All Books Shelf
              </Link>
            </li>
            <li>
              <Link href="/add-book" className="transition hover:text-white hover:underline">
                Contribute a Book
              </Link>
            </li>
            <li>
              <Link href="/my-borrows" className="transition hover:text-white hover:underline">
                My Borrowed Books
              </Link>
            </li>
            <li>
              <Link href="/my-books" className="transition hover:text-white hover:underline">
                My Shared Shelf
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect & Socials column */}
        <div className="lg:col-span-4">
          <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#FCD34D]">
            Connect With Readers
          </h3>
          <p className="mt-4 text-xs leading-relaxed text-[#A7F3D0] sm:text-sm">
            Follow BookNook for community announcements, fresh shelf arrivals, and book discussions.
          </p>

          {/* Social Icons including the new X logo */}
          <div className="mt-5 flex items-center gap-3">
            {/* Official new X logo */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow BookNook on X"
              title="X (formerly Twitter)"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#134E4A] bg-[#073B2E] text-white shadow-xs transition hover:border-[#6EE7B7] hover:bg-[#047857]"
            >
              <XLogo className="h-4 w-4" />
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="BookNook on Facebook"
              title="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#134E4A] bg-[#073B2E] text-white shadow-xs transition hover:border-[#6EE7B7] hover:bg-[#047857]"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="BookNook on Instagram"
              title="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#134E4A] bg-[#073B2E] text-white shadow-xs transition hover:border-[#6EE7B7] hover:bg-[#047857]"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-[#134E4A] py-5 text-center text-xs text-[#6EE7B7]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 BookNook Library. Built with love for readers.</p>
          <p className="text-[11px] text-[#A7F3D0]">
            100% Community Powered • Zero Fines • Free Forever
          </p>
        </div>
      </div>
    </footer>
  );
}
