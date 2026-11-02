"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Button } from "./button";
import { cn } from "../../lib/utils";
import { authClient } from "../../lib/auth-client";
import { useWishlist } from "@/lib/wishlist";
import SignOutConfirmDialog from "@/components/SignOutConfirmDialog";
import { toast } from "react-toastify";


const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];

const privateLinks = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

function getThemeSnapshot() {
  return typeof window !== "undefined" && localStorage.getItem("booknook-theme") === "dark";
}

function getServerThemeSnapshot() {
  return false;
}

function subscribeToTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("storage", callback);
  window.addEventListener("booknook-theme-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("booknook-theme-change", callback);
  };
}


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
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { count: wishlistCount } = useWishlist();
  const isLoggedIn = !!session;
  const userName = session?.user?.name ?? "Reader";
  const userPhoto = session?.user?.image ?? "";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);
  const dark = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  // Keep <html class="dark"> in sync with the saved theme preference.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  function toggleTheme() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("booknook-theme", next ? "dark" : "light");
    window.dispatchEvent(new Event("booknook-theme-change"));
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

        {/* Right side: search trigger + wishlist + theme toggle + auth area */}
        <div className="flex items-center gap-2">
          {/* Spotlight Quick Search Ctrl+K trigger */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("booknook_open_command_palette"))}
            aria-label="Search library (Ctrl+K)"
            className="flex items-center gap-1.5 rounded-full border border-[#E7E5E4] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#6B7280] shadow-2xs transition hover:border-[#047857] hover:text-[#047857] dark:border-[#134E4A] dark:bg-[#064E3B] dark:text-[#A7F3D0] dark:hover:border-[#6EE7B7]"
          >
            <svg className="h-3.5 w-3.5 text-[#047857] dark:text-[#6EE7B7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden md:inline text-[11px]">Search</span>
          </button>

          {/* Reading Wishlist Icon Button */}
          <Link
            href="/wishlist"
            aria-label={`Reading Wishlist (${wishlistCount} saved)`}
            className={cn(
              "relative flex items-center gap-1.5 rounded-full border border-[#E7E5E4] bg-white px-3 py-1.5 text-xs font-bold text-[#4B5563] shadow-2xs transition hover:border-[#047857] hover:text-[#047857] dark:border-[#134E4A] dark:bg-[#064E3B] dark:text-[#ECFDF5] dark:hover:border-[#6EE7B7]",
              pathname === "/wishlist" && "border-[#047857] bg-[#ECFDF5] text-[#047857] dark:bg-[#052E22]"
            )}
          >
            <svg className="h-3.5 w-3.5 text-[#D97706] dark:text-[#FCD34D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span className="hidden sm:inline">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#D97706] text-[10px] font-bold text-white shadow-xs">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Minimalist Theme Toggle (no bulky border/shadow, pure icon) */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark / light theme"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#4B5563] transition hover:bg-[#ECFDF5] hover:text-[#047857] dark:text-[#A7F3D0] dark:hover:bg-[#064E3B] dark:hover:text-white"
          >
            {dark ? (
              <svg className="h-5 w-5 text-[#FCD34D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-[#4B5563]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {isLoggedIn ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen((v) => !v)}
                aria-label="Open profile menu"
                className="flex items-center gap-2 rounded-full transition focus:outline-hidden sm:border sm:border-[#E7E5E4] sm:p-1 sm:pr-3 sm:dark:border-[#134E4A]"
              >
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
                  <Link
                    href="/wishlist"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-[#374151] hover:bg-[#ECFDF5] dark:text-[#D1FAE5] dark:hover:bg-[#052E22]"
                  >
                    <span>Reading Wishlist</span>
                    {wishlistCount > 0 && (
                      <span className="rounded-full bg-[#D97706] px-1.5 py-0.5 text-[10px] font-bold text-white">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      setSignOutOpen(true);
                    }}
                    className="block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button render={<Link href="/login" />} variant="outline" nativeButton={false}>Login</Button>
              <Button render={<Link href="/register" />} nativeButton={false}>Register</Button>
            </div>
          )}

          {/* Mobile menu button (3-line hamburger icon, zero shadow / no border) */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#4B5563] transition hover:bg-[#ECFDF5] hover:text-[#047857] md:hidden dark:text-[#ECFDF5] dark:hover:bg-[#064E3B]"
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              </svg>
            )}
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
          {!isLoggedIn ? (
            <div className="mt-2 flex gap-2">
              <Button render={<Link href="/login" />} variant="outline" nativeButton={false} className="flex-1">Login</Button>
              <Button render={<Link href="/register" />} nativeButton={false} className="flex-1">Register</Button>
            </div>
          ) : (
            <div className="mt-2 border-t border-[#E7E5E4] pt-2 dark:border-[#134E4A]">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setSignOutOpen(true);
                }}
                className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}

      {/* Sign Out Confirmation Dialog */}
      <SignOutConfirmDialog
        open={signOutOpen}
        onOpenChange={setSignOutOpen}
        onConfirm={async () => {
          await authClient.signOut();
          toast.success("Signed out successfully.");
          router.push("/");
          router.refresh();
        }}
      />
    </header>
  );
}
