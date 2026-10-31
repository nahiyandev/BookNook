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

/** Vector Icon: LinkedIn */
function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.8v8.37h-2.8V10.9M7.86 6.78a1.64 1.64 0 0 0-1.66 1.63 1.63 1.63 0 0 0 1.66 1.63 1.63 1.63 0 0 0 1.65-1.63c0-.9-.74-1.63-1.65-1.63z" />
    </svg>
  );
}

/** Vector Icon: GitHub */
function GitHubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

/** Vector Icon: Facebook */
function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

/**
 * BookNook Footer — Minimal, elegant, reader-focused footer with LinkedIn, GitHub, Facebook links,
 * and developer watermark signature.
 */
export default function Footer() {
  return (
    <footer className="border-t border-[#134E4A] bg-[#052E22] text-[#ECFDF5]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        {/* Brand identity column */}
        <div className="lg:col-span-5">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <LogoMark className="h-9 w-9" />
            <span className="font-serif text-2xl font-bold tracking-tight text-white">
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
              <Link href="/profile" className="transition hover:text-white hover:underline">
                Reader Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect & Socials column (LinkedIn, GitHub, Facebook) */}
        <div className="lg:col-span-4">
          <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#FCD34D]">
            Connect With Readers
          </h3>
          <p className="mt-4 text-xs leading-relaxed text-[#A7F3D0] sm:text-sm">
            Connect across social platforms for community announcements, code updates, and reading discussions.
          </p>

          {/* Social Icons: LinkedIn, GitHub, Facebook */}
          <div className="mt-5 flex items-center gap-3">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/nahiyandev"
              target="_blank"
              rel="noreferrer"
              aria-label="BookNook on LinkedIn"
              title="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#134E4A] bg-[#073B2E] text-white shadow-xs transition hover:scale-105 hover:border-[#6EE7B7] hover:bg-[#047857]"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/nahiyandev"
              target="_blank"
              rel="noreferrer"
              aria-label="BookNook on GitHub"
              title="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#134E4A] bg-[#073B2E] text-white shadow-xs transition hover:scale-105 hover:border-[#6EE7B7] hover:bg-[#047857]"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/nahiyandev"
              target="_blank"
              rel="noreferrer"
              aria-label="BookNook on Facebook"
              title="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#134E4A] bg-[#073B2E] text-white shadow-xs transition hover:scale-105 hover:border-[#6EE7B7] hover:bg-[#047857]"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar & Developer Signature Watermark */}
      <div className="border-t border-[#134E4A] py-5 text-xs text-[#6EE7B7]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-center sm:text-left">
            © 2026 BookNook Library. All rights reserved.
          </p>

          {/* Right Corner Watermark */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#A7F3D0]">
            <span>Designed & Developed by</span>
            <a
              href="https://github.com/nahiyandev"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1 font-bold text-white transition hover:text-[#FCD34D]"
            >
              <span className="underline decoration-[#D97706] decoration-1 underline-offset-3 group-hover:decoration-[#FCD34D]">
                Nahiyan
              </span>
              <span className="text-xs">↗</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
