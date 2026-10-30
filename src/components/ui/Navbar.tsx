"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { cn } from "../../lib/utils";

/**
 * BookNook Navbar — Section 1 (Client Base).
 *
 * Why 'use client'? The theme toggle, mobile menu and profile dropdown all
 * need browser state (useState / useEffect / localStorage). Server Components
 * cannot hold that state, so the Navbar is a Client Component. The root
 * layout (a Server Component) simply renders it.
 *
 * Auth placeholder: `isLoggedIn` is FALSE for now, on purpose. Step 3
 * (BetterAuth) replaces this one value with the real session. Until then
 * private links stay hidden and Login/Register stay visible — no fake login.
 */

// TODO (Step 3 — BetterAuth): replace this with the real session, e.g.
// const { data: session } = useSession(); const isLoggedIn = !!session;
// const user = session?.user;
const isLoggedIn = false;
const userName = "Reader";
const userPhoto = ""; // TODO (Step 3): session user image URL

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];

const privateLinks = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

/** Sharing-loop logo mark, inline SVG (same paths as assets/logo.svg).
 *  Inline, not an image import, so it works in any Next.js setup without
 *  SVG-import type configuration, and it stays sharp at every size. */
function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <path
        d="M22 32 Q60 10 98 32"
        fill="none"
        stroke="#D97706"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <polygon points="98,32 88,28 90,40" fill="#D97706" />
      <path
        d="M98 88 Q60 110 22 88"
        fill="none"
        stroke="#047857"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <polygon points="22,88 32,84 30,96" fill="#047857" />
      <path
        d="M30 44 Q45 38 60 44 Q75 38 90 44 L90 76 Q75 70 60 76 Q45 70 30 76 Z"
        fill="#047857"
      />
      <path d="M60 44 L60 76" stroke="#FDFBF7" strokeWidth="2.5" />
      <path
        d="M36 50 Q45 47 54 50 M66 50 Q75 47 84 50 M36 58 Q45 55 54 58 M66 58 Q75 55 84 58"
        stroke="#FDFBF7"
        strokeWidth="1.6"
        fill="none"
      />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Theme: read the saved choice once, then keep <html class="dark"> in sync.
  // localStorage (not system preference alone) so the choice survives reloads.
  useEffect(() => {
    const saved = localStorage.getItem("booknook-theme");
    const isDark = saved === "dark";
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("booknook-theme", next ? "dark" : "light");
  }

  const links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7E5E4] bg-[#FDFBF7] dark:border-[#134E4A] dark:bg-[#052E22]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Logo + name (left) */}
        <Link href="/" className="flex items-center gap-2">
          <LogoMark className="h-10 w-10" />
          <span className="font-serif text-2xl font-bold text-[#047857] dark:text-[#ECFDF5]">
            BookNook
          </span>
        </Link>

        {/* Links (desktop) */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#ECFDF5] hover:text-[#047857] dark:text-[#D1FAE5] dark:hover:bg-[#064E3B]",
                pathname === link.href &&
                  "bg-[#ECFDF5] text-[#047857] underline decoration-[#D97706] decoration-2 underline-offset-4 dark:bg-[#064E3B]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side: theme toggle + auth area */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark / light theme"
            className="rounded-full border border-[#E7E5E4] bg-white px-3 py-2 text-sm dark:border-[#134E4A] dark:bg-[#064E3B] dark:text-[#ECFDF5]"
          >
            <span className="dark:hidden">🌙 Dark</span>
            <span className="hidden dark:inline">☀️ Light</span>
          </button>

          {isLoggedIn ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen((v) => !v)}
                aria-label="Open profile menu"
                className="flex items-center gap-2 rounded-full border border-[#E7E5E4] p-1 pr-3 dark:border-[#134E4A]"
              >
                {/* TODO (Step 3): replace with the real user photo */}
                {userPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={userPhoto}
                    alt={userName}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#047857] text-sm font-bold text-white">
                    {userName.charAt(0)}
                  </span>
                )}
                <span className="hidden text-sm font-medium text-[#1F2937] sm:inline dark:text-[#ECFDF5]">
                  {userName}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[#E7E5E4] bg-white p-2 shadow-lg dark:border-[#134E4A] dark:bg-[#064E3B]">
                  <p className="px-3 py-2 text-sm font-semibold text-[#1F2937] dark:text-[#ECFDF5]">
                    {userName}
                  </p>
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-[#374151] hover:bg-[#ECFDF5] dark:text-[#D1FAE5] dark:hover:bg-[#052E22]"
                  >
                    My Profile
                  </Link>
                  {/* TODO (Step 3): wire this to the real BetterAuth sign-out */}
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(false)}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button render={<Link href="/login" />} variant="outline" nativeButton={false}>
                Login
              </Button>
              <Button render={<Link href="/register" />} nativeButton={false}>
                Register
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded-full border border-[#E7E5E4] px-3 py-2 text-sm md:hidden dark:border-[#134E4A] dark:text-[#ECFDF5]"
          >
            Menu
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-[#E7E5E4] px-4 py-3 md:hidden dark:border-[#134E4A]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-[#374151] hover:bg-[#ECFDF5] dark:text-[#D1FAE5] dark:hover:bg-[#064E3B]"
            >
              {link.label}
            </Link>
          ))}
          {!isLoggedIn && (
            <div className="mt-2 flex gap-2">
              <Button
                render={<Link href="/login" />}
                variant="outline"
                className="flex-1"
              >
                Login
              </Button>
              <Button render={<Link href="/register" />} className="flex-1">
                Register
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
