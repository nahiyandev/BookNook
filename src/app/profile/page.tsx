"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { apiFetch, type Book, type Borrow } from "@/lib/api";
import { useWishlist } from "@/lib/wishlist";
import EditProfileModal, { type UserProfileData } from "@/components/EditProfileModal";
import SignOutConfirmDialog from "@/components/SignOutConfirmDialog";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const { count: wishlistCount } = useWishlist();

  // Custom profile overrides from localStorage
  const [customProfile, setCustomProfile] = useState<Partial<UserProfileData>>({});
  const [booksCount, setBooksCount] = useState<number | null>(null);
  const [borrowsCount, setBorrowsCount] = useState<number | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);

  // Derived profile data
  const profileData: UserProfileData = {
    name: customProfile.name || session?.user?.name || "Reader",
    avatarUrl: customProfile.avatarUrl || session?.user?.image || "",
    bio:
      customProfile.bio ??
      "A reader lives a thousand lives before he dies. Reading and sharing across the BookNook community.",
    location: customProfile.location ?? "Dhaka, Bangladesh",
    favoriteAuthor: customProfile.favoriteAuthor ?? "Richard Dawkins",
    readingGoal: customProfile.readingGoal ?? 12,
    favoriteGenres: customProfile.favoriteGenres ?? ["Fiction", "Science", "History"],
    readingHabit: customProfile.readingHabit ?? "Night Owl Reader",
  };

  useEffect(() => {
    document.title = "My Profile | BookNook";
  }, []);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
      return;
    }

    if (session?.user?.email) {
      const email = session.user.email;

      // Load custom profile preferences asynchronously
      Promise.resolve().then(() => {
        try {
          const stored = localStorage.getItem(`booknook_profile_${email}`);
          if (stored) {
            setCustomProfile(JSON.parse(stored));
          }
        } catch {
          // Ignore JSON error
        }
      });

      let active = true;

      // Dynamically load real stats from database
      apiFetch<Book[]>("/books")
        .then((all) => {
          if (!active) return;
          const list = Array.isArray(all) ? all : [];
          const count = list.filter(
            (b) => b.addedBy?.email?.toLowerCase() === email.toLowerCase()
          ).length;
          setBooksCount(count);
        })
        .catch(() => {
          if (active) setBooksCount(0);
        });

      apiFetch<Borrow[]>("/borrows", { auth: true })
        .then((borrows) => {
          if (!active) return;
          const list = Array.isArray(borrows) ? borrows : [];
          setBorrowsCount(list.length);
        })
        .catch(() => {
          if (active) setBorrowsCount(0);
        });

      return () => {
        active = false;
      };
    }
  }, [session, isPending, router]);

  // Handle Save Profile
  const handleSaveProfile = async (updated: UserProfileData) => {
    setCustomProfile(updated);

    // Persist in localStorage
    if (session?.user?.email) {
      try {
        localStorage.setItem(
          `booknook_profile_${session.user.email}`,
          JSON.stringify(updated)
        );
      } catch {
        // Ignore
      }
    }

    // Attempt to update better-auth user name and image if supported
    try {
      if ("updateUser" in authClient && typeof (authClient as unknown as Record<string, unknown>).updateUser === "function") {
        await (authClient as unknown as { updateUser: (args: { name?: string; image?: string }) => Promise<unknown> }).updateUser({
          name: updated.name,
          image: updated.avatarUrl || undefined,
        });
      }
    } catch {
      // Gracefully fall back to client persistence
    }

    toast.success("Profile updated successfully!");
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.info("Signed out successfully.");
      router.push("/login");
    } catch {
      toast.error("Failed to sign out.");
    }
  };

  if (isPending || !session) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-3 border-[#A7F3D0] border-t-[#047857] dark:border-[#134E4A] dark:border-t-[#6EE7B7]" />
        <p className="text-xs font-medium text-[#6B7280] dark:text-[#A7F3D0]">
          Loading reader profile...
        </p>
      </div>
    );
  }

  const user = session.user;
  const goalProgress = Math.min(
    100,
    Math.round(((borrowsCount || 0) / (profileData.readingGoal || 1)) * 100)
  );

  // Compute reader tier based on activity
  const readerTier =
    (booksCount || 0) >= 3
      ? "Master Curator"
      : (booksCount || 0) >= 1
      ? "Community Contributor"
      : (borrowsCount || 0) >= 2
      ? "Avid Bookworm"
      : "Active Reader";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* 1. Breadcrumbs & Top Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#6B7280] dark:text-[#A7F3D0]">
            <Link href="/" className="hover:text-[#047857] hover:underline dark:hover:text-[#6EE7B7]">
              Home
            </Link>
            <span>/</span>
            <span>Dashboard</span>
            <span>/</span>
            <span className="font-semibold text-[#047857] dark:text-[#6EE7B7]">My Profile</span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-[#047857] sm:text-4xl dark:text-[#6EE7B7]">
              My Reader Profile
            </h1>
            <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-bold text-[#047857] ring-1 ring-[#047857]/20 dark:bg-[#052E22] dark:text-[#6EE7B7] dark:ring-[#6EE7B7]/30">
              Verified Reader
            </span>
          </div>
          <p className="mt-1 text-xs text-[#6B7280] sm:text-sm dark:text-[#A7F3D0]">
            Your personal reader passport, reading stats, and community preferences.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/wishlist"
            className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-bold text-[#D97706] shadow-xs transition hover:bg-amber-100 dark:border-amber-700/50 dark:bg-[#052E22] dark:text-[#FCD34D]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span>Wishlist</span>
            {wishlistCount > 0 && (
              <span className="rounded-full bg-[#D97706] px-2 py-0.5 text-xs text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setIsEditOpen(true)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-linear-to-r from-[#047857] via-[#059669] to-[#047857] px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-900/20 transition-all hover:brightness-110 active:scale-[0.99]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* 2. Main Hero Profile Card */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-200/90 bg-linear-to-b from-[#FAFDFB] via-[#F4FAF6] to-[#EAF5EF] shadow-xl shadow-emerald-950/5 dark:border-[#134E4A] dark:bg-none dark:bg-[#073B2E] dark:shadow-2xl">
        {/* Decorative Top Accent Banner */}
        <div className="h-28 w-full bg-linear-to-r from-[#047857] via-[#065F46] to-[#D97706] sm:h-36" />

        <div className="relative px-6 pb-8 sm:px-8">
          {/* Avatar & Header Controls */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="-mt-14 sm:-mt-16 relative shrink-0">
              {profileData.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profileData.avatarUrl}
                  alt={profileData.name}
                  className="h-28 w-28 rounded-3xl object-cover ring-4 ring-white shadow-xl dark:ring-[#073B2E]"
                />
              ) : (
                <span className="flex h-28 w-28 items-center justify-center rounded-3xl bg-[#047857] font-serif text-4xl font-bold text-white ring-4 ring-white shadow-xl dark:bg-[#052E22] dark:text-[#6EE7B7] dark:ring-[#073B2E]">
                  {profileData.name.charAt(0).toUpperCase() || "R"}
                </span>
              )}
              <span
                className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-white bg-emerald-500 shadow-xs dark:border-[#073B2E]"
                title="Active Reader"
              />
            </div>

            <div className="flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] px-3 py-1.5 text-xs font-semibold text-[#4B5563] shadow-2xs dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#A7F3D0]">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{profileData.location || "Earth"}</span>
              </span>
              <span className="rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] px-3 py-1.5 text-xs font-semibold text-[#4B5563] shadow-2xs dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#A7F3D0]">
                {profileData.readingHabit}
              </span>
              <span className="inline-flex items-center gap-1 rounded-xl bg-amber-50 px-3 py-1.5 text-xs font-bold text-[#D97706] ring-1 ring-amber-300 dark:bg-[#052E22] dark:text-[#FCD34D] dark:ring-amber-700/50">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span>{readerTier}</span>
              </span>
            </div>
          </div>

          {/* Name & Contact Info */}
          <div className="mt-4">
            <h2 className="font-serif text-2xl font-bold text-[#1F2937] sm:text-3xl dark:text-[#F0FDF4]">
              {profileData.name}
            </h2>
            <p className="mt-0.5 text-xs font-medium text-[#6B7280] sm:text-sm dark:text-[#A7F3D0]">
              {user.email}
            </p>
          </div>

          {/* Reader Bio Block */}
          {profileData.bio && (
            <div className="mt-5 rounded-2xl border-l-4 border-[#047857] bg-[#FDFBF7] p-4 text-xs leading-relaxed text-[#4B5563] sm:text-sm dark:border-[#6EE7B7] dark:bg-[#052E22] dark:text-[#ECFDF5]">
              <p className="italic">“{profileData.bio}”</p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Colorful Modular Stat KPI Cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Books Contributed */}
        <div className="relative overflow-hidden rounded-3xl border border-emerald-200/90 bg-linear-to-b from-emerald-50/90 via-[#FAFDFB] to-emerald-100/30 p-6 shadow-lg shadow-emerald-900/5 transition hover:shadow-xl dark:border-[#134E4A] dark:bg-none dark:bg-[#073B2E]">
          <div className="flex items-center justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </span>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
              Contribution
            </span>
          </div>
          <div className="mt-4">
            <div className="flex h-10 items-center font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F0FDF4]">
              {booksCount === null ? (
                <span className="inline-block h-8 w-14 animate-pulse rounded-lg bg-stone-200 dark:bg-[#052E22]" />
              ) : (
                booksCount
              )}
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#047857] dark:text-[#6EE7B7]">
              Books Added by You
            </p>
            <p className="mt-1 text-[11px] text-[#6B7280] dark:text-[#A7F3D0]">
              Shared with community readers
            </p>
          </div>
          <Link
            href="/my-books"
            className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#047857] hover:underline dark:text-[#6EE7B7]"
          >
            <span>Manage My Books</span>
            <span>→</span>
          </Link>
        </div>

        {/* Card 2: Currently Borrowed */}
        <div className="relative overflow-hidden rounded-3xl border border-amber-200/90 bg-linear-to-b from-amber-50/90 via-[#FFFDF7] to-amber-100/30 p-6 shadow-lg shadow-amber-900/5 transition hover:shadow-xl dark:border-[#134E4A] dark:bg-none dark:bg-[#073B2E]">
          <div className="flex items-center justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-[#D97706] dark:bg-[#052E22] dark:text-[#FCD34D]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </span>
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-[#D97706] dark:bg-[#052E22] dark:text-[#FCD34D]">
              Active
            </span>
          </div>
          <div className="mt-4">
            <div className="flex h-10 items-center font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F0FDF4]">
              {borrowsCount === null ? (
                <span className="inline-block h-8 w-14 animate-pulse rounded-lg bg-stone-200 dark:bg-[#052E22]" />
              ) : (
                borrowsCount
              )}
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#D97706] dark:text-[#FCD34D]">
              Currently Borrowed
            </p>
            <p className="mt-1 text-[11px] text-[#6B7280] dark:text-[#A7F3D0]">
              Books on your 7-day shelf
            </p>
          </div>
          <Link
            href="/my-borrows"
            className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#D97706] hover:underline dark:text-[#FCD34D]"
          >
            <span>View Active Loans</span>
            <span>→</span>
          </Link>
        </div>

        {/* Card 3: Annual Reading Goal */}
        <div className="relative overflow-hidden rounded-3xl border border-teal-200/90 bg-linear-to-b from-teal-50/90 via-[#F5FBFA] to-teal-100/30 p-6 shadow-lg shadow-teal-900/5 transition hover:shadow-xl dark:border-[#134E4A] dark:bg-none dark:bg-[#073B2E]">
          <div className="flex items-center justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-[#052E22] dark:text-teal-300">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </span>
            <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-[10px] font-bold text-teal-700 dark:bg-[#052E22] dark:text-teal-300">
              {goalProgress}% Complete
            </span>
          </div>
          <div className="mt-4">
            <p className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F0FDF4]">
              {borrowsCount ?? 0} / {profileData.readingGoal}
            </p>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-300">
              Annual Reading Goal
            </p>
            {/* Visual Progress Bar */}
            <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-stone-100 dark:bg-[#052E22]">
              <div
                className="h-full rounded-full bg-linear-to-r from-[#047857] to-[#059669] transition-all duration-500"
                style={{ width: `${goalProgress}%` }}
              />
            </div>
            <p className="mt-1 text-[11px] text-[#6B7280] dark:text-[#A7F3D0]">
              {profileData.readingGoal - (borrowsCount || 0) > 0
                ? `${profileData.readingGoal - (borrowsCount || 0)} books to reach milestone`
                : "Goal achieved for this season!"}
            </p>
          </div>
        </div>

        {/* Card 4: Reader Tier & Level */}
        <div className="relative overflow-hidden rounded-3xl border border-indigo-200/90 bg-linear-to-b from-indigo-50/90 via-[#F5F7FF] to-indigo-100/30 p-6 shadow-lg shadow-indigo-900/5 transition hover:shadow-xl dark:border-[#134E4A] dark:bg-none dark:bg-[#073B2E]">
          <div className="flex items-center justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-[#052E22] dark:text-indigo-300">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </span>
            <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-[#052E22] dark:text-indigo-300">
              Status
            </span>
          </div>
          <div className="mt-4">
            <p className="font-serif text-2xl font-bold text-[#1F2937] dark:text-[#F0FDF4]">
              {readerTier}
            </p>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              Community Honor Tier
            </p>
            <p className="mt-1 text-[11px] text-[#6B7280] dark:text-[#A7F3D0]">
              Earned through active sharing & borrowing
            </p>
          </div>
        </div>
      </div>

      {/* 4. Reading Preferences & Community Honors Cards Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Preferred Shelves & Genres Card */}
        <div className="rounded-3xl border border-emerald-200/90 bg-linear-to-b from-[#FAFDFB] via-[#F4FAF6] to-[#EAF5EF] p-6 shadow-lg shadow-emerald-950/5 dark:border-[#134E4A] dark:bg-none dark:bg-[#073B2E] dark:shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ECFDF5] text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </span>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F0FDF4]">
                Reading Preferences
              </h3>
              <p className="text-xs text-[#6B7280] dark:text-[#A7F3D0]">
                Favorite genres and literary interests
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-[#6EE7B7]">
                Favorite Shelves
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {profileData.favoriteGenres && profileData.favoriteGenres.length > 0 ? (
                  profileData.favoriteGenres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full bg-[#ECFDF5] px-3.5 py-1 text-xs font-bold text-[#047857] ring-1 ring-[#047857]/20 dark:bg-[#052E22] dark:text-[#6EE7B7] dark:ring-[#6EE7B7]/30"
                    >
                      {genre}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-[#9CA3AF]">No genres selected yet.</span>
                )}
              </div>
            </div>

            <div className="border-t border-[#F3F4F6] pt-4 dark:border-[#134E4A]/60">
              <p className="text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-[#6EE7B7]">
                Favorite Author
              </p>
              <p className="mt-1 font-serif text-base font-semibold text-[#1F2937] dark:text-[#F0FDF4]">
                {profileData.favoriteAuthor || "Not specified"}
              </p>
            </div>

            <div className="border-t border-[#F3F4F6] pt-4 dark:border-[#134E4A]/60">
              <p className="text-xs font-bold uppercase tracking-wider text-[#047857] dark:text-[#6EE7B7]">
                Reading Rhythm
              </p>
              <p className="mt-1 text-sm font-medium text-[#4B5563] dark:text-[#A7F3D0]">
                {profileData.readingHabit}
              </p>
            </div>
          </div>
        </div>

        {/* Community Badges & Honors Card */}
        <div className="rounded-3xl border border-emerald-200/90 bg-linear-to-b from-[#FAFDFB] via-[#F4FAF6] to-[#EAF5EF] p-6 shadow-lg shadow-emerald-950/5 dark:border-[#134E4A] dark:bg-none dark:bg-[#073B2E] dark:shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-[#D97706] dark:bg-[#052E22] dark:text-[#FCD34D]">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </span>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F0FDF4]">
                Reader Badges & Honors
              </h3>
              <p className="text-xs text-[#6B7280] dark:text-[#A7F3D0]">
                Milestones earned in the community
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3.5">
            <div className="rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] p-3.5 transition hover:border-[#047857] dark:border-[#134E4A] dark:bg-[#052E22]">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#ECFDF5] text-[#047857] dark:bg-[#073B2E] dark:text-[#6EE7B7]">
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </span>
              <p className="mt-2 font-serif text-sm font-bold text-[#1F2937] dark:text-[#F0FDF4]">
                Eco-Reader
              </p>
              <p className="text-[11px] text-[#6B7280] dark:text-[#A7F3D0]">
                Saved paper by borrowing
              </p>
            </div>

            <div className="rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] p-3.5 transition hover:border-[#047857] dark:border-[#134E4A] dark:bg-[#052E22]">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#ECFDF5] text-[#047857] dark:bg-[#073B2E] dark:text-[#6EE7B7]">
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </span>
              <p className="mt-2 font-serif text-sm font-bold text-[#1F2937] dark:text-[#F0FDF4]">
                Shelf Partner
              </p>
              <p className="text-[11px] text-[#6B7280] dark:text-[#A7F3D0]">
                Contributed to library
              </p>
            </div>

            <div className="rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] p-3.5 transition hover:border-[#047857] dark:border-[#134E4A] dark:bg-[#052E22]">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#ECFDF5] text-[#047857] dark:bg-[#073B2E] dark:text-[#6EE7B7]">
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <p className="mt-2 font-serif text-sm font-bold text-[#1F2937] dark:text-[#F0FDF4]">
                Punctual Return
              </p>
              <p className="text-[11px] text-[#6B7280] dark:text-[#A7F3D0]">
                Follows 7-day loop
              </p>
            </div>

            <div className="rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] p-3.5 transition hover:border-[#047857] dark:border-[#134E4A] dark:bg-[#052E22]">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-[#D97706] dark:bg-[#073B2E] dark:text-[#FCD34D]">
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </span>
              <p className="mt-2 font-serif text-sm font-bold text-[#1F2937] dark:text-[#F0FDF4]">
                Founding Reader
              </p>
              <p className="text-[11px] text-[#6B7280] dark:text-[#A7F3D0]">
                Early BookNook member
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Account Security & Session Details Card */}
      <div className="mt-8 rounded-3xl border border-emerald-200/90 bg-linear-to-b from-[#FAFDFB] via-[#F4FAF6] to-[#EAF5EF] p-6 shadow-lg shadow-emerald-950/5 dark:border-[#134E4A] dark:bg-none dark:bg-[#073B2E] dark:shadow-2xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F0FDF4]">
              Account & Security
            </h3>
            <p className="mt-0.5 text-xs text-[#6B7280] dark:text-[#A7F3D0]">
              Manage your credentials, active session, and sign out options.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSignOutOpen(true)}
            className="inline-flex cursor-pointer items-center gap-2 self-start rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 sm:self-auto dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-400"
          >
            <span>Sign Out of BookNook</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 border-t border-[#F3F4F6] pt-4 sm:grid-cols-3 dark:border-[#134E4A]/60">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] dark:text-[#6EE7B7]/70">
              Registered Email
            </p>
            <p className="mt-1 text-sm font-semibold text-[#1F2937] dark:text-[#F0FDF4]">
              {user.email}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] dark:text-[#6EE7B7]/70">
              Authentication Method
            </p>
            <p className="mt-1 text-sm font-semibold text-[#047857] dark:text-[#6EE7B7]">
              Secure JWT + BetterAuth
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] dark:text-[#6EE7B7]/70">
              Session Status
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Active & Protected
            </p>
          </div>
        </div>
      </div>

      {/* 6. Edit Profile Modal Dialog */}
      <EditProfileModal
        open={isEditOpen}
        initialData={profileData}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveProfile}
      />

      {/* 7. Sign Out Confirmation Dialog */}
      <SignOutConfirmDialog
        open={signOutOpen}
        onOpenChange={setSignOutOpen}
        onConfirm={handleSignOut}
      />
    </div>
  );
}
